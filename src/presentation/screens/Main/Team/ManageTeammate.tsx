import { fireTeammate, getMyTeam } from '@/data/api/team';
import TeamDto from '@/data/model/Team/TeamDto';
import { OutlinedButton } from '@/presentation/components/Button';
import CardWrapper from '@/presentation/components/CardWrapper';
import { PositionIcon } from '@/presentation/components/PartIcon';
import Error404Boundary from '@/presentation/components/errorComponent/Error404Boundary';
import useModal from '@/presentation/components/modal/useModal';
import BottomModalContent from '@/presentation/components/modalContent/BottomModalContent';
import SymbolModalContent from '@/presentation/components/modalContent/SymbolModalContent';
import { MainStackScreenProps } from '@/presentation/navigation/types';
import useGlobalStyles from '@/presentation/styles';
import { teamKeys } from '@/reactQuery/key/TeamKeys';
import { useMutationDialog } from '@/reactQuery/util/useMutationDialog';
import { Text, useTheme } from '@rneui/themed';
import React, { Suspense, useState } from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import { useQuery, useQueryClient, useQueryErrorResetBoundary, UseQueryResult } from 'react-query';
import { Loading } from '../../Loading';
import { Position } from '@/data/model/type/Position';
import BriefProfileDto from '@/data/model/Profile/BriefProfileDto';

export const ManageTeammate = ({ navigation, route }: MainStackScreenProps<'ManageTeammate'>) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <Suspense fallback={Loading()}>
      <Error404Boundary onReset={reset}>
        <ManageTeammateComponent navigation={navigation} route={route} />
      </Error404Boundary>
    </Suspense>
  );
};

