import { decideOfferFromUser, GetOfferFromOthersProps, getOffersFromUser } from '@/data/api/offer';
import { OutlinedButton } from '@/presentation/components/Button';
import CardWrapper from '@/presentation/components/CardWrapper';
import { RatingBar } from '@/presentation/components/RatingBar';
import { offerKeys } from '@/reactQuery/key/OfferKeys';
import { useModelList } from '@/reactQuery/util/useModelList';
import { useMutationDialog } from '@/reactQuery/util/useMutationDialog';
import { makeStyles, useTheme } from '@rneui/themed';
import React, { Suspense, useEffect } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { PositionTabParamList, PositionTabParamListProps } from '@/presentation/navigation/types';
import { Loading } from '@/presentation/screens/Loading';
import { mapToSeekingTeamKey } from '@/presentation/utils/util';
import { teamKeys } from '@/reactQuery/key/TeamKeys';
import { useQueryClient } from 'react-query';

const ApplyList = ({
  navigation,
  route,
}: PositionTabParamListProps<keyof PositionTabParamList>) => {
  return (
    <Suspense fallback={Loading()}>
      <ApplyListComponent navigation={navigation} route={route} />
    </Suspense>
  );
};

const ApplyListComponent = ({
  navigation,
  route,
}: PositionTabParamListProps<keyof PositionTabParamList>) => {
  const { theme } = useTheme();
  const styles = useStyles();
  const { data, isLoading, error, fetchNextPage, refetch, isRefreshing } = useModelList({
    initialParam: {
      pageFrom: 1,
      pageSize: 20,
      position: route.params.position,
    },
    idName: 'offerId',
    key: mapToSeekingTeamKey[route.params.position],
    fetcher: async ({ pageParam, queryKey: [_, params] }) => {
      return await getOffersFromUser({
        ...(params as GetOfferFromOthersProps),
        pageFrom: pageParam,
      });
    },
  });
  const queryClient = useQueryClient();

  const { mutation: decideOfferMutation } = useMutationDialog(
    [offerKeys.acceptOfferFromUser, teamKeys.myTeam],
    async (args: [number, boolean]) => decideOfferFromUser(...args),
    'CENTER',
    {
      onSuccessClick() {
        queryClient.invalidateQueries(teamKeys.myTeam);
      },
    },
  );

  useEffect(() => {
    console.log(route, navigation.getState().routes);
    if (route.params.position === route.name.toLowerCase()) {
      refetch();
    }
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
        onRefresh={() => {
          refetch();
        }}
        refreshing={isRefreshing}
        onEndReached={() => {
          fetchNextPage();
        }}
        onEndReachedThreshold={0.6}
        keyExtractor={item => item.user.nickname}
        data={data?.pages?.map(page => page.data).flat()}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.offerId}
            onPress={() =>
              navigation.getParent()?.navigate('ProfilePreview', { userId: item.user.userId })
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
                    onPress={() => decideOfferMutation.mutate([item.offerId, true])}
                    size="sm"
                    title={'함께하기'}
                    style={{ borderRadius: 5, paddingBottom: 10 }}
                  />
                  <OutlinedButton
                    size="sm"
                    title={'거절하기'}
                    style={{ borderRadius: 5, borderColor: theme.colors.disabled }}
                    titleStyle={{ color: theme.colors.disabled }}
                    onPress={() => decideOfferMutation.mutate([item.offerId, false])}
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

export default ApplyList;
