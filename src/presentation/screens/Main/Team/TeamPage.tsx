import CardWrapper from '@/presentation/components/CardWrapper'
import {makeStyles, Text, useTheme} from '@rneui/themed'
import React, { useEffect} from 'react'
import {ScrollView, TouchableOpacity, View} from 'react-native'
import CustomIcon from '@/presentation/components/icon/Gabojait'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import PositionIcon from '@/presentation/components/PositionIcon'
import useGlobalStyles from '@/styles'
import { OutlinedButton } from '@/presentation/components/Button'
import { getProfile } from '@/redux/reducers/profileReducer'

const NoProcessingTeam = () => (
  <View style={{
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    }}>
      <Text h1 h1Style={{fontSize: 100, marginBottom: 20}}>
        🫥
      </Text>
      <Text h4>현재 진행 중인 팀이 없어요</Text>
  </View>
)

const LeaderHeader = () => {
  const {theme} = useTheme()
  return (
    <View style={{minHeight:41, borderBottomWidth:1, borderBottomColor:theme.colors.disabled}}>
      <Text style={{fontSize:theme.fontSize.lg, fontWeight:theme.fontWeight.bold, paddingStart:20}}>팀페이지</Text>
      <TouchableOpacity>
        <Text>수정</Text>
      </TouchableOpacity>
    </View>
  )
}

const TeamMateHeader = () => {
  const {theme} = useTheme()
  return (
    <View style={{minHeight:41, borderBottomWidth:1, borderBottomColor:theme.colors.disabled}}>
      <Text style={{fontSize:theme.fontSize.lg, fontWeight:theme.fontWeight.bold, paddingStart:20}}>팀페이지</Text>
    </View>
  )
}

const LeaderFooter = () => {
  return (
    <>
      <OutlinedButton title={'종료하기'} />
      <OutlinedButton title={'해산하기'}/>
    </>
  )
}

const Detail = () => {
  // network
  const {theme} = useTheme() 
  const globalStyles = useGlobalStyles()
  const styles = useStyles()
  const dispatch = useAppDispatch()
  const {data:profileData, loading:profileLoading, error:profileError} = useAppSelector(
    state => state.profileReducer.userProfile
  )
  const {data:teamDetailData, loading:teamDetailLoading, error:teamDetailError} = useAppSelector(
    state => state.teamDetailGetReducer.teamDetailGetResult
  )
  const positions = [
    [teamDetailData?.backendTotalRecruitCnt, teamDetailData?.backends.length],
    [teamDetailData?.frontendTotalRecruitCnt, teamDetailData?.frontends.length],
    [teamDetailData?.designerTotalRecruitCnt, teamDetailData?.designers.length],
    [teamDetailData?.projectManagerTotalRecruitCnt, teamDetailData?.projectManagers.length],
  ]
  const initials = ['B', 'F', 'D', 'P']
  
  useEffect(() => {
    dispatch(getProfile())
  },[])

  return (
    <ScrollView style={styles.scrollView}>
      <LeaderHeader/>
      <CardWrapper style={[styles.teamcard,{minHeight: 190, justifyContent: 'center'}]}>
        <View style={{width:'100%', paddingHorizontal:10, flex:1, justifyContent:'space-evenly'}}>
          <Text style={styles.teamname}>{teamDetailData?.projectName}</Text>
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
        </View>
      </CardWrapper>
      <TouchableOpacity onPress={()=>{}}>
        <CardWrapper style={[styles.card,{minHeight: 50, backgroundColor:'#FEE500', justifyContent:'center', alignContent:'center'}]}>
          <View style={{flexDirection:'row', justifyContent:'center', alignContent:'center'}}>
            <CustomIcon name='kakaotalk-logo' size={30} color={theme.colors.black}/>
            <Text style={{fontSize:theme.fontSize.md, fontWeight:theme.fontWeight.semibold}}>
              카카오톡 오픈채팅으로 시작하기
            </Text>
          </View>
        </CardWrapper>
      </TouchableOpacity>
      <CardWrapper style={[styles.card,{minHeight: 200}]}>
        <View>
        <Text style={styles.title}>프로젝트 설명</Text>
        <Text style={styles.text}>{teamDetailData?.projectDescription}</Text>
        </View>
      </CardWrapper>
      <CardWrapper style={[styles.card,{minHeight: 200}]}>
        <View>
        <Text style={styles.title}>바라는 점</Text>
        <Text style={styles.text}>
          {teamDetailData?.expectation}
        </Text>
        </View>
      </CardWrapper>
    </ScrollView>
  )
}

const useStyles = makeStyles((theme)=> ({
  scrollView:{
    backgroundColor: theme.colors.white,
    paddingVertical:18,
    flex:1,
  },
  teamcard:{
    paddingHorizontal:13,
    paddingBottom:17,
    marginVertical:5,
    marginHorizontal:20,
    borderRadius:20
  },
  card:{
    paddingHorizontal:13,
    paddingVertical:17,
    marginVertical:5,
    marginHorizontal:20,
    borderRadius:20
  },
  teamname:{
    fontSize:theme.fontSize.lg,
    fontWeight:theme.fontWeight.bold,
    paddingLeft:5
  },
  title: {
    fontSize:20,
    fontWeight:theme.fontWeight.semibold,
    paddingBottom: 5,
    color:theme.colors.black,
    textAlign:'left'
  },
  text: {
    fontSize:11,
    fontWeight:theme.fontWeight.light,
    color:theme.colors.black,
    lineHeight:22
  },
  partIcon:{
    flexDirection: 'row',
  }
}))

export default Detail
