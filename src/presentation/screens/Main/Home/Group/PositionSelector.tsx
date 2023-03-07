import { FilledButton } from '@/presentation/components/Button'
import CardWrapper from '@/presentation/components/CardWrapper'
import PositionIcon from '@/presentation/components/PositionIcon'
import { makeStyles, Text, useTheme } from '@rneui/themed'
import React, { useEffect } from 'react'
import { ScrollView, View } from 'react-native'
import { MainStackScreenProps } from '@/presentation/navigation/types'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getTeamDetail } from '@/redux/reducers/teamDetailGetReducer'
import { ModalContext } from '@/presentation/components/modal/context'
import SymbolModalContent from '@/presentation/components/modalContent/SymbolModalContent'
import { applyToTeam } from '@/redux/reducers/applyToTeamReducer'

const PositionSelector = ({navigation, route}:MainStackScreenProps<'PositionSelector'>) => {
  const {theme} = useTheme()
  const styles = useStyles()
  const dispatch = useAppDispatch()
  const { data:teamDetailGetResult, loading:teamDetailGetLoading, error:teamDetailGetError } = useAppSelector(state => state.teamDetailGetReducer.teamDetailGetResult)
  const { data:applyToTeamResult, loading:applyToTeamLoading, error:applyToTeamError } = useAppSelector(state => state.applyToTeamReducer.applyToTeamResult)
  const positions = [
    [teamDetailGetResult?.backendTotalRecruitCnt, teamDetailGetResult?.backends.length]
    ,[teamDetailGetResult?.frontendTotalRecruitCnt, teamDetailGetResult?.frontends.length]
    ,[teamDetailGetResult?.designerTotalRecruitCnt, teamDetailGetResult?.designers.length]
    ,[teamDetailGetResult?.projectManagerTotalRecruitCnt, teamDetailGetResult?.projectManagers.length]
  ]
  const positionName = ['벡엔드 개발자', '프론트엔드 개발자', 'UI/UX 디자이너', '프로덕트 매니저']
  const modal = React.useContext(ModalContext)

  const isRecruitDone = (positionTotalRecruitCnt:number, positionApplicantCnt:number) => {
    if (positionTotalRecruitCnt == positionApplicantCnt) return true
    else return false
  }

  const applyCompletedModal = () => {
    modal?.show({
          title: '',
          content: (
            <SymbolModalContent
              title='지원 완료!'
              symbol={<Text style={{fontSize: theme.emojiSize.md, textAlign: 'center'}}>👏</Text>}
              text={'함께하기 요청이 전달되었습니다\n 결과를 기다려주세요'}
              yesButton={{title:'확인', onPress: () => modal.hide()}}
            />
          )
    })
  } 

  useEffect(() => {
    dispatch( getTeamDetail(route.params.teamId) )
  }, [])

  useEffect(() => {
    //팀 지원요청 성공 시
    if(applyToTeamResult && applyToTeamLoading == false && applyToTeamError == null){
      applyCompletedModal()
    }
  }, [applyToTeamResult, applyToTeamLoading, applyToTeamError])

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
              <FilledButton 
                title={isRecruitDone(item[0], item[1])?'모집완료':'함께하기'} 
                size="sm" disabled={isRecruitDone(item[0], item[1])?true:false}
                onPress={()=> dispatch( applyToTeam(positionName[index], route.params.teamId) )}
              />
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