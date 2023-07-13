import {postFavoriteTeam} from '@/data/api/favorite'
import {getTeam} from '@/data/api/team'
import TeamDetailDto from '@/data/model/Team/TeamDetailDto'
import {FilledButton} from '@/presentation/components/Button'
import CardWrapper from '@/presentation/components/CardWrapper'
import CustomHeader from '@/presentation/components/CustomHeader'
import PositionIcon from '@/presentation/components/PositionWaveIcon'
import CustomIcon from '@/presentation/components/icon/Gabojait'
import PositionRecruiting from '@/presentation/model/PositionRecruitng'
import {MainStackScreenProps} from '@/presentation/navigation/types'
import {makeStyles, Text} from '@rneui/themed'
import React, {useState} from 'react'
import {ScrollView, TouchableOpacity, View} from 'react-native'
import {useMutation, useQuery, UseQueryResult} from 'react-query'
import useGlobalStyles from '@/presentation/styles'
import {theme} from '@/presentation/theme'
import {mapToInitial} from '@/presentation/utils/util'
import FavoriteUpdateDto from '@/data/model/Favorite/FavoriteUpdateDto'

const GroupDetail = ({navigation, route}: MainStackScreenProps<'GroupDetail'>) => {
  const styles = useStyles()
  const globalStyles = useGlobalStyles()
  const {data, isLoading, error}: UseQueryResult<TeamDetailDto> = useQuery(
    ['GroupDetail', route.params.teamId],
    () => getTeam(route.params.teamId),
  )
  const {mutate: mutateFavorite} = useMutation(
    'postFavorite',
    (args: [number, FavoriteUpdateDto]) => postFavoriteTeam(...args),
  )
  const [favoriteState, setFavoriteState] = useState<FavoriteUpdateDto>({
    isAddFavorite: data?.isFavorite || false,
  })
  const positions: Array<PositionRecruiting> = data?.teamMemberCnts || []

  function isFavorite() {
    if (data?.isFavorite) {
      return theme.lightColors?.primary
    }
    return 'black'
  }
  //TODO: 200,201 결과로 찜 아이콘 색 분기하기
  function handleFavoriteTeam() {
    if (data?.isFavorite) {
      mutateFavorite([route.params.teamId, {isAddFavorite: !favoriteState.isAddFavorite}])
    } else {
      mutateFavorite([route.params.teamId, {isAddFavorite: !favoriteState.isAddFavorite}])
    }
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
              {positions.map((item, index) => (
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
            <FilledButton
              title={'함께 하기'}
              onPress={() => navigation.navigate('PositionSelector', {teamId: route.params.teamId})}
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
