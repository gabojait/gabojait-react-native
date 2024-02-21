import React, { Suspense, useEffect, useRef, useState } from 'react';
import { makeStyles, Text, useTheme } from '@rneui/themed';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import TeamRequestDto from '@/data/model/Team/TeamRequestDto';
import CardWrapper from '@/presentation/components/CardWrapper';
import { FilledButton } from '@/presentation/components/Button';
import { MainStackScreenProps } from '@/presentation/navigation/types';
import useGlobalStyles from '@/presentation/styles';
import PositionCountDto from '@/data/model/Team/PostionCountDto';
import { getMyTeam, updateTeam } from '@/data/api/team';
import { useQuery, useQueryClient, useQueryErrorResetBoundary, UseQueryResult } from 'react-query';
import TeamDto from '@/data/model/Team/TeamDto';
import SymbolModalContent from '@/presentation/components/modalContent/SymbolModalContent';
import BottomModalContent from '@/presentation/components/modalContent/BottomModalContent';
import { PositionDropdownEditor } from '@/presentation/components/PositionDropdownEditor';
import useModal from '@/presentation/components/modal/useModal';
import { teamKeys } from '@/reactQuery/key/TeamKeys';
import { useMutationDialog } from '@/reactQuery/util/useMutationDialog';
import Error404Boundary from '@/presentation/components/errorComponent/Error404Boundary';
import { Loading } from '../../Loading';
import PositionRecruiting from '@/presentation/model/PositionRecruitng';
import { mapTeamDtoToPositionRecruiting } from '@/presentation/model/mapper/mapTeamDtoToPositionRecruiting';
import { Position } from '@/data/model/type/Position';
import {
  isEmptyInputExisted,
  isOpenChatUrlValidate,
  isRecruitCntValidate,
} from '@/presentation/utils/TeamCreateOrEditUtils';
import { PositionDropdown } from '@/presentation/components/PositionDropdown';
import PositionDropdownContent from '@/presentation/model/PositionDropdownContent';
import { KoreanPosition } from '@/presentation/model/type/Position';
import BriefProfileDto from '@/data/model/Profile/BriefProfileDto';

export const TeamEditor = ({ navigation, route }: MainStackScreenProps<'TeamEditor'>) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <Suspense fallback={Loading()}>
      <Error404Boundary onReset={reset}>
        <TeamEditorComponent navigation={navigation} route={route} />
      </Error404Boundary>
    </Suspense>
  );
};

