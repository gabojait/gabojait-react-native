import { GetOfferFromOthersProps, getOfferSentToUser } from '@/data/api/offer';
import { Position } from '@/data/model/type/Position';
import { PositionTabParamListProps } from '@/presentation/navigation/types';
import { offerKeys } from '@/reactQuery/key/OfferKeys';
import { useModelList } from '@/reactQuery/util/useModelList';
import { makeStyles, useTheme } from '@rneui/themed';
import { View, FlatList, TouchableOpacity } from 'react-native';
import React, { Suspense } from 'react';
import { UserCard } from '@/presentation/components/UserCard';
import OffersFromOtherDto from '@/data/model/Offer/OffersFromUserDto';
import { Loading } from '@/presentation/screens/Loading';

const BackendList = ({ navigation, route }: PositionTabParamListProps<'Backend'>) => {
  return (
    <Suspense fallback={Loading()}>
      <BackendListComponent navigation={navigation} route={route} />
    </Suspense>
  );
};

const BackendListComponent = ({ navigation }: PositionTabParamListProps<'Backend'>) => {
  const { theme } = useTheme();
  const initialParam: GetOfferFromOthersProps = {
    pageFrom: 0,
    pageSize: 20,
    position: Position.Backend,
  };
  const { data, fetchNextPage, refetch, isRefreshing } = useModelList<
    GetOfferFromOthersProps,
    OffersFromOtherDto
  >({
    initialParam,
    idName: 'offerId',
    key: offerKeys.getOffersSentToFrontend,
    fetcher: async ({ pageParam, queryKey: [_, param] }) => {
      return await getOfferSentToUser({
        ...(param as GetOfferFromOthersProps),
        pageFrom: pageParam,
      });
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
        keyExtractor={item => item.user.nickname}
        data={data?.pages.map(page => page.data).flat()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.getParent()?.navigate('ProfilePreview', { userId: item.offerId });
            }}
          >
            <UserCard item={item.user} position={Position.Backend} />
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
export default BackendList;
