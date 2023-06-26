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
import { isLeader } from '@/util'
import { MainBottomTabNavigationProps} from '@/presentation/navigation/types'

interface LeaderHeaderParams {
  onPressEditor: () => void
}

interface LeaderFooterParams {
  onPressComplete: () => void
  onPressDelete: () => void
}

const NoProcessingTeam = () => (
  <View style={{
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    }}>
      <Text style={{fontSize: 100, alignContent:'center'}}>
        🫥
      </Text>
      <Text h4>현재 진행 중인 팀이 없어요</Text>
  </View>
)

const LeaderHeader = ({onPressEditor}:LeaderHeaderParams) => {
  const styles = useStyles()
  const {theme} = useTheme()
  return (
    <View style={styles.header}>
      <Text style={{fontSize:theme.fontSize.lg, fontWeight:theme.fontWeight.bold, textAlignVertical:'center'}}>팀페이지</Text>
      <TouchableOpacity onPress={()=>onPressEditor()} style={{justifyContent:'center'}}>
        <Text style={{fontSize:20, color:theme.colors.primary}}>수정</Text>
      </TouchableOpacity>
    </View>
  )
}

const TeamMateHeader = () => {
  const styles = useStyles()
  const {theme} = useTheme()
  return (
    <View style={styles.header}>
      <Text style={{fontSize:theme.fontSize.lg, fontWeight:theme.fontWeight.bold}}>팀페이지</Text>
    </View>
  )
}

const LeaderFooter = ({onPressComplete, onPressDelete}:LeaderFooterParams) => {
  const {theme} = useTheme()
  return (
    <View style={{paddingBottom:30}}>
      <OutlinedButton onPress={()=>onPressComplete()}title={'종료하기'} size={'md'}/>
      <TouchableOpacity onPress={()=>onPressDelete()} style={{justifyContent:'center', alignContent:'center', flex:1}}>
        <Text style={{fontSize:theme.fontSize.md, fontWeight:theme.fontWeight.bold, color:theme.colors.disabled, paddingTop:20, textAlign:'center'}}>해산하기</Text>
      </TouchableOpacity>
    </View>
  )
}

export const TeamPage = ({navigation}:MainBottomTabNavigationProps<'Team'>) => {
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
    [teamDetailData?.backendTotalRecruitCnt, teamDetailData?.backends?.length ?? 0],
    [teamDetailData?.frontendTotalRecruitCnt, teamDetailData?.frontends?.length ?? 0],
    [teamDetailData?.designerTotalRecruitCnt, teamDetailData?.designers?.length ?? 0],
    [teamDetailData?.managerTotalRecruitCnt, teamDetailData?.managers?.length ?? 0],
  ]
  const initials = ['B', 'F', 'D', 'P']
  
  useEffect(() => {
    dispatch(getProfile())
  },[])

  return (
    <>
      {isLeader(profileData?.teamMemberStatus)
      ?<LeaderHeader onPressEditor={() => navigation.navigate('MainNavigation',{screen:'TeamEditor'})}/>
      :<TeamMateHeader/>
      }
      {profileData?.currentTeamId == null? <NoProcessingTeam/>
      :<View style={styles.scrollView}>
        <ScrollView style={{paddingTop:10, backgroundColor: theme.colors.white}}>      
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
          <TouchableOpacity>
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
          {isLeader(profileData.teamMemberStatus)
          ? <LeaderFooter 
              onPressComplete={() => {navigation.navigate('MainNavigation', {screen:'TeamComplete'})}}
              onPressDelete={() => {}}
            />
          :<></>
          }
        </ScrollView>
      </View>
      }   
    </>
  )
}

const useStyles = makeStyles((theme)=> ({
  scrollView:{
    backgroundColor: theme.colors.white,
    flex:1,
    paddingHorizontal:20,
  },
  teamcard:{
    paddingHorizontal:13,
    paddingBottom:17,
    marginVertical:5,
    borderRadius:20
  },
  card:{
    paddingHorizontal:13,
    paddingVertical:17,
    marginVertical:5,
    marginHorizontal: 4,
    borderRadius:20,
    alignItems:'flex-start'
  },
  header:{
    paddingHorizontal:20,
    paddingVertical:10,
    justifyContent:'space-between',
    alignContent:'center',
    flexDirection:'row', 
    minHeight:41, 
    borderBottomWidth:1, 
    borderBottomColor:theme.colors.disabled, 
    backgroundColor: 'white'
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
  },
}))