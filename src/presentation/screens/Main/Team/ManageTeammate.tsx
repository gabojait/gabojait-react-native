import { fireTeammate, getMyTeam } from '@/data/api/team';
import TeamDto from '@/data/model/Team/TeamDto';
import { OutlinedButton } from '@/presentation/components/Button';
import CardWrapper from '@/presentation/components/CardWrapper';
import { PositionIcon } from '@/presentation/components/PartIcon';
import useModal from '@/presentation/components/modal/useModal';
import BottomModalContent from '@/presentation/components/modalContent/BottomModalContent';
import SymbolModalContent from '@/presentation/components/modalContent/SymbolModalContent';
import { MainStackScreenProps } from '@/presentation/navigation/types';
import useGlobalStyles from '@/presentation/styles';
import { TeamRefetchKey, teamKeys } from '@/reactQuery/key/TeamKeys';
import { useMutationForm } from '@/reactQuery/util/useMutationForm';
import { useTheme } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { UseQueryResult, useMutation, useQuery, useQueryClient } from 'react-query';

export const ManageTeammate = ({ navigation }: MainStackScreenProps<'ManageTeammate'>) => {
  const globalStyles = useGlobalStyles();
  const modal = useModal();
  const { theme } = useTheme();
  const [reportState, setReportState] = useState('');
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

  //   const teammateFire = useMutationForm<number, unknown>({
  //     mutationKey: teamKeys.fireTeammate,
  //     mutationFn: async (userId: number) => fireTeammate(userId),
  //     useErrorBoundary: false,
  //   });

  const teammateFire = useMutation(
    teamKeys.fireTeammate,
    async (userId: number) => fireTeammate(userId),
    {
      onSuccess: (data, variables, context) => {
        console.log(`queryClient.invalidateQueries(teamKeys.myTeam);`);
        //TODO: refetch 후 리렌더링 시킬 방법-> myTeam 404상태만 걸러서 보여주자
        //queryClient.invalidateQueries(teamKeys.myTeam);
      },
    },
  );

  function reportCompeletedModal() {
    modal?.show({
      content: (
        <SymbolModalContent
          title="신고완료!"
          symbol={<Text style={{ fontSize: theme.emojiSize.md, textAlign: 'center' }}>✅</Text>}
          text={'신고가 완료되었습니다.'}
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
          title="팀원을 신고하시겠습니까?"
          children={
            <View>
              <Text style={globalStyles.textLight11}>신고 사유를 적어주세요</Text>
              <CardWrapper style={[globalStyles.card, { minHeight: 160 }]}>
                <TextInput
                  value={reportState}
                  onChangeText={(text: string) => {
                    setReportState(text);
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
            onPress: () => {
              teammateFire.mutate(userId);
              modal?.hide();
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
                <PositionIcon position={item.position} />
                <Text style={globalStyles.textUnderPosition}>{item.nickname}</Text>
              </View>
              <View>
                <OutlinedButton
                  title={'추방하기'}
                  size="sm"
                  onPress={() => {
                    confirmBeforeFire(parseInt(item.userId));
                  }}
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
