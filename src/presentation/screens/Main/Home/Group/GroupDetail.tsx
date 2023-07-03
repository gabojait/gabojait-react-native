import {postFavoriteTeam} from '@/api/favorite'
import {getTeam} from '@/api/team'
import BriefProfileDto from '@/model/Profile/BriefProfileDto'
import PositionCountDto from '@/model/Team/PostionCountDto'
import TeamDetailDto from '@/model/Team/TeamDetailDto'
import {Position} from '@/model/type/Position'
import {FilledButton} from '@/presentation/components/Button'
import CardWrapper from '@/presentation/components/CardWrapper'
import CustomHeader from '@/presentation/components/CustomHeader'
import PositionIcon from '@/presentation/components/PositionIcon'
import CustomIcon from '@/presentation/components/icon/Gabojait'
import {MainStackScreenProps} from '@/presentation/navigation/types'
import useGlobalStyles from '@/styles'
import {theme} from '@/theme'
import {makeStyles, Text} from '@rneui/themed'
import React from 'react'
import {ScrollView, TouchableOpacity, View} from 'react-native'
import {useMutation, useQueries, useQuery, UseQueryResult} from 'react-query'

interface PositionIconProp extends PositionCountDto {
  index: number
  currentMemberCnt: number
}

const GroupDetail = ({navigation, route}: MainStackScreenProps<'GroupDetail'>) => {
  const styles = useStyles()
  const globalStyles = useGlobalStyles()
  const {data, isLoading, error}: UseQueryResult<TeamDetailDto> = useQuery(
    ['GroupDetail', route.params.teamId],
    () => getTeam(route.params.teamId),
  )
  //TODO: 응답받고 200, 201에 따라 버튼 색 분기하기
  const {
    data: dataFavorite,
    isLoading: isLoadingFavorite,
    mutate: mutateFavorite,
    error: errorFavorite,
  } = useMutation({
    mutationKey: ['postFavorite'],
    mutationFn: (teamId: number) => postFavoriteTeam(teamId),
  })

  //TODO:포지션 아이콘 컴포넌트에 들어갈 데이터 전처리(일단 api 수정결과 보고 작업하기로)
  // const positions: Array<PositionIconProp> = mapToPositionIconProp(
  //   data?.teamMemberRecruitCnts || [],
  //   data?.teamMembers || [],
  // )
  // const initials = ['B', 'F', 'D', 'P']

  // function mapToPositionIconProp(
  //   recruitArray: Array<PositionCountDto>,
  //   memberArray: Array<BriefProfileDto>,
  // ) {
  // }

  function isFavorite() {
    if (data?.isFavorite) {
      return theme.lightColors?.primary
    }
    return 'black'
  }

  function handleFavoriteTeam() {
    mutateFavorite(route.params.teamId)
  }

  if (isLoading && !data) {
    return <Text>로딩 중</Text>
  }

  if (error) {
    return <Text>에러 발생</Text>
  }

  if (!data) {
    return null
  }

  //TODO: BookMarkHeader로 묶어서 팀원찾기/프로필미리보기 에서 사용하기
  return (
    <>
      <CustomHeader
        title={''}
        canGoBack={true}
        rightChildren={
          <TouchableOpacity onPress={handleFavoriteTeam}>
            <CustomIcon name="heart" size={30} color={isFavorite()} />
          </TouchableOpacity>
        }
      />
      <ScrollView style={styles.scrollView}>
        <CardWrapper style={[styles.card, {minHeight: 243}]}>
          <View
            style={{
              width: '100%',
              paddingHorizontal: 10,
              flex: 1,
              justifyContent: 'space-between',
            }}>
            <Text style={styles.teamname}>{data?.projectName}</Text>
            <View style={styles.partIcon}>
              {/* {positions.map((item, index) => (
              <PositionIcon
                currentApplicant={0}
                recruitNumber={item.totalRecruitCnt}
                textView={<Text style={globalStyles.itnitialText}>{initials[index]}</Text>}
              />
            ))} */}
            </View>
            <FilledButton
              title={'함께 하기'}
              onPress={() => navigation.navigate('PositionSelector', {teamId: data?.teamId ?? ''})}
            />
          </View>
        </CardWrapper>
        <View style={[styles.card, globalStyles.FlexStartCardWrapper, {minHeight: 243}]}>
          <View>
            <Text style={styles.title}>프로젝트 설명</Text>
            <Text style={styles.text}>{data?.projectDescription}</Text>
          </View>
        </View>
        <View style={[styles.card, globalStyles.FlexStartCardWrapper, {minHeight: 243}]}>
          <View>
            <Text style={styles.title}>바라는 점</Text>
            <Text style={styles.text}>{data?.expectation}</Text>
          </View>
        </View>
      </ScrollView>
    </>
  )
}

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
  text: {
    fontSize: 11,
    fontWeight: theme.fontWeight.light,
    color: theme.colors.black,
    lineHeight: 22,
  },
  partIcon: {
    paddingTop: 30,
    paddingBottom: 25,
    flexDirection: 'row',
  },
}))
export default GroupDetail
