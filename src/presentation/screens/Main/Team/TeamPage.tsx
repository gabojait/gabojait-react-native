import CardWrapper from '@/presentation/components/CardWrapper'
import {makeStyles, Text, useTheme} from '@rneui/themed'
import React from 'react'
import {Platform, ScrollView, TouchableOpacity, View} from 'react-native'
import CustomIcon from '@/presentation/components/icon/Gabojait'
import PositionIcon from '@/presentation/components/PositionWaveIcon'
import {OutlinedButton} from '@/presentation/components/Button'
import {isLeader, mapToInitial} from '@/presentation/util'
import {MainBottomTabNavigationProps} from '@/presentation/navigation/types'
import useGlobalStyles from '@/presentation/styles'
import {useQuery, UseQueryResult} from 'react-query'
import TeamDto from '@/data/model/Team/TeamDto'
import {getMyTeam} from '@/data/api/team'

interface LeaderHeaderParams {
  onPressEditor: () => void
}

interface LeaderFooterParams {
  onPressComplete: () => void
  onPressDelete: () => void
}

//TODO: 에러처리 결과 404로 보여줘야 됨
const NoProcessingTeam = () => (
  <View
    style={{
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    }}>
    <Text style={{fontSize: 100, alignContent: 'center'}}>🫥</Text>
    <Text h4>현재 진행 중인 팀이 없어요</Text>
  </View>
)

const LeaderHeader = ({onPressEditor}: LeaderHeaderParams) => {
  const styles = useStyles()
  const {theme} = useTheme()
  return (
    <View style={styles.header}>
      <Text
        style={{
          fontSize: theme.fontSize.lg,
          fontWeight: theme.fontWeight.bold,
          textAlignVertical: 'center',
        }}>
        팀페이지
      </Text>
      <TouchableOpacity onPress={() => onPressEditor()} style={{justifyContent: 'center'}}>
        <Text style={{fontSize: 20, color: theme.colors.primary}}>수정</Text>
      </TouchableOpacity>
    </View>
  )
}

const TeamMateHeader = () => {
  const styles = useStyles()
  const {theme} = useTheme()
  return (
    <View style={styles.header}>
      <Text style={{fontSize: theme.fontSize.lg, fontWeight: theme.fontWeight.bold}}>팀페이지</Text>
    </View>
  )
}

const LeaderFooter = ({onPressComplete, onPressDelete}: LeaderFooterParams) => {
  const {theme} = useTheme()
  return (
    <View style={{paddingBottom: 30}}>
      <OutlinedButton onPress={() => onPressComplete()} title={'종료하기'} size={'md'} />
      <TouchableOpacity
        onPress={() => onPressDelete()}
        style={{justifyContent: 'center', alignContent: 'center', flex: 1}}>
        <Text
          style={{
            fontSize: theme.fontSize.md,
            fontWeight: theme.fontWeight.bold,
            color: theme.colors.disabled,
            paddingTop: 20,
            textAlign: 'center',
          }}>
          해산하기
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export const TeamPage = ({navigation}: MainBottomTabNavigationProps<'Team'>) => {
  const {theme} = useTheme()
  const globalStyles = useGlobalStyles()
  const styles = useStyles()
  const {
    data: teamData,
    isLoading: isTeamDataLoading,
    error: teamDataError,
  }: UseQueryResult<TeamDto> = useQuery(['TeamPage'], () => getMyTeam())
  //TODO: Profile 모델 커밋받으면 하기
  // const {data:dataUser, isLoading:isLoadingData, error:errorData}: UseQueryResult<> = useQuery(
  //   ['getMyProfile'],
  //   () => getProfile()
  // )

  return (
    <>
      {isLeader(false) ? (
        <LeaderHeader
          onPressEditor={() => navigation.navigate('MainNavigation', {screen: 'TeamEditor'})}
        />
      ) : (
        <TeamMateHeader />
      )}
      <View style={styles.scrollView}>
        <ScrollView style={{paddingTop: 10, backgroundColor: theme.colors.white}}>
          <CardWrapper
            style={[styles.card, {minHeight: 190, justifyContent: 'center', marginBottom: 16}]}>
            <View
              style={{
                width: '100%',
                paddingHorizontal: 10,
                flex: 1,
                justifyContent: 'space-evenly',
              }}>
              <Text style={styles.teamname}>{teamData?.projectName}</Text>
              <View style={styles.partIcon}>
                {teamData?.teamMemberCnts.map(item => (
                  <PositionIcon
                    currentCnt={item.currentCnt}
                    recruitNumber={item.recruitCnt}
                    textView={
                      <Text style={globalStyles.itnitialText}>{mapToInitial(item.position)}</Text>
                    }
                    key={item.position}
                  />
                ))}
              </View>
            </View>
          </CardWrapper>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MainNavigation', {
                screen: 'OpenChatingPage',
                params: {uri: 'https://open.kakao.com/o/s1rB9Okf'},
              })
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
            ]}>
            <Text
              style={{
                fontSize: theme.fontSize.md,
                fontWeight: theme.fontWeight.semibold,
                ...Platform.select({
                  ios: {
                    alignItems: 'center',
                  },
                  android: {textAlignVertical: 'center'},
                }),
              }}>
              카카오톡 오픈채팅으로 시작하기
            </Text>
          </TouchableOpacity>
          <CardWrapper style={[globalStyles.card, {minHeight: 200, marginBottom: 16}]}>
            <View>
              <Text style={styles.title}>프로젝트 설명</Text>
              <Text style={styles.text}>{teamData?.projectDescription}</Text>
            </View>
          </CardWrapper>
          <CardWrapper style={[globalStyles.card, {minHeight: 200, marginBottom: 16}]}>
            <View>
              <Text style={styles.title}>바라는 점</Text>
              <Text style={styles.text}>{teamData?.expectation}</Text>
            </View>
          </CardWrapper>
          {/* {isLeader(profileData.teamMemberStatus) ? (
              <LeaderFooter
                onPressComplete={() => {
                  navigation.navigate('MainNavigation', {screen: 'TeamComplete'})
                }}
                onPressDelete={() => {}}
              />
            ) : (
              <></>
            )} */}
        </ScrollView>
      </View>
    </>
  )
}

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
  partIcon: {
    flexDirection: 'row',
  },
  kakaoCard: {
    borderRadius: 20,
    height: 50,
  },
}))
