import { FilledButton } from '@/presentation/components/Button'
import CardWrapper from '@/presentation/components/CardWrapper'
import { PartIcon } from '@/presentation/components/TeamBanner'
import PositionIcon from '@/presentation/components/PositionIcon'
import { StackScreenProps } from '@react-navigation/stack'
import { makeStyles, Text, useTheme } from '@rneui/themed'
import React, { useEffect } from 'react'
import { ScrollView, View } from 'react-native'
import { MainStackParamList, MainStackScreenProps } from '@/presentation/navigation/types'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getTeamDetail } from '@/redux/reducers/teamDetailGetReducer'
import Team from '@/model/Team/Team'

const PositionSelector = ({navigation, route}:MainStackScreenProps<'PositionSelector'>) => {
  const styles = useStyles()
  const dispatch = useAppDispatch()
  const { data, loading, error } = useAppSelector(state => state.teamDetailGetReducer.teamDetailGetResult)
  const positions = [
    [data?.backendTotalRecruitCnt, data?.backends.length]
    ,[data?.frontendTotalRecruitCnt, data?.frontends.length]
    ,[data?.designerTotalRecruitCnt, data?.designers.length]
    ,[data?.projectManagerTotalRecruitCnt, data?.projectManagers.length]
  ]
  const positionName = ['벡엔드 개발자', '프론트엔드 개발자', 'UI/UX 디자이너', '프로덕트 매니저']
  const recruitStatus = ['함께하기', '지원완료', '모집완료']

  useEffect(() => {
    dispatch( getTeamDetail(route.params.teamId) )
  }, [])

  const isRecruitDone = (positionTotalRecruitCnt:number, positionApplicantCnt:number) => {
    if (positionTotalRecruitCnt == positionApplicantCnt) return true
    else return false
  }

  return (
    <ScrollView style={styles.scrollView}>
      {positions.map( (item, index) => 
              item[0] != undefined && item[0] > 0
              ? <CardWrapper style={[styles.card]}>
                  <View style={styles.container}>
                    <View style={{alignItems:'center'}}>
                      <PositionIcon currentApplicant={item[1]} recruitNumber={item[0]} textView={<Text style={styles.posiionText}>{item[1]}/{item[0]}</Text>}/>
                      <Text style={styles.text}>{positionName[index]}</Text> 
                    </View>
                    <FilledButton title={isRecruitDone(item[0], item[1])?'모집완료':'함께하기'} size="sm" disabled={isRecruitDone(item[0], item[1])?true:false}/>
                  </View>
              </CardWrapper>
              : <></>
      )}
    </ScrollView>
  )
}

const useStyles = makeStyles((theme)=> ({
  scrollView:{
    backgroundColor: theme.colors.white,
    paddingVertical:18
  },
  card:{
    padding:30,
    marginVertical:5,
    marginHorizontal:20
  },
  container:{
    flexDirection:'row', 
    justifyContent:'space-between', 
    alignItems:'center', 
    width:'100%', 
    minHeight:100, 
  },
  text:{
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    paddingTop: 10,
  },
  posiionText:{
    fontSize: 20,
    fontWeight: theme.fontWeight.bold
  }
}))

export default PositionSelector