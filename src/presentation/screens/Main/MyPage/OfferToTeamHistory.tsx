import GroupListCard from '@/presentation/components/TeamBanner';
import { MainStackScreenProps } from '@/presentation/navigation/types';
import React, { Suspense, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { useAppSelector } from '@/redux/hooks';
import TeamBriefDto from '@/data/model/Team/TeamBriefDto';
import TeamBanner from '@/presentation/components/TeamBanner';
import { getOffersFromTeam, getOffersSentToTeam } from '@/data/api/offer';
import { useModelList, PageRequest } from '@/reactQuery/util/useModelList';
import { offerKeys } from '@/reactQuery/key/OfferKeys';
import Error404Boundary from '@/presentation/components/errorComponent/Error404Boundary';
import { useQueryErrorResetBoundary } from 'react-query';
import { Loading } from '../../Loading';

const OfferToTeamHistory = ({ navigation, route }: MainStackScreenProps<'OfferToTeamHistory'>) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <Suspense fallback={Loading()}>
      <Error404Boundary onReset={reset}>
        <OfferToTeamHistoryComponent navigation={navigation} route={route} />
      </Error404Boundary>
    </Suspense>
  );
};

const OfferToTeamHistoryComponent = ({
  navigation,
  route,
}: MainStackScreenProps<'OfferToTeamHistory'>) => {
  const QueryKey = {
    all: offerKeys.offersSentToTeam,
    filtered: (filter: PageRequest) => [
      ...QueryKey.all,
      'filtered',
      { ...filter, pageFrom: undefined },
    ],
  };
  const [params, setParams] = useState({ pageFrom: 1, pageSize: 20 } as PageRequest);
  const { data, isLoading, error, fetchNextPage, refetch, isRefreshing } = useModelList({
    initialParam: {
      pageFrom: 1,
      pageSize: 20,
    },
    idName: 'offerId',
    fetcher: ({ pageParam, queryKey }) => {
      return getOffersSentToTeam({
        ...(params as PageRequest),
        pageFrom: pageParam,
      });
    },
    key: QueryKey.filtered(params),
  });

  if (!data) {
    return null;
  }

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <FlatList
        onRefresh={() => {
          refetch();
        }}
        refreshing={isRefreshing}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.offerId.toString()}
        data={data?.pages?.map(page => page.data).flat()}
        renderItem={({ item }) => (
          <TeamBanner
            teamMembersCnt={item?.team.teamMemberCnts ?? []}
            teamName={item?.team.projectName ?? ''}
            onArrowPress={() => navigation.navigate('GroupDetail', { teamId: item.team.teamId })}
            containerStyle={{ marginHorizontal: 20 }}
          />
        )}
      />
    </View>
  );
};

export default OfferToTeamHistory;