export const TeamEditorComponent = ({ navigation, route }: MainStackScreenProps<'TeamEditor'>) => {
  const { theme } = useTheme();
  const styles = useStyles({ navigation });
  const modal = useModal();
  const globalStyles = useGlobalStyles();
  const queryClient = useQueryClient();
  const ref_input1 = useRef<TextInput | null>(null);
  const ref_input2 = useRef<TextInput | null>(null);
  const ref_input3 = useRef<TextInput | null>(null);
  const ref_input4 = useRef<TextInput | null>(null);
  const {
    data: teamData,
    isLoading: isTeamDataLoading,
    error: teamDataError,
  }: UseQueryResult<TeamDto> = useQuery(teamKeys.myTeam, () => getMyTeam());
  const { mutation: updateTeamMutation } = useMutationDialog(
    teamKeys.updateTeam,
    async (dto: TeamRequestDto) => updateTeam(dto) as Promise<TeamDto>,
    'CENTER',
    {
      onSuccessClick() {
        navigation.goBack();
        queryClient.invalidateQueries(teamKeys.myTeam);
      },
    },
    {
      useErrorBoundary: true,
      onSettled: (data, error, context) => {
        queryClient.invalidateQueries(teamKeys.myTeam);
      },
      onMutate: async ({
        expectation,
        projectDescription,
        projectName,
        openChatUrl,
        frontendMaxCnt,
        backendMaxCnt,
        managerMaxCnt,
        designerMaxCnt,
      }) => {
        await queryClient.cancelQueries(teamKeys.myTeam);
        const oldData = queryClient.getQueryData(teamKeys.myTeam) as TeamDto;
        const newData: TeamDto = {
          ...oldData,
          expectation: expectation,
          projectDescription: projectDescription,
          projectName: projectName,
          openChatUrl: openChatUrl,
          frontendMaxCnt: frontendMaxCnt,
          backendMaxCnt: backendMaxCnt,
          managerMaxCnt: managerMaxCnt,
          designerMaxCnt: designerMaxCnt,
        };
        queryClient.setQueryData(teamKeys.myTeam, newData);
      },
    },
  );
  const [teamUpdateState, setTeamUpdateState] = useState<TeamRequestDto>({
    expectation: '',
    openChatUrl: '',
    projectDescription: '',
    projectName: '',
    managerMaxCnt: 0,
    designerMaxCnt: 0,
    frontendMaxCnt: 0,
    backendMaxCnt: 0,
    leaderPosition: Position.None,
  });

  const [initializedTeamMember, setinitializedTeamMember] = useState<PositionRecruiting[]>([]);
  const [positionState, setPositionState] = useState<PositionDropdownContent[]>([
    { key: Position.Backend, value: KoreanPosition.BACKEND, disabled: false },
    { key: Position.Frontend, value: KoreanPosition.FRONTEND, disabled: false },
    { key: Position.Designer, value: KoreanPosition.DESIGNER, disabled: false },
    { key: Position.Manager, value: KoreanPosition.MANAGER, disabled: false },
  ]);

  useEffect(() => {
    setTeamUpdateState({
      expectation: teamData?.expectation!,
      openChatUrl: teamData?.openChatUrl!,
      projectDescription: teamData?.projectDescription!,
      projectName: teamData?.projectName!,
      managerMaxCnt: teamData?.managerMaxCnt ?? 0,
      designerMaxCnt: teamData?.designerMaxCnt ?? 0,
      frontendMaxCnt: teamData?.frontendMaxCnt ?? 0,
      backendMaxCnt: teamData?.backendMaxCnt ?? 0,
    });
    setinitializedTeamMember(mapTeamDtoToPositionRecruiting(teamData));
    console.log(`TeamEditor------------------initializedTeamMember:${initializedTeamMember}`);
  }, [teamData]);

  function findLeaderPosition(teamMembers: BriefProfileDto[]) {
    const leader = teamMembers.find(item => item.isLeader == true);
    return leader?.position;
  }

  function updateExpectation(text: string) {
    setTeamUpdateState(prevState => ({ ...prevState, expectation: text }));
  }

  function updateOpenchatUrl(text: string) {
    setTeamUpdateState(prevState => ({ ...prevState, openChatUrl: text }));
  }

  function updateProjectDescription(text: string) {
    setTeamUpdateState(prevState => ({ ...prevState, projectDescription: text }));
  }

  function updateProjectName(text: string) {
    setTeamUpdateState(prevState => ({ ...prevState, projectName: text }));
  }

  function updateTeamMemberRecruitCnts(data: PositionCountDto[]) {
    const frontendCnt = data.find(it => it.position === Position.Frontend)?.totalRecruitCnt || 0;
    const backendCnt = data.find(it => it.position === Position.Backend)?.totalRecruitCnt || 0;
    const designerCnt = data.find(it => it.position === Position.Designer)?.totalRecruitCnt || 0;
    const managerCnt = data.find(it => it.position === Position.Manager)?.totalRecruitCnt || 0;
    setTeamUpdateState(prevState => ({
      ...prevState,
      frontendMaxCnt: frontendCnt,
      backendMaxCnt: backendCnt,
      designerMaxCnt: designerCnt,
      managerMaxCnt: managerCnt,
    }));
  }

  function isAllInputValidate() {
    try {
      isRecruitCntValidate(teamUpdateState);
    } catch (error) {
      RecruitCntValidationWarningModal();
      return false;
    }

    try {
      isEmptyInputExisted(teamUpdateState);
    } catch (error) {
      EmptyInputWarningModal();
      return false;
    }

    try {
      isOpenChatUrlValidate(teamUpdateState);
    } catch (error) {
      OpenChatValidationWarningModal();
      return false;
    }

    return true;
  }

  const EmptyInputWarningModal = () => {
    modal?.show({
      content: (
        <SymbolModalContent
          title="빈 입력란이 있어요!"
          symbol={<Text style={{ fontSize: theme.emojiSize.md, textAlign: 'center' }}>😚</Text>}
          text={'최대한 자세히 적어주시면\n 프로젝트 모집에 도움이 될 수 있어요!'}
          yesButton={{ title: '확인', onPress: () => modal.hide() }}
        />
      ),
      modalProps: { animationType: 'none', justifying: 'center' },
    });
  };

  const OpenChatValidationWarningModal = () => {
    modal?.show({
      content: (
        <SymbolModalContent
          title="알맞은 링크가 아니에요!"
          symbol={<Text style={{ fontSize: theme.emojiSize.md, textAlign: 'center' }}>🧐</Text>}
          text={'유효한 카카오톡 오픈채팅 링크를 첨부해주세요!'}
          yesButton={{ title: '확인', onPress: () => modal.hide() }}
        />
      ),
      modalProps: { animationType: 'none', justifying: 'center' },
    });
  };

  const RecruitCntValidationWarningModal = () => {
    modal?.show({
      content: (
        <SymbolModalContent
          title="팀원이 없어요!"
          symbol={<Text style={{ fontSize: theme.emojiSize.md, textAlign: 'center' }}>🫥</Text>}
          text={'프로젝트를 함께할 팀원들을 알려주세요!'}
          yesButton={{ title: '확인', onPress: () => modal.hide() }}
        />
      ),
      modalProps: { animationType: 'none', justifying: 'center' },
    });
  };

  const CancelConfirmModal = () => {
    modal?.show({
      content: (
        <BottomModalContent
          header={<Text>"글 수정을 취소하시겠어요?"</Text>}
          yesButton={{
            title: '확인',
            onPress: () => {
              modal.hide();
              navigation.goBack();
            },
          }}
          noButton={{
            title: '취소',
            onPress: () => {
              modal.hide();
            },
          }}
          onBackgroundPress={modal?.hide}
        >
          <View>
            <Text style={{ textAlign: 'center' }}>글 수정을 취소하면</Text>
            <Text style={{ textAlign: 'center' }}>적은 내용은 반영되지 않습니다</Text>
          </View>
        </BottomModalContent>
      ),
      modalProps: { animationType: 'slide', justifying: 'bottom' },
    });
  };

  if (isTeamDataLoading) {
    return <Text>로딩중</Text>;
  }

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={50}
      behavior={Platform.select({ android: undefined, ios: 'padding' })}
      style={{ backgroundColor: 'white', flex: 1, paddingTop: 29, paddingHorizontal: 20 }}
    >
      <ScrollView>
        <View style={styles.item}>
          <Text style={styles.text}>프로젝트 이름</Text>
          <TouchableOpacity
            onPress={() => ref_input1.current?.focus()}
            style={{ flex: 1, width: '100%' }}
          >
            <CardWrapper style={[styles.inputBox, { minHeight: 51 }]}>
              <TextInput
                ref={ref_input1}
                value={teamUpdateState?.projectName}
                onChangeText={(text: string) => {
                  updateProjectName(text);
                }}
                multiline={false}
                maxLength={20}
                placeholder="최대 20자"
              />
            </CardWrapper>
          </TouchableOpacity>
        </View>

        <View style={styles.item}>
          <Text style={styles.text}>프로젝트 설명</Text>
          <TouchableOpacity
            onPress={() => ref_input2.current?.focus()}
            style={{ flex: 1, width: '100%' }}
          >
            <CardWrapper style={[globalStyles.card, styles.inputBox, { minHeight: 160 }]}>
              <TextInput
                value={teamUpdateState?.projectDescription}
                onChangeText={(text: string) => {
                  updateProjectDescription(text);
                }}
                ref={ref_input2}
                multiline={true}
                maxLength={500}
              />
            </CardWrapper>
          </TouchableOpacity>
        </View>

        <View style={styles.item}>
          <Text style={styles.text}>나의 포지션 설정</Text>
          <CardWrapper style={[styles.dropdownBox, { paddingTop: 20 }]}>
            <PositionDropdown
              onCloseClick={() => {}}
              onSelectPosition={(data: PositionCountDto) => {}}
              onDropdownSelected={(value: Position) => {}}
              dropdownData={positionState}
              defaultData={
                { position: Position.None, recruitCnt: 0, currentCnt: 0 } as PositionRecruiting
              }
              isSingleSelection={true}
            />
          </CardWrapper>
        </View>

        <View style={styles.item}>
          <Text style={styles.text}>원하는 팀원</Text>
          <CardWrapper style={[styles.dropdownBox, { paddingVertical: 20 }]}>
            <PositionDropdownEditor
              onTeamMemberRecruitChanged={(data: PositionCountDto[]) => {
                updateTeamMemberRecruitCnts(data);
              }}
              initializedTeamMembers={initializedTeamMember}
            />
          </CardWrapper>
        </View>

        <View style={styles.item}>
          <Text style={styles.text}>바라는 점</Text>
          <TouchableOpacity
            onPress={() => ref_input3.current?.focus()}
            style={{ flex: 1, width: '100%' }}
          >
            <CardWrapper style={[globalStyles.card, styles.inputBox, { minHeight: 95 }]}>
              <TextInput
                value={teamUpdateState?.expectation}
                onChangeText={(text: string) => {
                  updateExpectation(text);
                }}
                ref={ref_input3}
                multiline={true}
                maxLength={200}
              />
            </CardWrapper>
          </TouchableOpacity>
        </View>

        <View style={styles.item}>
          <Text style={styles.text}>오픈채팅 링크</Text>
          <TouchableOpacity
            onPress={() => ref_input4.current?.focus()}
            style={{ flex: 1, width: '100%' }}
          >
            <CardWrapper style={[styles.inputBox, { minHeight: 50 }]}>
              <TextInput
                value={teamUpdateState?.openChatUrl}
                onChangeText={(text: string) => {
                  updateOpenchatUrl(text);
                }}
                multiline={true}
                maxLength={100}
                placeholder="카카오톡 오픈채팅 링크"
                ref={ref_input4}
              />
            </CardWrapper>
          </TouchableOpacity>
        </View>

        <View>
          <FilledButton
            title={'완료'}
            disabled={false}
            onPress={() => {
              if (isAllInputValidate()) {
                updateTeamMutation.mutate(teamUpdateState);
              }
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const useStyles = makeStyles(theme => ({
  view: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  item: {
    flex: 1,
    alignItems: 'flex-start',
  },
  text: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.bold,
    paddingBottom: 10,
  },
  input: {
    flex: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  inputBox: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    borderWidth: 1.3,
    borderColor: theme.colors.disabled,
    marginBottom: 20,
    borderRadius: 15,
    paddingHorizontal: 25,
  },
  dropdownBox: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    borderWidth: 1.3,
    borderColor: theme.colors.disabled,
    marginBottom: 20,
    borderRadius: 15,
    paddingHorizontal: 14,
  },
}));
