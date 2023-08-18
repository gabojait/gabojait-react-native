import { getTeamsToReview } from '@/data/api/review';
import TeamDto from '@/data/model/Team/TeamDto';
import TeamBanner from '@/presentation/components/TeamBanner';
import Error404Boundary from '@/presentation/components/errorComponent/Error404Boundary';
import { MainStackScreenProps } from '@/presentation/navigation/types';
import { reviewKeys } from '@/reactQuery/key/ReviewKeys';
import { PageRequest } from '@/reactQuery/util/useModelList';
import React, { Suspense } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { UseQueryResult, useQuery, useQueryErrorResetBoundary } from 'react-query';
import { Loading } from '../../Loading';

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
  const { data, isLoading, error }: UseQueryResult<TeamDto[]> = useQuery(
    [reviewKeys.reviewAvailableTeams],
    async () => getTeamsToReview,
    {
      useErrorBoundary: true,
    },
  );

  if (!data) {
    return null;
  }

  return (
    <>
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.toString()}
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('TeamReview', { teamId: item.teamId })}
            >
              <TeamBanner teamMembersCnt={item.teamMemberCnts} teamName={item.projectName} />
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
}
