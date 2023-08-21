import { GetProfileProps, getUserSeekingTeam } from '@/data/api/profile';
import UserProfileOfferDto from '@/data/model/User/UserProfileBriefDto';
import CardWrapper from '@/presentation/components/CardWrapper';
import Gabojait from '@/presentation/components/icon/Gabojait';
import { RatingBar } from '@/presentation/components/RatingBar';
import { useModelList } from '@/reactQuery/util/useModelList';
import { makeStyles, Text, useTheme } from '@rneui/themed';
import React, { Suspense } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Position } from '@/data/model/type/Position';
import { ProfileOrder } from '@/data/model/type/ProfileOrder';
import { PositionTabParamListProps } from '@/presentation/navigation/types';
import { profileKeys } from '@/reactQuery/key/ProfileKeys';
import { UserCard } from '@/presentation/components/UserCard';
import { Loading } from '@/presentation/screens/Loading';

const QueryKey = {
  all: 'PMList',
  filtered: (filter: GetProfileProps) => [...QueryKey.all, 'filtered', filter],
};

const PMList = ({ navigation, route }: PositionTabParamListProps<'PM'>) => {
  return (
    <Suspense fallback={Loading()}>
      <PMListComponent navigation={navigation} route={route} />
    </Suspense>
  );
};

const PMListComponent = ({ navigation, route }: PositionTabParamListProps<'PM'>) => {
  const { theme } = useTheme();
  const initialParam: GetProfileProps = {
    pageFrom: 0,
    pageSize: 20,
    position: Position.Manager,
    profileOrder: 'ACTIVE',
  };
  const { data, isLoading, error, fetchNextPage, refetch, isRefreshing } = useModelList<
    GetProfileProps,
    UserProfileOfferDto
  >({
    initialParam,
    key: profileKeys.pmSeekingTeam,
    idName: 'userId',
    fetcher: async ({ pageParam, queryKey: [_, params] }) => {
      return await getUserSeekingTeam({ ...(params as GetProfileProps), pageFrom: pageParam! });
    },
  });

  if (!data) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        flexGrow: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        paddingVertical: 15,
      }}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.nickname}
        data={data?.pages.map(page => page.data).flat()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.getParent()?.navigate('ProfilePreview', { userId: item.userId });
            }}
          >
            <UserCard item={item} position={Position.Manager} />
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

export default PMList;
