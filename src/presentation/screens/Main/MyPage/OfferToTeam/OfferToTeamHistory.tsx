import { MainStackScreenProps } from '@/presentation/navigation/types';
import React, { Suspense, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { getOffersSentToTeam } from '@/data/api/offer';
import { PageRequest, useModelList } from '@/reactQuery/util/useModelList';
import { offerKeys } from '@/reactQuery/key/OfferKeys';
import Error404Boundary from '@/presentation/components/errorComponent/Error404Boundary';
import { useQueryErrorResetBoundary } from 'react-query';
import { Loading } from '../../../Loading';
import { mapTeamDtoToPositionRecruiting } from '@/presentation/model/mapper/mapTeamDtoToPositionRecruiting';
import useGlobalStyles from '@/presentation/styles';
import { useTheme } from '@rneui/themed';
import TeamBanner from '@/presentation/components/TeamBanner';

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
  const globalStyles = useGlobalStyles();
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
      }}
    >
      <FlatList
        onRefresh={() => {
          refetch();
        }}
        refreshing={isRefreshing}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => item?.team.projectName.concat(item.offerId.toString())}
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
            onArrowPress={() => navigation.navigate('GroupDetail', { teamId: item.team.teamId })}
            containerStyle={{ marginHorizontal: 20 }}
          />
        )}
      />
    </View>
  );
};

export default OfferToTeamHistory;
