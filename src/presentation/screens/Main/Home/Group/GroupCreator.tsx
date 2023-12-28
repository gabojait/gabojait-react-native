import { FilledButton } from '@/presentation/components/Button';
import { MainStackScreenProps } from '@/presentation/navigation/types';
import color from '@/presentation/res/styles/color';
import { makeStyles, Text, useTheme } from '@rneui/themed';
import React, { useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, View } from 'react-native';
import TeamRequestDto from '@/data/model/Team/TeamRequestDto';
import SymbolModalContent from '@/presentation/components/modalContent/SymbolModalContent';
import CardWrapper from '@/presentation/components/CardWrapper';
import BottomModalContent from '@/presentation/components/modalContent/BottomModalContent';
import { ScrollView } from 'react-native-gesture-handler';
import { PositionDropdownMaker } from '@/presentation/components/PositionDropdownMaker';
import PositionCountDto from '@/data/model/Team/PostionCountDto';
import useGlobalStyles from '@/presentation/styles';
import useModal from '@/presentation/components/modal/useModal';
import { useMutationDialog } from '@/reactQuery/util/useMutationDialog';
import { teamKeys } from '@/reactQuery/key/TeamKeys';
import { createTeam } from '@/data/api/team';
import { t } from 'i18next';
import { Position } from '@/data/model/type/Position';
import {
  isEmptyInputExisted,
  isOpenChatUrlValidate,
  isRecruitCntValidate,
} from '@/presentation/utils/TeamCreateOrEditUtils';

const GroupCreator = ({ navigation, route }: MainStackScreenProps<'GroupCreator'>) => {
  const { theme } = useTheme();
  const styles = useStyles({ navigation, route });
  const modal = useModal();
  const [teamCreateState, setTeamCreateState] = useState<TeamRequestDto>({
    expectation: '',
    openChatUrl: '',
    projectDescription: '',
    projectName: '',
    frontendMaxCnt: 0,
    backendMaxCnt: 0,
    managerMaxCnt: 0,
    designerMaxCnt: 0,
  });
  const globalStyles = useGlobalStyles();
  const ref_input1 = useRef<TextInput | null>(null);
  const ref_input2 = useRef<TextInput | null>(null);
  const ref_input3 = useRef<TextInput | null>(null);
  const ref_input4 = useRef<TextInput | null>(null);
  const { mutation: createTeamMutation } = useMutationDialog<TeamRequestDto, unknown>(
    teamKeys.createTeam,
    async (dto: TeamRequestDto) => createTeam(dto),
    'BOTTOM',
    {
      onSuccessClick() {
        navigation.goBack();
      },
      resultModalContent: {
        title: t('teamCreateOk'),
        content: t('todoAfterTeamCreate'),
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
    const regex = new RegExp('(https|http)?://(www\\.)?' + 'open.kakao.com' + '/o/.+', 'g');

    setTeamCreateState(prevState => ({
      ...prevState,
      openChatUrl: text.match(regex)?.[0]?.toString() ?? '',
    }));
  }

  function updateProjectDescription(text: string) {
    setTeamCreateState(prevState => ({ ...prevState, projectDescription: text }));
  }

  function updateProjectName(text: string) {
    setTeamCreateState(prevState => ({ ...prevState, projectName: text }));
  }

  function updateTeamMemberRecruitCnts(data: PositionCountDto[]) {
    const frontendCnt = data.find(it => it.position === Position.Frontend)?.totalRecruitCnt || 0;
    const backendCnt = data.find(it => it.position === Position.Backend)?.totalRecruitCnt || 0;
    const designerCnt = data.find(it => it.position === Position.Designer)?.totalRecruitCnt || 0;
    const managerCnt = data.find(it => it.position === Position.Manager)?.totalRecruitCnt || 0;
    setTeamCreateState(prevState => ({
      ...prevState,
      frontendMaxCnt: frontendCnt,
      backendMaxCnt: backendCnt,
      designerMaxCnt: designerCnt,
      managerMaxCnt: managerCnt,
    }));
  }

  function isAllInputValidate() {
    try {
      isRecruitCntValidate(teamCreateState);
    } catch (error) {
      RecruitCntValidationWarningModal();
      return false;
    }

    try {
      isEmptyInputExisted(teamCreateState);
    } catch (error) {
      EmptyInputWarningModal();
      return false;
    }

    try {
      isOpenChatUrlValidate(teamCreateState);
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
          title={t('warn_input_empty')}
          symbol={<Text style={{ fontSize: theme.emojiSize.md, textAlign: 'center' }}>😚</Text>}
          text={t('peptalk_input_empty')}
          yesButton={{ title: t('action_confirm'), onPress: () => modal.hide() }}
        />
      ),
      modalProps: { animationType: 'none', justifying: 'center' },
    });
  };

  const OpenChatValidationWarningModal = () => {
    modal?.show({
      content: (
        <SymbolModalContent
          title={t('warn_openchatlink_invalid_format')}
          symbol={<Text style={{ fontSize: theme.emojiSize.md, textAlign: 'center' }}>🧐</Text>}
          text={t('require_openchatlink_valid')}
          yesButton={{ title: t('action_confirm'), onPress: () => modal.hide() }}
        />
      ),
      modalProps: { animationType: 'none', justifying: 'center' },
    });
  };

  const RecruitCntValidationWarningModal = () => {
    modal?.show({
      content: (
        <SymbolModalContent
          title={t('warn_teammate_notExist')}
          symbol={<Text style={{ fontSize: theme.emojiSize.md, textAlign: 'center' }}>🫥</Text>}
          text={t('require_teammate')}
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
          header="글을 입력하시겠어요?"
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

        <View style={{ paddingTop: 20, paddingBottom: 50 }}>
          <FilledButton
            title={'완료'}
            disabled={false}
            onPress={() => {
              if (isAllInputValidate()) {
                handleCreateTeam();
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
