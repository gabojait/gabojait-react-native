import { getTeamsToReview } from '@/data/api/review';
import TeamDto from '@/data/model/Team/TeamDto';
import TeamBanner from '@/presentation/components/TeamBanner';
import Error404Boundary from '@/presentation/components/errorComponent/Error404Boundary';
import { MainStackScreenProps } from '@/presentation/navigation/types';
import { reviewKeys } from '@/reactQuery/key/ReviewKeys';
import { PageRequest } from '@/reactQuery/util/useModelList';
import React, { Suspense } from 'react';
import { FlatList, View } from 'react-native';
import { useQuery, useQueryErrorResetBoundary, UseQueryResult } from 'react-query';
import { Loading } from '../../Loading';
import { mapTeamDtoToPositionRecruiting } from '@/presentation/model/mapper/mapTeamDtoToPositionRecruiting';

export default function TeamHistory({ navigation, route }: MainStackScreenProps<'TeamHistory'>) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <Suspense fallback={Loading()}>
      <Error404Boundary onReset={reset}>
        <TeamHistoryComponent navigation={navigation} route={route} />
      </Error404Boundary>
    </Suspense>
  );
}

function TeamHistoryComponent({ navigation, route }: MainStackScreenProps<'TeamHistory'>) {
  const QueryKey = {
    all: reviewKeys.reviewAvailableTeams,
    filtered: (filter: PageRequest) => [
      ...QueryKey.all,
      'filtered',
      { ...filter, pageFrom: undefined },
    ],
  };
  const {
    data: teamHistory,
    isLoading,
    error,
  }: UseQueryResult<{ data: TeamDto[]; total: number }> = useQuery(
    [reviewKeys.reviewAvailableTeams],
    () => getTeamsToReview(),
    {
      useErrorBoundary: true,
    },
  );

  if (!teamHistory) {
    return null;
  }

  return (
    <>
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, _) => item?.projectName.concat(item.teamId)}
          data={
            teamHistory?.data?.map(item => {
              const teamCnts = mapTeamDtoToPositionRecruiting(item);
              return {
                ...item,
                teamMemberCnts: teamCnts,
              };
            }) || []
          }
          renderItem={({ item }) => (
            <TeamBanner
              teamMembersCnt={item.teamMemberCnts ?? []}
              teamName={item.projectName}
              onArrowPress={() => navigation.navigate('TeamReview', { teamId: item.teamId })}
              containerStyle={{ marginHorizontal: 20 }}
            />
          )}
        />
      </View>
    </>
  );
}
