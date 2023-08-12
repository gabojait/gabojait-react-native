import { Position } from '@/data/model/type/Position';
import PositionRecruiting from '@/presentation/model/PositionRecruitng';
import { MainStackScreenProps } from '@/presentation/navigation/types';
import React, { useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { PageRequest, useModelList } from '@/reactQuery/util/useModelList';
import { getOffersFromTeam } from '@/data/api/offer';
import TeamBanner from '@/presentation/components/TeamBanner';

const QueryKey = {
  all: ['GetOffers'],
  filtered: (filter: PageRequest) => [
    ...QueryKey.all,
    'filtered',
    { ...filter, pageFrom: undefined },
  ],
};

const OfferFromTeamPage = ({ navigation }: MainStackScreenProps<'OfferFromTeamPage'>) => {
  const arr: PositionRecruiting[] = [{ position: Position.Designer, currentCnt: 0, recruitCnt: 0 }];

  const [params, setParams] = useState({ pageFrom: 0, pageSize: 20 } as PageRequest);
  const { data, isLoading, error, fetchNextPage, refetch, isRefreshing } = useModelList({
    initialParam: {
      pageFrom: 0,
      pageSize: 20,
    },
    fetcher: ({ pageParam, queryKey }) => {
      console.log(pageParam, queryKey);
      return getOffersFromTeam({
        ...(params as PageRequest),
        pageFrom: pageParam,
      });
    },
    key: QueryKey.filtered(params),
  });

  return (
    <View style={{ backgroundColor: 'white', flex: 1, padding: 20 }}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.toString()}
        data={data?.pages?.map(page => page.data).flat()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('TeamDetail', {
                teamId: item.team.teamId,
                targetPosition: item.position,
                offerId: item.offerId,
              });
            }}
          >
            <TeamBanner
              teamMembersCnt={item?.team.teamMemberCnts ?? []}
              teamName={item?.team.projectName ?? ''}
            />
          </TouchableOpacity>
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
