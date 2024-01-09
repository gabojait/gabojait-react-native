import { MainStackScreenProps } from '@/presentation/navigation/types';
import React, { Suspense, useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { getOffersSentToTeam } from '@/data/api/offer';
import { PageRequest, useModelList } from '@/reactQuery/util/useModelList';
import { offerKeys } from '@/reactQuery/key/OfferKeys';
import Error404Boundary from '@/presentation/components/errorComponent/Error404Boundary';
import { useQueryErrorResetBoundary } from 'react-query';
import { Loading } from '../../../Loading';
import { mapTeamDtoToPositionRecruiting } from '@/presentation/model/mapper/mapTeamDtoToPositionRecruiting';
import useGlobalStyles from '@/presentation/styles';
import CardWrapper from '@/presentation/components/CardWrapper';
import { useTheme } from '@rneui/themed';
import { mapToInitial } from '@/presentation/utils/util';
import { Position } from '@/data/model/type/Position';
import PositionWaveIcon from '@/presentation/components/PositionWaveIcon';

const OfferToTeamHistory = ({ navigation, route }: MainStackScreenProps<'OfferToTeamHistory'>) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <Suspense fallback={Loading()}>
      <Error404Boundary onReset={reset}>
        <OfferToTeamHistoryComponent navigation={navigation} route={route} />
      </Error404Boundary>
    </Suspense>
  );
};

const OfferToTeamHistoryComponent = ({
  navigation,
  route,
}: MainStackScreenProps<'OfferToTeamHistory'>) => {
  const QueryKey = {
    all: offerKeys.offersSentToTeam,
    filtered: (filter: PageRequest) => [
      ...QueryKey.all,
      'filtered',
      { ...filter, pageFrom: undefined },
    ],
  };
  const globalStyles = useGlobalStyles();
  const [params, setParams] = useState({ pageFrom: 1, pageSize: 20 } as PageRequest);
  const { data, isLoading, error, fetchNextPage, refetch, isRefreshing } = useModelList({
    initialParam: {
      pageFrom: 1,
      pageSize: 20,
    },
    idName: 'offerId',
    fetcher: ({ pageParam, queryKey }) => {
      return getOffersSentToTeam({
        ...(params as PageRequest),
        pageFrom: pageParam,
      });
    },
    key: QueryKey.filtered(params),
  });
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
      }}
    >
      <FlatList
        onRefresh={() => {
          refetch();
        }}
        refreshing={isRefreshing}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => item?.team.projectName.concat(item.offerId.toString())}
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
            onPress={() => navigation.navigate('GroupDetail', { teamId: item.team.teamId })}
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
      />
    </View>
  );
};

export default OfferToTeamHistory;
