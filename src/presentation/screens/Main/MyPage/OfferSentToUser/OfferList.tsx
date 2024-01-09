import { GetOfferFromOthersProps, getOfferSentToUser } from '@/data/api/offer';
import { Position } from '@/data/model/type/Position';
import { PositionTabParamList, PositionTabParamListProps } from '@/presentation/navigation/types';
import { positionToSentOfferKey } from '@/reactQuery/key/OfferKeys';
import { PageRequest, useModelList } from '@/reactQuery/util/useModelList';
import { makeStyles } from '@rneui/themed';
import { FlatList, TouchableOpacity, View } from 'react-native';
import React, { Suspense, useEffect, useState } from 'react';
import { UserCard } from '@/presentation/components/UserCard';
import OffersFromOtherDto from '@/data/model/Offer/OffersFromUserDto';
import { Loading } from '@/presentation/screens/Loading';
import { useQueryClient } from 'react-query';

const OfferList = ({
  navigation,
  route,
}: PositionTabParamListProps<keyof PositionTabParamList>) => {
  return (
    <Suspense fallback={Loading()}>
      <OfferListComponent navigation={navigation} route={route} />
    </Suspense>
  );
};

const OfferListComponent = ({
  navigation,
  route,
}: PositionTabParamListProps<keyof PositionTabParamList>) => {
  const initialParam: GetOfferFromOthersProps = {
    pageFrom: 1,
    pageSize: 20,
    position: route.params.position,
  };
  const queryClient = useQueryClient();
  const [params, setParams] = useState({ pageFrom: 1, pageSize: 20 } as PageRequest);
  const { data, isLoading, error, fetchNextPage, refetch, isRefreshing } = useModelList<
    GetOfferFromOthersProps,
    OffersFromOtherDto
  >({
    initialParam,
    idName: 'offerId',
    key: positionToSentOfferKey[route.params.position],
    fetcher: async ({ pageParam, queryKey: [_, param] }) => {
      return await getOfferSentToUser({
        ...(param as GetOfferFromOthersProps),
        pageFrom: pageParam,
      });
    },
  });

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
        flex: 1,
        flexGrow: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        paddingVertical: 15,
      }}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.user.nickname}
        data={data?.pages.map(page => page.data).flat()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.getParent()?.navigate('ProfilePreview', { userId: item.offerId });
            }}
          >
            <UserCard item={item.user} position={Position.Manager} />
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
const useStyles = makeStyles(theme => ({
  name: {
    fontSize: 18,
    fontWeight: theme.fontWeight?.semibold,
    color: 'black',
  },
  position: {
    fontSize: 12,
    fontWeight: theme.fontWeight?.light,
    color: 'black',
    paddingBottom: 10,
  },
  score: {
    fontSize: 20,
    fontWeight: theme.fontWeight?.bold,
    color: 'black',
    paddingLeft: 10,
  },
}));
export default OfferList;
