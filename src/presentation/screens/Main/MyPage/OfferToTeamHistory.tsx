import GroupListCard from '@/presentation/components/TeamBanner';
import { MainStackScreenProps } from '@/presentation/navigation/types';
import React, { useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { useAppSelector } from '@/redux/hooks';
import TeamBriefDto from '@/data/model/Team/TeamBriefDto';
import TeamBanner from '@/presentation/components/TeamBanner';
import { getOffersFromTeam, getOffersSentToTeam } from '@/data/api/offer';
import { useModelList, PageRequest } from '@/reactQuery/util/useModelList';
import { offerKeys } from '@/reactQuery/key/OfferKeys';

const OfferToTeamHistory = ({ navigation, route }: MainStackScreenProps<'OfferToTeamHistory'>) => {
  // Todo: API 붙이기
  const QueryKey = {
    all: offerKeys.offersSentToTeam,
    filtered: (filter: PageRequest) => [
      ...QueryKey.all,
      'filtered',
      { ...filter, pageFrom: undefined },
    ],
  };
  const [params, setParams] = useState({ pageFrom: 0, pageSize: 20 } as PageRequest);
  const { data, isLoading, error, fetchNextPage, refetch, isRefreshing } = useModelList({
    initialParam: {
      pageFrom: 0,
      pageSize: 20,
    },
    fetcher: ({ pageParam, queryKey }) => {
      return getOffersSentToTeam({
        ...(params as PageRequest),
        pageFrom: pageParam,
      });
    },
    key: QueryKey.filtered(params),
  });

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.toString()}
        data={data?.pages?.map(page => page.data).flat()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('GroupDetail', { teamId: item.team.teamId })}
          >
            <TeamBanner
              teamMembersCnt={item?.team.teamMemberCnts ?? []}
              teamName={item?.team.projectName ?? ''}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default OfferToTeamHistory;
