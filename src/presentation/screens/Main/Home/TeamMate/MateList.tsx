import { GetProfileProps, getUserSeekingTeam } from '@/data/api/profile';
import UserProfileOfferDto from '@/data/model/User/UserProfileBriefDto';
import { useModelList } from '@/reactQuery/util/useModelList';
import { useTheme } from '@rneui/themed';
import { PositionTabParamList, PositionTabParamListProps } from '@/presentation/navigation/types';
import React, { Suspense, useEffect } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { UserCard } from '@/presentation/components/UserCard';
import Error404Boundary from '@/presentation/components/errorComponent/Error404Boundary';
import { Loading } from '@/presentation/screens/Loading';
import { useQueryErrorResetBoundary } from 'react-query';
import { mapToSeekingTeamKey } from '@/presentation/utils/util';

const MateList = ({ navigation, route }: PositionTabParamListProps<keyof PositionTabParamList>) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <Suspense fallback={Loading()}>
      <Error404Boundary onReset={reset} message="모집할 수 있는 팀원이 없어요">
        <MateListComponent navigation={navigation} route={route} />
      </Error404Boundary>
    </Suspense>
  );
};

const MateListComponent = ({
  navigation,
  route,
}: PositionTabParamListProps<keyof PositionTabParamList>) => {
  const { theme } = useTheme();
  const initialParam: GetProfileProps = {
    pageFrom: 1,
    pageSize: 20,
    position: route.params.position,
    profileOrder: 'ACTIVE',
  };
  const { data, isLoading, error, fetchNextPage, refetch, isRefreshing } = useModelList<
    GetProfileProps,
    UserProfileOfferDto
  >({
    initialParam,
    idName: 'userId',
    key: mapToSeekingTeamKey[route.params.position],
    fetcher: async ({ pageParam, queryKey: [_, param] }) => {
      return await getUserSeekingTeam({ ...(param as GetProfileProps), pageFrom: pageParam });
    },
  });

  useEffect(() => {
    console.log('currentPosition: ', route.params.position);
    refetch();
  }, [route]);

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
        keyExtractor={item => item.userId}
        data={data?.pages.map(page => page.data).flat()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.getParent()?.navigate('MainNavigation', {
                screen: 'ProfilePreview',
                params: { userId: item.userId },
              });
            }}
          >
            <UserCard item={item} position={route.params.position} />
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

export default MateList;
