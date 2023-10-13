import { Position } from '@/data/model/type/Position';
import PositionRecruiting from '@/presentation/model/PositionRecruitng';
import { MainStackScreenProps } from '@/presentation/navigation/types';
import React, { Suspense, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { PageRequest, useModelList } from '@/reactQuery/util/useModelList';
import { getOffersFromTeam } from '@/data/api/offer';
import TeamBanner from '@/presentation/components/TeamBanner';
import { Loading } from '@/presentation/screens/Loading';

const QueryKey = {
  all: ['GetOffers'],
  filtered: (filter: PageRequest) => [
    ...QueryKey.all,
    'filtered',
    { ...filter, pageFrom: undefined },
  ],
};

const OfferFromTeamPage = ({ navigation, route }: MainStackScreenProps<'OfferFromTeamPage'>) => {
  return (
    <Suspense fallback={Loading()}>
      <OfferFromTeamPageComponent navigation={navigation} route={route} />
    </Suspense>
  );
};

const OfferFromTeamPageComponent = ({ navigation }: MainStackScreenProps<'OfferFromTeamPage'>) => {
  const [params, setParams] = useState({ pageFrom: 0, pageSize: 20 } as PageRequest);
  const { data, isLoading, error, fetchNextPage, refetch, isRefreshing } = useModelList({
    initialParam: {
      pageFrom: 0,
      pageSize: 20,
    },
    idName: 'offerId',
    fetcher: ({ pageParam, queryKey }) => {
      console.log(pageParam, queryKey);
      return getOffersFromTeam({
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
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.offerId.toString()}
        data={data?.pages?.map(page => page.data).flat()}
        renderItem={({ item }) => (
          <TeamBanner
            teamMembersCnt={item?.team.teamMemberCnts ?? []}
            teamName={item?.team.projectName ?? ''}
            onArrowPress={() => {
              navigation.navigate('TeamDetail', {
                teamId: item.team.teamId,
                targetPosition: item.position,
                offerId: item.offerId,
              });
            }}
            containerStyle={{ marginHorizontal: 20 }}
          />
        )}
        refreshing={isRefreshing}
        onRefresh={refetch}
        onEndReached={() => {
          fetchNextPage();
        }}
        onEndReachedThreshold={0.6}
      />
    </View>
  );
};
export default OfferFromTeamPage;
