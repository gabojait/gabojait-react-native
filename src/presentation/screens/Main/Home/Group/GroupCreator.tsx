import { FilledButton } from '@/presentation/components/Button';
import { MainStackScreenProps } from '@/presentation/navigation/types';
import color from '@/presentation/res/styles/color';
import { Text, useTheme, makeStyles } from '@rneui/themed';
import React, { useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, View } from 'react-native';
import TeamRequestDto from '@/data/model/Team/TeamRequestDto';
import { ModalContext } from '@/presentation/components/modal/context';
import SymbolModalContent from '@/presentation/components/modalContent/SymbolModalContent';
import CardWrapper from '@/presentation/components/CardWrapper';
import BottomModalContent from '@/presentation/components/modalContent/BottomModalContent';
import { ScrollView } from 'react-native-gesture-handler';
import { PositionDropdownMaker } from '@/presentation/components/PositionDropdownMaker';
import PositionCountDto from '@/data/model/Team/PostionCountDto';
import { useCreateTeam } from '@/reactQuery/useCreateTeam';
import useGlobalStyles from '@/presentation/styles';
import useModal from '@/presentation/components/modal/useModal';
import { useMutationDialog } from '@/reactQuery/util/useMutationDialog';
import { teamKeys } from '@/reactQuery/key/TeamKeys';
import { createTeam } from '@/data/api/team';
import { HEIGHT } from '@/presentation/utils/util';

const GroupCreator = ({ navigation, route }: MainStackScreenProps<'GroupCreator'>) => {
  const { theme } = useTheme();
  const styles = useStyles({ navigation, route });
  const modal = useModal();
  const [teamCreateState, setTeamCreateState] = useState<TeamRequestDto>({
    expectation: '',
    openChatUrl: '',
    projectDescription: '',
    projectName: '',
    teamMemberRecruitCnts: [],
  });
  const globalStyles = useGlobalStyles();
  const ref_input1 = useRef<TextInput | null>(null);
  const ref_input2 = useRef<TextInput | null>(null);
  const ref_input3 = useRef<TextInput | null>(null);
  const ref_input4 = useRef<TextInput | null>(null);
  const { mutation: createTeamMutation } = useMutationDialog<TeamRequestDto, unknown>(
    teamKeys.createTeam,
    async (dto: TeamRequestDto) => createTeam(dto),
    {
      onSuccessClick() {
        navigation.goBack();
      },
    },
  );

  function handleCreateTeam() {
    createTeamMutation.mutate(teamCreateState);
  }

  function updateExpectation(text: string) {
    setTeamCreateState(prevState => ({ ...prevState, expectation: text }));
  }

  function updateOpenchatUrl(text: string) {
    setTeamCreateState(prevState => ({ ...prevState, openChatUrl: text }));
  }

  function updateProjectDescription(text: string) {
    setTeamCreateState(prevState => ({ ...prevState, projectDescription: text }));
  }

  function updateProjectName(text: string) {
    setTeamCreateState(prevState => ({ ...prevState, projectName: text }));
  }

  function updateTeamMemberRecruitCnts(data: PositionCountDto[]) {
    setTeamCreateState(prevState => ({ ...prevState, teamMemberRecruitCnts: data }));
  }

  function isOpenChatUrlValidate() {
    const pattern = /^https\:\/\/open\.kakao\.com\/.+$/;
    const result = pattern.test(teamCreateState.openChatUrl);

    if (result) return true;
    else throw Error('유효한 카카오톡 오픈채팅 링크가 아닙니다');
  }

  function isRecruitCntValidate() {
    if (teamCreateState.teamMemberRecruitCnts.length == 0) {
      throw Error('팀원이 존재하지 않습니다');
    } else return true;
  }

  function isEmptyInputExisted() {
    //공백제거하기
    const projectName = teamCreateState.projectName.replace(/ /gi, '');
    const projectDescription = teamCreateState.projectDescription.replace(/ /gi, '');
    const expectation = teamCreateState.expectation.replace(/ /gi, '');
    const openChatUrl = teamCreateState.openChatUrl.replace(/ /gi, '');

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

  const DeleteConfirmModal = () => {
    modal?.show({
      content: (
        <BottomModalContent
          title="글을 입력하시겠어요?"
          yesButton={{
            title: '삭제하기',
            onPress: () => {
              modal.hide();
              navigation.goBack();
            },
          }}
          noButton={{
            title: '돌아가기',
            onPress: () => {
              modal.hide();
            },
          }}
          onBackgroundPress={modal?.hide}
        >
          <View>
            <Text style={{ textAlign: 'center' }}>글을 삭제하면</Text>
            <Text style={{ textAlign: 'center' }}>다시 되돌릴 수 없습니다</Text>
          </View>
        </BottomModalContent>
      ),
      modalProps: { animationType: 'slide', justifying: 'bottom' },
    });
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={50}
      behavior={Platform.select({ android: undefined, ios: 'padding' })}
      style={{ backgroundColor: 'white', flex: 1, paddingTop: 29, paddingHorizontal: 20 }}
      enabled
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
                value={teamCreateState?.projectName}
                onChangeText={(text: string) => {
                  updateProjectName(text);
                }}
                ref={ref_input1}
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
                value={teamCreateState?.projectDescription}
                onChangeText={(text: string) => {
                  updateProjectDescription(text);
                }}
                multiline={true}
                maxLength={500}
                ref={ref_input2}
              />
            </CardWrapper>
          </TouchableOpacity>
        </View>

        <View style={styles.item}>
          <Text style={styles.text}>원하는 팀원</Text>
          <CardWrapper style={[styles.dropdownBox, { paddingVertical: 20 }]}>
            <PositionDropdownMaker
              onTeamMemberRecruitChanged={(data: PositionCountDto[]) => {
                updateTeamMemberRecruitCnts(data);
                console.log(data);
              }}
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
                value={teamCreateState?.expectation}
                onChangeText={(text: string) => {
                  updateExpectation(text);
                }}
                multiline={true}
                maxLength={200}
                ref={ref_input3}
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
            <CardWrapper style={[styles.inputBox, { minHeight: 51 }]}>
              <TextInput
                value={teamCreateState?.openChatUrl}
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

        <View style={{ paddingHorizontal: 30 }}>
          <FilledButton
            title={'완료'}
            disabled={false}
            onPress={() => {
              if (isAllInputValidate()) {
                handleCreateTeam();
              }
            }}
          />
          <FilledButton
            title={'삭제하기'}
            buttonStyle={{ backgroundColor: theme.colors.grey0 }}
            onPress={() => {
              DeleteConfirmModal();
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const useStyles = makeStyles(theme => ({
  view: {
    backgroundColor: color.white,
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
export default GroupCreator;
