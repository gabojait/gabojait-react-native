import {getTeam} from '@/api/team'
import TeamDetailDto from '@/model/Team/TeamDetailDto'
import {FilledButton} from '@/presentation/components/Button'
import CardWrapper from '@/presentation/components/CardWrapper'
import PositionIcon from '@/presentation/components/PositionIcon'
import {MainStackScreenProps} from '@/presentation/navigation/types'
import useGlobalStyles from '@/styles'
import {makeStyles, Text} from '@rneui/themed'
import React from 'react'
import {ScrollView, View} from 'react-native'
import {useQuery, UseQueryResult} from 'react-query'

const GroupDetail = ({navigation, route}: MainStackScreenProps<'GroupDetail'>) => {
  const styles = useStyles()
  const globalStyles = useGlobalStyles()
  const {data, isLoading, error}: UseQueryResult<TeamDetailDto> = useQuery(['data'], () =>
    getTeam(route.params.teamId),
  )

  const positions = [
    [data?.backendTotalRecruitCnt, data?.backends?.length ?? 0],
    [data?.frontendTotalRecruitCnt, data?.frontends?.length ?? 0],
    [data?.designerTotalRecruitCnt, data?.designers?.length ?? 0],
    [data?.managerTotalRecruitCnt, data?.managers?.length ?? 0],
  ]
  const initials = ['B', 'F', 'D', 'P']

  if (isLoading && !data) {
    return <Text>로딩 중</Text>
  }

  if (error) {
    return <Text>에러 발생</Text>
  }

  if (!data) {
    return null
  }

  return (
    <ScrollView style={styles.scrollView}>
      <CardWrapper style={[styles.card, {minHeight: 243}]}>
        <View
          style={{width: '100%', paddingHorizontal: 10, flex: 1, justifyContent: 'space-between'}}>
          <Text style={styles.teamname}>{data?.projectName}</Text>
          <View style={styles.partIcon}>
            {positions.map((item, index) =>
              item[0] != undefined && item[0] > 0 ? (
                <PositionIcon
                  currentApplicant={item[1] ?? 0}
                  recruitNumber={item[0]}
                  textView={<Text style={globalStyles.itnitialText}>{initials[index]}</Text>}
                />
              ) : (
                <></>
              ),
            )}
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
