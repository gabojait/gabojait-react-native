import TeamBanner from '@/presentation/components/TeamBanner';
import { MainStackScreenProps } from '@/presentation/navigation/types';
import React, { Suspense, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import TeamBriefDto from '@/data/model/Team/TeamBriefDto';
import { PageRequest, useModelList } from '@/reactQuery/util/useModelList';
import { getFavoriteTeams, getFavoriteUsers } from '@/data/api/favorite';
import CardWrapper from '@/presentation/components/CardWrapper';
import { RatingBar } from '@/presentation/components/RatingBar';
import Gabojait from '@/presentation/components/icon/Gabojait';
import styles from '@/presentation/styles';
import { theme } from '@/presentation/theme';
import { useTheme } from '@rneui/themed';
import { UserCard } from '@/presentation/components/UserCard';
import { favoriteKeys } from '@/reactQuery/key/FavoriteKeys';
import { isLeader } from '@/presentation/utils/util';
import { Loading } from '../../Loading';
import Error404Boundary from '@/presentation/components/errorComponent/Error404Boundary';
import { useQueryErrorResetBoundary } from 'react-query';

const BookMark = ({ navigation, route }: MainStackScreenProps<'BookMark'>) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <Suspense fallback={Loading()}>
      <Error404Boundary onReset={reset}>
        {route.params.isLeader ? (
          <FavoriteUsers navigation={navigation} route={route} />
        ) : (
          <FavoriteTeams navigation={navigation} route={route} />
        )}
      </Error404Boundary>
    </Suspense>
  );
};

/**
 * 좋아요 누른 팀 리스트입니다.
 * @param navigation
 * @param route
 * @constructor
 */
const FavoriteTeams = ({ navigation, route }: MainStackScreenProps<'BookMark'>) => {
  const QueryKey = {
    all: favoriteKeys.favoriteByTeamList,
    filtered: (filter: PageRequest) => [
      ...QueryKey.all,
      'filtered',
      { ...filter, pageFrom: undefined },
    ],
  };
  const [params, setParams] = useState({ pageFrom: 1, pageSize: 20 } as PageRequest);
  const { data, isLoading, error, fetchNextPage, refetch, isRefreshing } = useModelList({
    initialParam: { ...params },
    idName: 'teamId',
    key: QueryKey.filtered(params),
    fetcher: ({ pageParam, queryKey: [_, __, params] }) => {
      return getFavoriteTeams({ ...(params as PageRequest), pageFrom: pageParam });
    },
  });

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.teamId.toString()}
        data={data?.pages?.map(page => page.data).flat()}
        renderItem={({ item }) => (
          <TeamBanner
            teamMembersCnt={item.teamMemberCnts}
            teamName={item.projectName}
            onArrowPress={() => navigation.navigate('GroupDetail', { teamId: item.teamId })}
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

/**
 * 좋아요 누른 사용자 리스트입니다.
 * @param navigation
 * @param route
 * @constructor
 */
const FavoriteUsers = ({ navigation, route }: MainStackScreenProps<'BookMark'>) => {
  const { theme } = useTheme();
  const QueryKey = {
    all: favoriteKeys.favoriteByUserList,
    filtered: (filter: PageRequest) => [
      ...QueryKey.all,
      'filtered',
      { ...filter, pageFrom: undefined },
    ],
  };
  const [params, setParams] = useState({ pageFrom: 1, pageSize: 20 } as PageRequest);
  const { data, isLoading, error, fetchNextPage, refetch, isRefreshing } = useModelList({
    initialParam: { ...params },
    idName: 'userId',
    key: QueryKey.filtered(params),
    fetcher: ({ pageParam, queryKey: [_, __, params] }) => {
      return getFavoriteUsers({ ...(params as PageRequest), pageFrom: pageParam });
    },
  });

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.userId.toString()}
        data={data?.pages?.map(page => page.data).flat()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.getParent()?.navigate('ProfilePreview', { userId: item.userId });
            }}
          >
            <UserCard item={item} position={item.position} />
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

export default BookMark;
