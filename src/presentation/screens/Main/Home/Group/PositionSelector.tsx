import { makeStyles, useTheme } from '@rneui/themed';
import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { MainStackScreenProps } from '@/presentation/navigation/types';
import { useQuery, useQueryClient, useQueryErrorResetBoundary, UseQueryResult } from 'react-query';
import TeamDetailDto from '@/data/model/Team/TeamDetailDto';
import { getTeam } from '@/data/api/team';
import PositionRecruiting from '@/presentation/model/PositionRecruitng';
import BriefOfferDto from '@/data/model/Offer/BriefOfferDto';
import {
  Position,
  PositionCurrentCntField,
  PositionFromIndex,
  PositionMaxCntField,
} from '@/data/model/type/Position';
import { applyToTeam } from '@/data/api/offer';
import useModal from '@/presentation/components/modal/useModal';
import { teamKeys } from '@/reactQuery/key/TeamKeys';
import { useMutationDialog } from '@/reactQuery/util/useMutationDialog';
import { offerKeys } from '@/reactQuery/key/OfferKeys';
import Error404Boundary from '@/presentation/components/errorComponent/Error404Boundary';
import { ApplyPositionCard, RecruitStatusType } from '@/presentation/components/ApplyPositionCard';
import { Loading } from '@/presentation/screens/Loading';

const PositionSelector = ({ navigation, route }: MainStackScreenProps<'PositionSelector'>) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <Suspense fallback={Loading()}>
      <Error404Boundary onReset={reset}>
        <PositionSelectorComponent navigation={navigation} route={route} />
      </Error404Boundary>
    </Suspense>
  );
};

const PositionSelectorComponent = ({
  navigation,
  route,
}: MainStackScreenProps<'PositionSelector'>) => {
  const { theme } = useTheme();
  const styles = useStyles();
  const modal = useModal();
  const { teamId } = route.params!;
  const { data, isLoading, error }: UseQueryResult<TeamDetailDto> = useQuery(
    [teamKeys.getTeam, teamId],
    () => getTeam(teamId),
  );
  const teamRecruits = useMemo(() => {
    const teamCnts = [];
    for (let i = 0; i < 5; i++) {
      if (data && data[PositionMaxCntField[PositionFromIndex[i]]] > 0) {
        teamCnts.push({
          currentCnt: data[PositionCurrentCntField[PositionFromIndex[i]]],
          recruitCnt: data[PositionMaxCntField[PositionFromIndex[i]]],
          position: PositionFromIndex[i],
        });
      }
    }
    return teamCnts;
  }, [data]);
  const queryClient = useQueryClient();
  const { mutation: offerMutation } = useMutationDialog<[Position, string], unknown>(
    offerKeys.offerToTeam,
    (args: [Position, string]) => applyToTeam(...args),
    'BOTTOM',
    {
      onSuccessClick() {
        queryClient.invalidateQueries([teamKeys.getTeam, teamId]);
      },
      resultModalContent: {
        icon: '👏',
        title: '지원완료!',
        content: '요청이 전달되었습니다 결과를 기다려주세요',
      },
    },
  );
  if (!data) {
    return null;
  }

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <FlatList
        style={{ backgroundColor: 'white' }}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.position}
        data={teamRecruits}
        renderItem={({ item }) => (
          <View style={{ paddingTop: 20 }}>
            <PositionSelectWrapper
              data={item}
              offers={data!.offers}
              onButtonPressed={(position: Position) => {
                offerMutation.mutate([position, teamId]);
              }}
            />
          </View>
        )}
      />
    </View>
  );
};

const PositionSelectWrapper = ({
  data,
  offers,
  onButtonPressed,
}: {
  data: PositionRecruiting;
  offers: BriefOfferDto[];
  onButtonPressed: (position: Position) => void;
}) => {
  const styles = useStyles();
  const [state, setState] = useState({
    buttonTitle: handleButtonState(),
    buttonDisabled: false,
  });

  useEffect(() => {
    const buttonTitle = handleButtonState();
    const buttonDisabled = handleButtonDisabled();
    setState(prevState => ({ ...prevState, buttonTitle: buttonTitle }));
    setState(prevState => ({ ...prevState, buttonDisabled: buttonDisabled }));
  }, [offers]);

  useEffect(() => {
    if (state.buttonTitle == '함께하기') {
      setState(prevState => ({ ...prevState, buttonDisabled: false }));
    } else {
      setState(prevState => ({ ...prevState, buttonDisabled: true }));
    }
  }, [state.buttonTitle]);

  function handleButtonDisabled() {
    if (state.buttonTitle == '함께하기') {
      return false;
    } else {
      return true;
    }
  }

  function handleButtonState(): RecruitStatusType {
    const offerThisPosition = offers.some(item => item.position == data.position);
    if (data.currentCnt == data.recruitCnt) {
      return '모집완료';
    } else if (offerThisPosition) {
      return '지원완료';
    }
    return '함께하기';
  }

  return (
    <ApplyPositionCard
      data={data}
      offers={offers}
      buttonTitle={state.buttonTitle}
      isButtonDisabled={state.buttonDisabled}
      onApplyButtonPressed={(position: Position) => {
        onButtonPressed(position);
      }}
    />
  );
};

const useStyles = makeStyles(theme => ({
  scrollView: {
    backgroundColor: theme.colors.white,
    paddingVertical: 18,
  },
  card: {
    padding: 30,
    marginVertical: 5,
    marginHorizontal: 20,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    minHeight: 100,
  },
  text: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    paddingTop: 10,
  },
  posiionText: {
    fontSize: 20,
    fontWeight: theme.fontWeight.bold,
  },
}));

export default PositionSelector;
