import { getTeam } from '@/data/api/team';
import TeamDetailDto from '@/data/model/Team/TeamDetailDto';
import { Position } from '@/data/model/type/Position';
import Error404Boundary from '@/presentation/components/errorComponent/Error404Boundary';
import { MainStackScreenProps } from '@/presentation/navigation/types';
import useGlobalStyles from '@/presentation/styles';
import { teamKeys } from '@/reactQuery/key/TeamKeys';
import React, { Suspense, useEffect, useState } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { UseQueryResult, useQuery, useQueryClient, useQueryErrorResetBoundary } from 'react-query';
import {} from '../../Home/Group/PositionSelector';
import { ApplyPositionCard, RecruitStatusType } from '@/presentation/components/ApplyPositionCard';
import PositionRecruiting from '@/presentation/model/PositionRecruitng';
import BriefOfferDto from '@/data/model/Offer/BriefOfferDto';
import { applyToTeam, decideOfferFromTeam } from '@/data/api/offer';
import { offerKeys } from '@/reactQuery/key/OfferKeys';
import { useMutationDialog } from '@/reactQuery/util/useMutationDialog';
import { Loading } from '@/presentation/screens/Loading';

const JoinTeam = ({ navigation, route }: MainStackScreenProps<'JoinTeam'>) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <Suspense fallback={Loading()}>
      <Error404Boundary onReset={reset}>
        <TeamDetailComponent navigation={navigation} route={route} />
      </Error404Boundary>
    </Suspense>
  );
};

const TeamDetailComponent = ({ navigation, route }: MainStackScreenProps<'JoinTeam'>) => {
  const globalStyles = useGlobalStyles();
  const { teamId } = route.params!;
  const queryClient = useQueryClient();
  const { data, isLoading, error }: UseQueryResult<TeamDetailDto> = useQuery(
    [teamKeys.getTeam, teamId],
    () => getTeam(teamId),
    {
      useErrorBoundary: true,
    },
  );
  const positions = data?.teamMemberCnts || [];
  const { mutation: decideMutation } = useMutationDialog<[number, boolean], unknown>(
    offerKeys.offerToTeam,
    (args: [number, boolean]) => decideOfferFromTeam(...args),
    'CENTER',
    {
      resultModalContent: {
        content: '팀에 합류하셨습니다!',
      },
      onSuccessClick() {
        queryClient.invalidateQueries([teamKeys.getTeam, teamId]);
      },
    },
  );

  if (!data) {
    return null;
  }

  return (
    <ScrollView style={globalStyles.scrollView}>
      {positions.map((item, index) => (
        <View style={{ paddingTop: 20 }}>
          <JoinTeamWrapper
            data={item}
            offers={data.offers}
            onButtonPressed={() => {
              decideMutation.mutate([route.params.offerId, true]);
            }}
            targetPosition={route.params.targetPosition}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const JoinTeamWrapper = ({
  data,
  offers,
  onButtonPressed,
  targetPosition,
}: {
  data: PositionRecruiting;
  offers: BriefOfferDto[];
  onButtonPressed: () => void;
  targetPosition: Position;
}) => {
  const [state, setState] = useState({
    buttonTitle: handleButtonState(),
    disabled: true,
    offered: handleOfferedState(),
  });

  useEffect(() => {
    const buttonTitle = handleButtonState();
    setState(prevState => ({ ...prevState, buttonState: buttonTitle }));
  }, [offers]);

  useEffect(() => {
    if (state.offered) {
      setState(prevState => ({ ...prevState, disabled: false }));
    } else {
      setState(prevState => ({ ...prevState, disabled: true }));
    }
  }, [state.offered]);

  function handleButtonState(): RecruitStatusType {
    if (data.currentCnt == data.recruitCnt) {
      return '모집완료';
    }
    return '함께하기';
  }

  function handleOfferedState(): boolean {
    const offerThisPosition = data.position == targetPosition ? true : false;
    if (offerThisPosition) {
      return true;
    }
    return false;
  }

  return (
    <ApplyPositionCard
      data={data}
      offers={offers}
      buttonTitle={state.buttonTitle}
      isButtonDisabled={state.disabled}
      onApplyButtonPressed={() => {
        onButtonPressed();
      }}
    />
  );
};

export default JoinTeam;
