import {
  GetOfferFromOthersProps,
  rejectOfferFromUser,
  acceptOfferFromUser,
  getOfferSentToUser,
} from '@/data/api/offer';
import { Position } from '@/data/model/type/Position';
import { PositionTabParamListProps } from '@/presentation/navigation/types';
import { offerKeys } from '@/reactQuery/key/OfferKeys';
import { PageRequest, useModelList } from '@/reactQuery/util/useModelList';
import { useMutationDialog } from '@/reactQuery/util/useMutationDialog';
import { makeStyles, useTheme } from '@rneui/themed';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { useQueryClient } from 'react-query';
import React, { useState } from 'react';
import { UserCard } from '@/presentation/components/UserCard';
import { profileKeys } from '@/reactQuery/key/ProfileKeys';
import OffersFromOtherDto from '@/data/model/Offer/OffersFromUserDto';

const FrontendList = ({ navigation, route }: PositionTabParamListProps<'Backend'>) => {
  const { theme } = useTheme();
  const styles = useStyles();
  const queryClient = useQueryClient();
  const initialParam: GetOfferFromOthersProps = {
    pageFrom: 0,
    pageSize: 20,
    position: Position.Backend,
  };
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

  const { mutation: rejectOfferMutation } = useMutationDialog(
    offerKeys.rejectOfferFromUser,
    async (offerId: number) => rejectOfferFromUser(offerId),
  );

  const { mutation: acceptOfferMutation } = useMutationDialog(
    offerKeys.acceptOfferFromUser,
    async (args: [number, boolean]) => acceptOfferFromUser(...args),
  );

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
export default FrontendList;
