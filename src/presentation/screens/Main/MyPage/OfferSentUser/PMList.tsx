import { GetOfferFromOthersProps, getOfferSentToUser } from '@/data/api/offer';
import { Position } from '@/data/model/type/Position';
import { PositionTabParamListProps } from '@/presentation/navigation/types';
import { offerKeys } from '@/reactQuery/key/OfferKeys';
import { PageRequest, useModelList } from '@/reactQuery/util/useModelList';
import { makeStyles, useTheme } from '@rneui/themed';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { useQueryClient } from 'react-query';
import React, { Suspense, useState } from 'react';
import { UserCard } from '@/presentation/components/UserCard';
import OffersFromOtherDto from '@/data/model/Offer/OffersFromUserDto';
import { Loading } from '@/presentation/screens/Loading';

const PMList = ({ navigation, route }: PositionTabParamListProps<'PM'>) => {
  return (
    <Suspense fallback={Loading()}>
      <PMListComponent navigation={navigation} route={route} />
    </Suspense>
  );
};

const PMListComponent = ({ navigation, route }: PositionTabParamListProps<'PM'>) => {
  const { theme } = useTheme();
  const styles = useStyles();
  const queryClient = useQueryClient();
  const initialParam: GetOfferFromOthersProps = {
    pageFrom: 0,
    pageSize: 20,
    position: Position.Manager,
  };
  const [params, setParams] = useState({ pageFrom: 0, pageSize: 20 } as PageRequest);
  const { data, isLoading, error, fetchNextPage, refetch, isRefreshing } = useModelList<
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
export default PMList;