export const ManageTeammateComponent = ({
  navigation,
  route,
}: MainStackScreenProps<'ManageTeammate'>) => {
  const globalStyles = useGlobalStyles();
  const modal = useModal();
  const { theme } = useTheme();
  const [reportState, setReportState] = useState({ text: '' });
  const [reportButtonState, setReportButtonState] = useState({
    text: '신고하기',
    isDisabled: true,
  });
  const queryClient = useQueryClient();

  const {
    data: teamData,
    isLoading: isTeamDataLoading,
    error: teamDataError,
  }: UseQueryResult<TeamDto> = useQuery(teamKeys.myTeam, () => getMyTeam());

  const { mutation: fireTeammateMutation } = useMutationDialog(
    teamKeys.fireTeammate,
    async (userId: number) => fireTeammate(userId),
    'CENTER',
    {
      onSuccessClick() {},
    },
    {
      onSettled: (data, error, variables, context) => {
        queryClient.invalidateQueries(teamKeys.myTeam);
      },
      onMutate: async (userId: number) => {
        await queryClient.cancelQueries(teamKeys.myTeam);
        const oldData = queryClient.getQueryData(teamKeys.myTeam) as TeamDto;
        const newData: TeamDto = updateTeam(userId, oldData);
        queryClient.setQueryData(teamKeys.myTeam, newData);
      },
    },
  );

  function updateTeam(teamMemberId: number, oldData: TeamDto) {
    const position = getPosition(teamMemberId, oldData.teamMembers);
    const newTeamMember = updateTeamMember(teamMemberId, oldData.teamMembers);
    const newPositionsCurrentCnt = updatePositionCurrentCnt(position || Position.None, oldData);
    const newData: TeamDto = {
      ...oldData,
      frontendCurrentCnt: newPositionsCurrentCnt.frontendCurrentCnt,
      backendCurrentCnt: newPositionsCurrentCnt.backendCurrentCnt,
      managerCurrentCnt: newPositionsCurrentCnt.managerCurrentCnt,
      designerCurrentCnt: newPositionsCurrentCnt.designerCurrentCnt,
      teamMembers: newTeamMember,
    };
    return newData;
  }

  function getPosition(teamMemberId: number, data: Array<BriefProfileDto>) {
    const user = data.find(value => value.userId == teamMemberId.toString());
    return user?.position;
  }

  function updateTeamMember(teamMemberId: number, teamMembers: Array<BriefProfileDto>) {
    return teamMembers.filter(value => {
      value.userId != teamMemberId.toString();
    });
  }

  function updatePositionCurrentCnt(position: Position, data: TeamDto) {
    if (position == Position.Frontend) {
      data.frontendCurrentCnt -= 1;
    } else if (position == Position.Backend) {
      data.backendCurrentCnt -= 1;
    } else if (position == Position.Designer) {
      data.designerCurrentCnt -= 1;
    } else if (position == Position.Manager) {
      data.managerCurrentCnt -= 1;
    }
    return data;
  }

  function reportCompeletedModal() {
    modal?.show({
      content: (
        <SymbolModalContent
          title="신고완료!"
          symbol={<Text style={{ fontSize: theme.emojiSize.md, textAlign: 'center' }}>✅</Text>}
          text="신고가 완료되었습니다."
          yesButton={{
            title: '확인',
            onPress: () => modal.hide(),
          }}
        />
      ),
      modalProps: { animationType: 'none', justifying: 'center' },
    });
  }

  function handleReportModal() {
    modal?.show({
      content: (
        <BottomModalContent
          header={<Text style={globalStyles.modalTitle}>"팀원을 신고하시겠습니까?"</Text>}
          inputContent={
            <View style={{ justifyContent: 'center', alignContent: 'center', width: '100%' }}>
              <Text style={[globalStyles.textLight13, { textAlign: 'center', paddingBottom: 10 }]}>
                신고 사유를 적어주세요
              </Text>
              <CardWrapper style={{ minHeight: 75, maxWidth: 400 }}>
                <TextInput
                  value={reportState.text}
                  style={{ width: '100%' }}
                  onChangeText={(text: string) => {
                    setReportState(prevState => ({ ...prevState, text: text }));
                  }}
                  multiline={true}
                  maxLength={500}
                />
              </CardWrapper>
            </View>
          }
          yesButton={{
            title: reportButtonState.text,
            onPress: () => {
              modal.hide();
              reportCompeletedModal();
            },
            disabled: reportButtonState.isDisabled,
          }}
          noButton={{
            title: '나가기',
            onPress: () => {
              modal.hide();
            },
          }}
          neverSeeAgainShow={false}
          onBackgroundPress={modal?.hide}
        />
      ),
      modalProps: { animationType: 'slide', justifying: 'bottom' },
    });
  }

  function confirmBeforeFire(userId: number) {
    modal?.show({
      content: (
        <SymbolModalContent
          title="정말 팀원을 추방하시겠습니까?"
          symbol={<Text style={{ fontSize: theme.emojiSize.md, textAlign: 'center' }}>✅</Text>}
          text={'팀원을 추방하면 팀에서 제외됩니다.'}
          yesButton={{
            title: '확인',
            onPress: async () => {
              await modal?.hide();
              fireTeammateMutation.mutate(userId);
            },
          }}
        />
      ),
      modalProps: { animationType: 'none', justifying: 'center' },
    });
  }

  return (
    <ScrollView style={globalStyles.scrollView}>
      {teamData?.teamMembers.map(item => {
        return (
          <CardWrapper style={[globalStyles.card2]}>
            <View style={globalStyles.container2}>
              <View style={{ alignItems: 'center' }}>
                <PositionIcon
                  position={item.position}
                  isRecruitDone={true}
                  radious={theme.positionIconRadious.md}
                />
                <Text style={[globalStyles.textUnderPosition, { marginStart: -20 }]}>
                  {item.nickname}
                </Text>
              </View>
              <View>
                <OutlinedButton
                  title={'추방하기'}
                  size="sm"
                  onPress={() => {
                    confirmBeforeFire(parseInt(item.userId));
                  }}
                  style={{ paddingBottom: 10 }}
                />
                <OutlinedButton
                  title={'신고하기'}
                  size="sm"
                  onPress={() => {
                    handleReportModal();
                  }}
                  style={{ borderColor: theme.colors.disabled }}
                  titleStyle={{ color: theme.colors.disabled }}
                />
              </View>
            </View>
          </CardWrapper>
        );
      })}
    </ScrollView>
  );
};
