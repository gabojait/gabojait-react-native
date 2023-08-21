import Error404Boundary from '@/presentation/components/errorComponent/Error404Boundary';
import { MainStackScreenProps } from '@/presentation/navigation/types';
import { UseQueryResult, useQuery, useQueryErrorResetBoundary } from 'react-query';
import React, { Suspense, useEffect, useState } from 'react';
import { FilledButton } from '@/presentation/components/Button';
import CardWrapper from '@/presentation/components/CardWrapper';
import PositionWaveIcon from '@/presentation/components/PositionWaveIcon';
import styles from '@/presentation/styles';
import { mapToInitial } from '@/presentation/utils/util';
import { ScrollView, View, Text } from 'react-native';
import useGlobalStyles from '@/presentation/styles';
import { makeStyles, useTheme } from '@rneui/themed';
import { getTeam } from '@/data/api/team';
import TeamDetailDto from '@/data/model/Team/TeamDetailDto';
import { teamKeys } from '@/reactQuery/key/TeamKeys';
import PositionRecruiting from '@/presentation/model/PositionRecruitng';
import { Loading } from '@/presentation/screens/Loading';

const TeamDetail = ({ navigation, route }: MainStackScreenProps<'TeamDetail'>) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <Suspense fallback={Loading()}>
      <Error404Boundary onReset={reset}>
        <TeamDetailComponent navigation={navigation} route={route} />
      </Error404Boundary>
    </Suspense>
  );
};

const TeamDetailComponent = ({ navigation, route }: MainStackScreenProps<'TeamDetail'>) => {
  const globalStyles = useGlobalStyles();
  const { teamId } = route.params!;
  const styles = useStyles();
  const { data, isLoading, error }: UseQueryResult<TeamDetailDto> = useQuery(
    [teamKeys.getTeam, teamId],
    () => getTeam(teamId),
    {
      useErrorBoundary: true,
    },
  );
  const positions: Array<PositionRecruiting> = data?.teamMemberCnts || [];

  if (!data) {
    return null;
  }

  return (
    <>
      <ScrollView style={globalStyles.scrollView}>
        <CardWrapper style={[styles.card, { minHeight: 243 }]}>
          <View
            style={{
              width: '100%',
              paddingHorizontal: 10,
              flex: 1,
              justifyContent: 'space-between',
            }}
          >
            <Text style={styles.teamname}>{data?.projectName}</Text>
            <View style={styles.partIcon}>
              {positions.map((item, index) => (
                <PositionWaveIcon
                  currentCnt={item.currentCnt}
                  recruitNumber={item.recruitCnt}
                  textView={
                    <Text style={globalStyles.itnitialText}>{mapToInitial(item.position)}</Text>
                  }
                  key={item.position}
                />
              ))}
            </View>
            <FilledButton
              title={'함께 하기'}
              onPress={() =>
                navigation.navigate('JoinTeam', {
                  teamId: teamId,
                  targetPosition: route.params.targetPosition,
                  offerId: route.params.offerId,
                })
              }
            />
          </View>
        </CardWrapper>
        <View style={[styles.card, globalStyles.FlexStartCardWrapper, { minHeight: 243 }]}>
          <View>
            <Text style={styles.title}>프로젝트 설명</Text>
            <Text style={globalStyles.textLight13}>{data?.projectDescription}</Text>
          </View>
        </View>
        <View style={[styles.card, globalStyles.FlexStartCardWrapper, { minHeight: 243 }]}>
          <View>
            <Text style={styles.title}>바라는 점</Text>
            <Text style={globalStyles.textLight13}>{data?.expectation}</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const useStyles = makeStyles(theme => ({
  scrollView: {
    backgroundColor: theme.colors.white,
    paddingVertical: 18,
    flex: 1,
  },
  card: {
    paddingHorizontal: 13,
    paddingVertical: 17,
    marginVertical: 5,
    marginHorizontal: 20,
  },
  teamname: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    paddingLeft: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: theme.fontWeight.semibold,
    paddingBottom: 5,
    color: theme.colors.black,
  },
  partIcon: {
    paddingTop: 30,
    paddingBottom: 25,
    flexDirection: 'row',
  },
}));

export default TeamDetail;
