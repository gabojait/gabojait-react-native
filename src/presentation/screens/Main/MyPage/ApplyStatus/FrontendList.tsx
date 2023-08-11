import {
  GetOfferFromUsersProps,
  acceptOfferFromUser,
  getOffersFromUser,
  rejectOfferFromUser,
} from '@/data/api/offer';
import { Position } from '@/data/model/type/Position';
import { OutlinedButton } from '@/presentation/components/Button';
import CardWrapper from '@/presentation/components/CardWrapper';
import { RatingBar } from '@/presentation/components/RatingBar';
import { PositionTabParamListProps } from '@/presentation/navigation/types';
import { offerKeys } from '@/reactQuery/key/OfferKeys';
import { useModelList } from '@/reactQuery/util/useModelList';
import { useMutationDialog } from '@/reactQuery/util/useMutationDialog';
import { makeStyles, useTheme } from '@rneui/themed';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useQueryClient } from 'react-query';

const FrontendList = ({ navigation, route }: PositionTabParamListProps<'Frontend'>) => {
  const { theme } = useTheme();
  const styles = useStyles();
  const queryClient = useQueryClient();
  const { data, isLoading, error, fetchNextPage, refetch, isRefreshing } = useModelList({
    initialParam: {
      pageFrom: 0,
      pageSize: 20,
      position: Position.Frontend,
    },
    key: offerKeys.getOffersFromFrontend,
    fetcher: async ({ pageParam, queryKey: [_, params] }) => {
      console.log('fetch!!');
      console.log('pageParam:', pageParam);
      return await getOffersFromUser({
        ...(params as GetOfferFromUsersProps),
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
        data={data?.pages?.map(page => page.data).flat()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation
                .getParent()
                ?.getParent()
                ?.navigate('MainBottomTabNavigation', { screen: 'Team' })
            }
          >
            <CardWrapper
              style={{
                marginVertical: 10,
                marginHorizontal: 20,
                borderWidth: 1,
                borderColor: theme.colors.disabled,
                borderRadius: theme.radius.xxl,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  paddingVertical: 20,
                  paddingHorizontal: 15,
                  justifyContent: 'space-between',
                  alignContent: 'center',
                }}
              >
                <View style={{ justifyContent: 'center' }}>
                  <Text style={styles.name}>{item.user.nickname}</Text>
                  <Text style={styles.position}>{item.user.position}</Text>
                  <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                    <RatingBar ratingScore={3.5} size={theme.ratingBarSize.md} />
                    <Text style={styles.score}>3.5</Text>
                  </View>
                </View>
                <View>
                  <OutlinedButton
                    onPress={() => acceptOfferMutation.mutate([item.offerId, true])}
                    size="sm"
                    title={'함께하기'}
                    style={{ borderRadius: 5 }}
                  />
                  <OutlinedButton
                    size="sm"
                    title={'거절하기'}
                    style={{ borderRadius: 5, borderColor: theme.colors.disabled }}
                    titleStyle={{ color: theme.colors.disabled }}
                    onPress={() => rejectOfferMutation.mutate(item.offerId)}
                  />
                </View>
              </View>
            </CardWrapper>
          </TouchableOpacity>
        )}
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
