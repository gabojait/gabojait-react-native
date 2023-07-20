import React, { useEffect, useState } from 'react';
import { makeStyles, Text, useTheme } from '@rneui/themed';
import { KeyboardAvoidingView, ScrollView, TextInput, View } from 'react-native';
import TeamRequestDto from '@/data/model/Team/TeamRequestDto';
import { ModalContext } from '@/presentation/components/modal/context';
import CardWrapper from '@/presentation/components/CardWrapper';
import { FilledButton } from '@/presentation/components/Button';
import { MainStackScreenProps } from '@/presentation/navigation/types';
import useGlobalStyles from '@/presentation/styles';
import PositionCountDto from '@/data/model/Team/PostionCountDto';
import { getMyTeam } from '@/data/api/team';
import { UseMutationResult, useQuery, UseQueryResult } from 'react-query';
import TeamDto from '@/data/model/Team/TeamDto';
import PositionRecruiting from '@/presentation/model/PositionRecruitng';
import SymbolModalContent from '@/presentation/components/modalContent/SymbolModalContent';
import BottomModalContent from '@/presentation/components/modalContent/BottomModalContent';
import { PositionDropdownEditor } from '@/presentation/components/PositionDropdownEditor';
import { useUpdateTeam } from '@/reactQuery/useUpdateTeam';
import { Buffering } from '@/presentation/components/Buffering';
import { teamKeys } from '@/reactQuery/key/TeamKeys';
import { mapPositionRecruitingToPositionCount } from '@/presentation/model/mapper/mapPositionRecruitingToPositionCount';

