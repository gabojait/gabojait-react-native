import { GetProfileProps, getUserSeekingTeam } from '@/data/api/profile';
import UserProfileOfferDto from '@/data/model/User/UserProfileBriefDto';
import CardWrapper from '@/presentation/components/CardWrapper';
import Gabojait from '@/presentation/components/icon/Gabojait';
import { RatingBar } from '@/presentation/components/RatingBar';
import {
  PositionTabParamListProps,
  TeammateStackParamListProps,
} from '@/presentation/navigation/types';

import { useModelList } from '@/reactQuery/util/useModelList';
import { makeStyles, Text, useTheme } from '@rneui/themed';
import React, { Suspense } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Position } from '@/data/model/type/Position';
import { ProfileOrder } from '@/data/model/type/ProfileOrder';
import { profileKeys } from '@/reactQuery/key/ProfileKeys';
import { UserCard } from '@/presentation/components/UserCard';
import Error404Boundary from '@/presentation/components/errorComponent/Error404Boundary';
import { Loading } from '@/presentation/screens/Loading';
import { useQueryErrorResetBoundary } from 'react-query';

const QueryKey = {
  all: 'designerList',
  filtered: (filter: GetProfileProps) => [...QueryKey.all, 'filtered', filter],
};

const DesignerList = ({ navigation, route }: PositionTabParamListProps<'Designer'>) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <Suspense fallback={Loading()}>
      <Error404Boundary onReset={reset} message="모집할 수 있는 팀원이 없어요">
        <DesignerListComponent navigation={navigation} route={route} />
      </Error404Boundary>
    </Suspense>
  );
};

const DesignerListComponent = ({ navigation, route }: PositionTabParamListProps<'Designer'>) => {
  const { theme } = useTheme();
  const initialParam: GetProfileProps = {
    pageFrom: 0,
    pageSize: 20,
    position: Position.Designer,
    profileOrder: 'ACTIVE',
  };
  const { data, isLoading, error, fetchNextPage, refetch, isRefreshing } = useModelList<
    GetProfileProps,
    UserProfileOfferDto
  >({
    initialParam,
    idName: 'userId',
    key: profileKeys.designerSeekingTeam,
    fetcher: async ({ pageParam, queryKey: [_, params] }) => {
      return await getUserSeekingTeam({ ...(params as GetProfileProps), pageFrom: pageParam }!);
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
            <UserCard item={item} position={Position.Designer} />
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

export default DesignerList;
