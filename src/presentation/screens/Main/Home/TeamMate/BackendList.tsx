import { GetProfileProps, getUserSeekingTeam } from '@/data/api/profile';
import UserProfileOfferDto from '@/data/model/User/UserProfileBriefDto';
import CardWrapper from '@/presentation/components/CardWrapper';
import Gabojait from '@/presentation/components/icon/Gabojait';
import { RatingBar } from '@/presentation/components/RatingBar';
import { PageModel, useModelList } from '@/reactQuery/util/useModelList';
import { makeStyles, Text, useTheme } from '@rneui/themed';
import { PositionTabParamListProps } from '@/presentation/navigation/types';
import React, { Suspense } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Position } from '@/data/model/type/Position';
import { profileKeys } from '@/reactQuery/key/ProfileKeys';
import { UserCard } from '@/presentation/components/UserCard';
import Error404Boundary from '@/presentation/components/errorComponent/Error404Boundary';
import { Loading } from '@/presentation/screens/Loading';
import { useQueryErrorResetBoundary } from 'react-query';

const QueryKey = {
  all: 'backendList',
  filtered: (filter: GetProfileProps) => [...QueryKey.all, 'filtered', filter],
};

const BackendList = ({ navigation, route }: PositionTabParamListProps<'Backend'>) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <Suspense fallback={Loading()}>
      <Error404Boundary onReset={reset} message="모집할 수 있는 팀원이 없어요">
        <BackendListComponent navigation={navigation} route={route} />
      </Error404Boundary>
    </Suspense>
  );
};

const BackendListComponent = ({ navigation, route }: PositionTabParamListProps<'Backend'>) => {
  const { theme } = useTheme();
  const initialParam: GetProfileProps = {
    pageFrom: 0,
    pageSize: 20,
    position: Position.Backend,
    profileOrder: 'ACTIVE',
  };
  const { data, isLoading, error, fetchNextPage, refetch, isRefreshing } = useModelList<
    GetProfileProps,
    UserProfileOfferDto
  >({
    initialParam,
    idName: 'userId',
    key: profileKeys.backendSeekingTeam,
    fetcher: async ({ pageParam, queryKey: [_, param] }) => {
      return await getUserSeekingTeam({ ...(param as GetProfileProps), pageFrom: pageParam });
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
            <UserCard item={item} position={Position.Backend} />
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

export default BackendList;