//TODO: api 수정반영, react query 적용, 요구사항 충족 필요함
export const TeamEditor = ({ navigation }: MainStackScreenProps<'TeamEditor'>) => {
  const { theme } = useTheme();
  const styles = useStyles({ navigation });
  const modal = React.useContext(ModalContext);
  const {
    data: teamData,
    isLoading: isTeamDataLoading,
    error: teamDataError,
  }: UseQueryResult<TeamDto> = useQuery(teamKeys.myTeam, () => getMyTeam());
  const updateTeam = useUpdateTeam();
  const [teamUpdateState, setTeamUpdateState] = useState<TeamRequestDto>({
    expectation: '',
    openChatUrl: '',
    projectDescription: '',
    projectName: '',
    teamMemberRecruitCnts: [],
  });

  useEffect(() => {
    setTeamUpdateState({
      expectation: teamData?.expectation!,
      openChatUrl: teamData?.openChatUrl!,
      projectDescription: teamData?.projectDescription!,
      projectName: teamData?.projectName!,
      teamMemberRecruitCnts: initializeTeamMemberRecruitCnts()!,
    });
  }, [teamData]);

  const globalStyles = useGlobalStyles();

  function initializeTeamMemberRecruitCnts() {
    const result = teamData?.teamMemberCnts.map(item => {
      return mapPositionRecruitingToPositionCount(item);
    });
    return result;
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
    setTeamUpdateState(prevState => ({ ...prevState, teamMemberRecruitCnts: data }));
  }
  function isOpenChatUrlValidate() {
    const pattern = /^https\:\/\/open\.kakao\.com\/.+$/;
    const result = pattern.test(teamUpdateState.openChatUrl);

    if (result) return true;
    else throw Error('유효한 카카오톡 오픈채팅 링크가 아닙니다');
  }

  function isRecruitCntValidate() {
    if (teamUpdateState.teamMemberRecruitCnts.length == 0) {
      throw Error('팀원이 존재하지 않습니다');
    } else return true;
  }

  function isEmptyInputExisted() {
    //공백제거하기
    const projectName = teamUpdateState.projectName.replace(/ /gi, '');
    const projectDescription = teamUpdateState.projectDescription.replace(/ /gi, '');
    const expectation = teamUpdateState.expectation.replace(/ /gi, '');
    const openChatUrl = teamUpdateState.openChatUrl.replace(/ /gi, '');

    if (
      projectName.length != 0 &&
      projectDescription.length != 0 &&
      expectation.length != 0 &&
      openChatUrl.length != 0
    ) {
      return true;
    } else throw Error('빈 입력란이 있습니다');
  }

  function isAllInputValidate() {
    try {
      isRecruitCntValidate();
    } catch (error) {
      RecruitCntValidationWarningModal();
      return false;
    }

    try {
      isEmptyInputExisted();
    } catch (error) {
      EmptyInputWarningModal();
      return false;
    }

    try {
      isOpenChatUrlValidate();
    } catch (error) {
      OpenChatValidationWarningModal();
      return false;
    }

    return true;
  }

  const EmptyInputWarningModal = () => {
    modal?.show({
      title: '',
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
      title: '',
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
      title: '',
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
      title: '',
      content: (
        <BottomModalContent
          title="글 수정을 취소하시겠어요?"
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

  if (updateTeam.data) {
    console.log(`updateTeam.data:${updateTeam.data}`);
    navigation.navigate('Team', { refetchKey: updateTeam.data });
  }

  if (isTeamDataLoading) {
    return <Text>로딩중</Text>;
  }

  return (
    <KeyboardAvoidingView
      behavior="height"
      style={{ backgroundColor: 'white', flex: 1, paddingTop: 29, paddingHorizontal: 20 }}
    >
      <ScrollView>
        <View style={styles.item}>
          <Text style={styles.text}>프로젝트 이름</Text>
          <CardWrapper style={[styles.inputBox, { maxHeight: 90 }]}>
            <TextInput
              value={teamUpdateState?.projectName}
              onChangeText={(text: string) => {
                updateProjectName(text);
              }}
              multiline={false}
              maxLength={20}
              placeholder="최대 20자"
            />
          </CardWrapper>
        </View>

        <View style={styles.item}>
          <Text style={styles.text}>프로젝트 설명</Text>
          <CardWrapper style={[globalStyles.card, styles.inputBox, { minHeight: 160 }]}>
            <TextInput
              value={teamUpdateState?.projectDescription}
              onChangeText={(text: string) => {
                updateProjectDescription(text);
              }}
              multiline={true}
              maxLength={500}
            />
          </CardWrapper>
        </View>

        <View style={styles.item}>
          <Text style={styles.text}>원하는 팀원</Text>
          <CardWrapper style={[styles.dropdownBox, { paddingVertical: 20 }]}>
            <PositionDropdownEditor
              onTeamMemberRecruitChanged={(data: PositionCountDto[]) => {
                updateTeamMemberRecruitCnts(data);
                console.log(data);
              }}
              currentTeamMembers={teamData?.teamMemberCnts!}
            />
          </CardWrapper>
        </View>

        <View style={styles.item}>
          <Text style={styles.text}>바라는 점</Text>
          <CardWrapper style={[globalStyles.card, styles.inputBox, { minHeight: 95 }]}>
            <TextInput
              value={teamUpdateState?.expectation}
              onChangeText={(text: string) => {
                updateExpectation(text);
              }}
              multiline={true}
              maxLength={200}
            />
          </CardWrapper>
        </View>

        <View style={styles.item}>
          <Text style={styles.text}>오픈채팅 링크</Text>
          <CardWrapper style={[styles.inputBox, { maxHeight: 50 }]}>
            <TextInput
              value={teamUpdateState?.openChatUrl}
              onChangeText={(text: string) => {
                updateOpenchatUrl(text);
              }}
              multiline={true}
              maxLength={100}
              placeholder="카카오톡 오픈채팅 링크"
            />
          </CardWrapper>
        </View>

        <View style={{ paddingHorizontal: 30 }}>
          <FilledButton
            title={'완료'}
            disabled={false}
            onPress={() => {
              if (isAllInputValidate()) {
                updateTeam.updateTeam(teamUpdateState);
              }
            }}
          />
          <FilledButton
            title={'취소하기'}
            buttonStyle={{ backgroundColor: theme.colors.grey0 }}
            onPress={() => {
              CancelConfirmModal();
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
