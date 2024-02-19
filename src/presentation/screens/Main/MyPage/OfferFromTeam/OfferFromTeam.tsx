import { MainStackScreenProps } from '@/presentation/navigation/types';
import React, { Suspense, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { PageRequest, useModelList } from '@/reactQuery/util/useModelList';
import { getOffersFromTeam } from '@/data/api/offer';
import { Loading } from '@/presentation/screens/Loading';
import { mapTeamDtoToPositionRecruiting } from '@/presentation/model/mapper/mapTeamDtoToPositionRecruiting';
import useGlobalStyles from '@/presentation/styles';
import { useTheme } from '@rneui/themed';
import TeamBanner from '@/presentation/components/TeamBanner';

const QueryKey = {
  all: ['GetOffers'],
  filtered: (filter: PageRequest) => [
    ...QueryKey.all,
    'filtered',
    { ...filter, pageFrom: undefined },
  ],
};

const OfferFromTeam = ({ navigation, route }: MainStackScreenProps<'OfferFromTeam'>) => {
  return (
    <Suspense fallback={Loading()}>
      <OfferFromTeamPageComponent navigation={navigation} route={route} />
    </Suspense>
  );
};

const OfferFromTeamPageComponent = ({ navigation }: MainStackScreenProps<'OfferFromTeam'>) => {
  const [params, setParams] = useState({ pageFrom: 1, pageSize: 20 } as PageRequest);
  const { data, isLoading, error, fetchNextPage, refetch, isRefreshing } = useModelList({
    initialParam: {
      pageFrom: 1,
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
  const globalStyles = useGlobalStyles();
  const { theme } = useTheme();

  useEffect(() => {
    navigation.addListener('focus', () => {
      refetch();
    });
  }, [navigation]);

  if (!data) {
    return null;
  }

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'flex-end',
        position: 'relative',
      }}
    >
      <FlatList
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.offerId.toString()}
        data={data?.pages
          ?.map(page =>
            page.data.map(item => {
              const teamCnts = mapTeamDtoToPositionRecruiting(item.team);
              return {
                ...item,
                teamMemberCnts: teamCnts,
              };
            }),
          )
          .flat()}
        renderItem={({ item }) => (
          <TeamBanner
            teamMembersCnt={item?.teamMemberCnts ?? []}
            teamName={item?.team.projectName ?? ''}
            onArrowPress={() =>
              navigation.navigate('TeamDetail', {
                teamId: item.team.teamId,
                targetPosition: item.position,
                offerId: item.offerId,
              })
            }
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
export default OfferFromTeam;
