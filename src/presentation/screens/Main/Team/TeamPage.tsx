import CardWrapper from '@/presentation/components/CardWrapper';
import { makeStyles, Text, useTheme } from '@rneui/themed';
import React, { Suspense, useState } from 'react';
import { Platform, ScrollView, TouchableOpacity, View } from 'react-native';
import PositionWaveIcon from '@/presentation/components/PositionWaveIcon';
import { OutlinedButton } from '@/presentation/components/Button';
import { isLeader, mapToInitial } from '@/presentation/utils/util';
import { MainBottomTabNavigationProps } from '@/presentation/navigation/types';
import useGlobalStyles from '@/presentation/styles';
import { useQuery, useQueryClient, useQueryErrorResetBoundary, UseQueryResult } from 'react-query';
import TeamDto from '@/data/model/Team/TeamDto';
import { getMyTeam, incompleteTeam } from '@/data/api/team';
import { getMyProfile } from '@/data/api/profile';
import ProfileViewResponse from '@/data/model/Profile/ProfileViewResponse';
import { teamKeys } from '@/reactQuery/key/TeamKeys';
import { profileKeys } from '@/reactQuery/key/ProfileKeys';
import { useMutationDialog } from '@/reactQuery/util/useMutationDialog';
import Error404Boundary from '@/presentation/components/errorComponent/Error404Boundary';
import { Loading } from '../../Loading';

interface LeaderHeaderParams {
  onPressEditor: () => void;
}

interface LeaderFooterParams {
  onPressComplete: () => void;
  onPressDelete: () => void;
}

const LeaderHeader = ({ onPressEditor }: LeaderHeaderParams) => {
  const styles = useStyles();
  const { theme } = useTheme();
  return (
    <View style={styles.header}>
      <Text
        style={{
          fontSize: theme.fontSize.lg,
          fontWeight: theme.fontWeight.bold,
          textAlignVertical: 'center',
        }}
      >
        팀페이지
      </Text>
      <TouchableOpacity onPress={() => onPressEditor()} style={{ justifyContent: 'center' }}>
        <Text style={{ fontSize: 20, color: theme.colors.primary }}>수정</Text>
      </TouchableOpacity>
    </View>
  );
};

const TeamMateHeader = () => {
  const styles = useStyles();
  const { theme } = useTheme();
  return (
    <View style={styles.header}>
      <Text style={{ fontSize: theme.fontSize.lg, fontWeight: theme.fontWeight.bold }}>
        팀페이지
      </Text>
    </View>
  );
};

