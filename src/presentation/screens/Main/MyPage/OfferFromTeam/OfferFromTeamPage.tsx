import { MainStackScreenProps } from '@/presentation/navigation/types';
import React, { Suspense, useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { PageRequest, useModelList } from '@/reactQuery/util/useModelList';
import { getOffersFromTeam } from '@/data/api/offer';
import { Loading } from '@/presentation/screens/Loading';
import { mapTeamDtoToPositionRecruiting } from '@/presentation/model/mapper/mapTeamDtoToPositionRecruiting';
import CardWrapper from '@/presentation/components/CardWrapper';
import { Position } from '@/data/model/type/Position';
import PositionWaveIcon from '@/presentation/components/PositionWaveIcon';
import { mapToInitial } from '@/presentation/utils/util';
import useGlobalStyles from '@/presentation/styles';
import { useTheme } from '@rneui/themed';

const QueryKey = {
  all: ['GetOffers'],
  filtered: (filter: PageRequest) => [
    ...QueryKey.all,
    'filtered',
    { ...filter, pageFrom: undefined },
  ],
};

const OfferFromTeamPage = ({ navigation, route }: MainStackScreenProps<'OfferFromTeamPage'>) => {
  return (
    <Suspense fallback={Loading()}>
      <OfferFromTeamPageComponent navigation={navigation} route={route} />
    </Suspense>
  );
};

const OfferFromTeamPageComponent = ({ navigation }: MainStackScreenProps<'OfferFromTeamPage'>) => {
  const [params, setParams] = useState({ pageFrom: 1, pageSize: 20 } as PageRequest);
  const { data, isLoading, error, fetchNextPage, refetch, isRefreshing } = useModelList({
    initialParam: {
      pageFrom: 1,
      pageSize: 20,
    },
    idName: 'offerId',
    fetcher: ({ pageParam, queryKey }) => {
      console.log(pageParam, queryKey);
      return getOffersFromTeam({
        ...(params as PageRequest),
        pageFrom: pageParam,
      });
    },
    key: QueryKey.filtered(params),
  });
  const globalStyles = useGlobalStyles();
  const { theme } = useTheme();

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
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'flex-end',
        position: 'relative',
      }}
    >
      <FlatList
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.offerId.toString()}
        data={data?.pages
          ?.map(page =>
            page.data.map(item => {
              const teamCnts = mapTeamDtoToPositionRecruiting(item.team);
              return {
                ...item,
                teamMemberCnts: teamCnts,
              };
            }),
          )
          .flat()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('TeamDetail', {
                teamId: item.team.teamId,
                targetPosition: item.position,
                offerId: item.offerId,
              })
            }
          >
            <CardWrapper style={[globalStyles.cardWrapper, { maxHeight: 200, minHeight: 150 }]}>
              <Text
                style={{
                  justifyContent: 'flex-start',
                  fontWeight: theme.fontWeight.bold,
                  fontSize: theme.fontSize.md,
                  paddingBottom: 30,
                  paddingStart: 10,
                  width: '100%',
                }}
              >
                {item.team.projectName}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                {item.teamMemberCnts
                  .filter(recruit => recruit.position != Position.None)
                  .map(item => (
                    <PositionWaveIcon
                      currentCnt={item.currentCnt}
                      recruitNumber={item.recruitCnt}
                      textView={
                        <Text style={globalStyles.itnitialText}>{mapToInitial(item.position)}</Text>
                      }
                      key={item.position}
                      radious={theme.positionIconRadious.md}
                    />
                  ))}
              </View>
            </CardWrapper>
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
export default OfferFromTeamPage;
