import { getTeamsToReview } from '@/data/api/review';
import TeamDto from '@/data/model/Team/TeamDto';
import Error404Boundary from '@/presentation/components/errorComponent/Error404Boundary';
import { MainStackScreenProps } from '@/presentation/navigation/types';
import { reviewKeys } from '@/reactQuery/key/ReviewKeys';
import { PageRequest } from '@/reactQuery/util/useModelList';
import React, { Suspense } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useQuery, useQueryErrorResetBoundary, UseQueryResult } from 'react-query';
import { Loading } from '../../Loading';
import { mapTeamDtoToPositionRecruiting } from '@/presentation/model/mapper/mapTeamDtoToPositionRecruiting';
import CardWrapper from '@/presentation/components/CardWrapper';
import { Position } from '@/data/model/type/Position';
import PositionWaveIcon from '@/presentation/components/PositionWaveIcon';
import { mapToInitial } from '@/presentation/utils/util';
import useGlobalStyles from '@/presentation/styles';
import { useTheme } from '@rneui/themed';

export default function TeamHistory({ navigation, route }: MainStackScreenProps<'TeamHistory'>) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <Suspense fallback={Loading()}>
      <Error404Boundary onReset={reset}>
        <TeamHistoryComponent navigation={navigation} route={route} />
      </Error404Boundary>
    </Suspense>
  );
}

function TeamHistoryComponent({ navigation, route }: MainStackScreenProps<'TeamHistory'>) {
  const QueryKey = {
    all: reviewKeys.reviewAvailableTeams,
    filtered: (filter: PageRequest) => [
      ...QueryKey.all,
      'filtered',
      { ...filter, pageFrom: undefined },
    ],
  };
  const {
    data: teamHistory,
    isLoading,
    error,
  }: UseQueryResult<{ data: TeamDto[]; total: number }> = useQuery(
    [reviewKeys.reviewAvailableTeams],
    () => getTeamsToReview(),
    {
      useErrorBoundary: true,
    },
  );
  const globalStyles = useGlobalStyles();
  const { theme } = useTheme();

  if (!teamHistory) {
    return null;
  }

  return (
    <>
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, _) => item?.projectName.concat(item.teamId)}
          data={
            teamHistory?.data?.map(item => {
              const teamCnts = mapTeamDtoToPositionRecruiting(item);
              return {
                ...item,
                teamMemberCnts: teamCnts,
              };
            }) || []
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('TeamReview', { teamId: item.teamId })}
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
                  {item.projectName}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  {item.teamMemberCnts
                    .filter(recruit => recruit.position != Position.None)
                    .map(item => (
                      <PositionWaveIcon
                        currentCnt={item.currentCnt}
                        recruitNumber={item.recruitCnt}
                        textView={
                          <Text style={globalStyles.itnitialText}>
                            {mapToInitial(item.position)}
                          </Text>
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
    </>
  );
}