const LeaderFooter = ({ onPressComplete, onPressDelete }: LeaderFooterParams) => {
  const { theme } = useTheme();
  return (
    <View style={{ paddingBottom: 30 }}>
      <OutlinedButton onPress={() => onPressComplete()} title={'종료하기'} size={'md'} />
      <TouchableOpacity
        onPress={() => onPressDelete()}
        style={{ justifyContent: 'center', alignContent: 'center', flex: 1 }}
      >
        <Text
          style={{
            fontSize: theme.fontSize.md,
            fontWeight: theme.fontWeight.bold,
            color: theme.colors.disabled,
            paddingTop: 20,
            textAlign: 'center',
          }}
        >
          해산하기
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export const TeamPage = ({ navigation, route }: MainBottomTabNavigationProps<'Team'>) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <Suspense fallback={Loading()}>
      <Error404Boundary onReset={reset} message="현재 진행 중인 팀이 없어요">
        <TeamPageComponent navigation={navigation} route={route} />
      </Error404Boundary>
    </Suspense>
  );
};
export const TeamPageComponent = ({ navigation, route }: MainBottomTabNavigationProps<'Team'>) => {
  const { theme } = useTheme();
  const globalStyles = useGlobalStyles();
  const styles = useStyles();
  const queryClient = useQueryClient();
  const {
    data: teamData,
    isLoading: isTeamDataLoading,
    error: teamDataError,
  }: UseQueryResult<TeamDto> = useQuery(teamKeys.myTeam, () => getMyTeam(), {
    useErrorBoundary: true,
    retry: 1,
  });

  const {
    data: dataUser,
    isLoading: isLoadingData,
    error: errorData,
  }: UseQueryResult<ProfileViewResponse> = useQuery(profileKeys.myProfile, () => getMyProfile(), {
    useErrorBoundary: true,
    retry: 1,
  });

  const { mutation: deleteTeamMutation } = useMutationDialog(
    teamKeys.incompleteTeam,
    async () => incompleteTeam(),
    'CENTER',
    {
      onSuccessClick() {
        queryClient.invalidateQueries([teamKeys.myTeam, profileKeys.myProfile]);
      },
    },
  );

  return (
    <>
      {isLeader(dataUser?.isLeader) ? (
        <LeaderHeader
          onPressEditor={() => navigation.navigate('MainNavigation', { screen: 'TeamEditor' })}
        />
      ) : (
        <TeamMateHeader />
      )}
      <View style={styles.scrollView}>
        <ScrollView style={{ paddingTop: 10, backgroundColor: theme.colors.white }}>
          <CardWrapper
            style={[styles.card, { minHeight: 190, justifyContent: 'center', marginBottom: 16 }]}
          >
            <View
              style={{
                width: '100%',
                paddingHorizontal: 10,
                flex: 1,
                justifyContent: 'space-evenly',
              }}
            >
              <Text style={styles.teamname}>{teamData?.projectName}</Text>
              <View style={styles.partIcon}>
                {teamData?.teamMemberCnts.map(item => (
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
              {isLeader(dataUser?.isLeader) ? (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('MainNavigation', { screen: 'ManageTeammate' })
                  }
                >
                  <Text style={styles.text2}>팀원관리</Text>
                </TouchableOpacity>
              ) : (
                <></>
              )}
            </View>
          </CardWrapper>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MainNavigation', {
                screen: 'OpenChatingPage',
                params: { uri: teamData?.openChatUrl! },
              });
            }}
            style={[
              styles.kakaoCard,
              {
                flexDirection: 'row',
                justifyContent: 'center',
                alignContent: 'center',
                backgroundColor: '#FEE500',
                marginBottom: 16,
              },
            ]}
          >
            <Text
              style={{
                fontSize: theme.fontSize.md,
                fontWeight: theme.fontWeight.semibold,
                ...Platform.select({
                  ios: {
                    flex: 1,
                    alignSelf: 'center',
                    position: 'absolute',
                  },
                  android: { textAlignVertical: 'center' },
                }),
              }}
            >
              카카오톡 오픈채팅으로 시작하기
            </Text>
          </TouchableOpacity>
          <CardWrapper style={[globalStyles.card, { minHeight: 200, marginBottom: 16 }]}>
            <View>
              <Text style={styles.title}>프로젝트 설명</Text>
              <Text style={styles.text}>{teamData?.projectDescription}</Text>
            </View>
          </CardWrapper>
          <CardWrapper style={[globalStyles.card, { minHeight: 200, marginBottom: 16 }]}>
            <View>
              <Text style={styles.title}>바라는 점</Text>
              <Text style={styles.text}>{teamData?.expectation}</Text>
            </View>
          </CardWrapper>
          {isLeader(dataUser?.isLeader) ? (
            <LeaderFooter
              onPressComplete={() => {
                navigation.navigate('MainNavigation', { screen: 'TeamComplete' });
              }}
              onPressDelete={() => {
                deleteTeamMutation.mutate(undefined);
                console.log('워워');
              }}
            />
          ) : (
            <></>
          )}
        </ScrollView>
      </View>
    </>
  );
};

const useStyles = makeStyles(theme => ({
  scrollView: {
    backgroundColor: theme.colors.white,
    flex: 1,
    paddingHorizontal: 20,
  },
  teamcard: {
    paddingHorizontal: 13,
    paddingBottom: 17,
    marginVertical: 5,
    borderRadius: 20,
  },
  card: {
    paddingHorizontal: 13,
    paddingVertical: 17,
    marginVertical: 16,
    marginHorizontal: 4,
    borderRadius: 20,
    alignItems: 'flex-start',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignContent: 'center',
    flexDirection: 'row',
    minHeight: 41,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.disabled,
    backgroundColor: 'white',
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
    textAlign: 'left',
  },
  text: {
    fontSize: 11,
    fontWeight: theme.fontWeight.light,
    color: theme.colors.black,
    lineHeight: 22,
  },
  text2: {
    fontSize: 14,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.primary,
    borderBottomColor: theme.colors.primary,
    textAlign: 'center',
    textDecorationLine: 'underline',
    textDecorationColor: theme.colors.primary,
    textDecorationStyle: 'solid',
  },
  partIcon: {
    flexDirection: 'row',
    paddingVertical: 28,
  },
  kakaoCard: {
    borderRadius: 20,
    height: 50,
  },
}));
