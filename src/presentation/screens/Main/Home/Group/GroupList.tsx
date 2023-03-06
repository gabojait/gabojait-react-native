import BottomSlideModalContent from '@/presentation/components/modalContent/BottomSlideModalContent'
import FloatingButton from '@/presentation/components/FloatingButton'
import {useTheme} from '@rneui/themed'
import React, { useEffect, useState} from 'react'
import {FlatList, Text, TouchableOpacity, View} from 'react-native'
import GroupListCard from '../../../../components/TeamBanner'
import { ModalContext } from '@/presentation/components/modal/context'
import { BoardStackParamListProps } from '@/presentation/navigation/types'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getTeam } from '@/redux/reducers/teamGetReducer'
import Team from '@/model/Team/Team'

const GroupList = ({navigation}:BoardStackParamListProps<'GroupList'>) => {
  const test = [{"backendTotalRecruitCnt": 1, "backends": [], "designerTotalRecruitCnt": 2, "designers": [], "expectation": "예쁘면 좋겠다", "frontendTotalRecruitCnt": 1, "frontends": [], "leaderUserId": "64043ff1dcc38841d722826b", "openChatUrl": "https://open.kakao.com/o/test", "projectDescription": "제곧내", "projectManagerTotalRecruitCnt": 1, "projectManagers": [], "projectName": "애플워치 테마 앱", "teamId": "64044048dcc38841d722826c"}, 
  {"backendTotalRecruitCnt": 1, "backends": [], "designerTotalRecruitCnt": 1, "designers": [], "expectation": "끝말잇기 프로젝트에서 바라는 점입니다.", "frontendTotalRecruitCnt": 2, "frontends": [], "leaderUserId": "64043f5ddcc38841d7228269", "openChatUrl": "https://open.kakao.com/o/test", "projectDescription": "끝말잇기 프로젝트 설명입니다.", "projectManagerTotalRecruitCnt": 2, "projectManagers": [], "projectName": "끝말잇기 앱", "teamId": "64043fd5dcc38841d722826a"},
  {"backendTotalRecruitCnt": 1, "backends": [], "designerTotalRecruitCnt": 1, "designers": [], "expectation": "연락 잘 되는사람이면 좋습니다", "frontendTotalRecruitCnt": 1, "frontends": [], "leaderUserId": "640412f5dcc38841d7228267", "openChatUrl": "https://open.kakao.com/o/test", "projectDescription": "재밌을 거 같아서 해봅니다", "projectManagerTotalRecruitCnt": 0, "projectManagers": [], "projectName": "드론택시 예약시스템", "teamId": "64041fa4dcc38841d7228268"}]
  const {theme} = useTheme() 
  const modal = React.useContext(ModalContext)
  const dispatch = useAppDispatch()
  const [teamGetState, setTeamGetState] = useState({pageFrom: 0, pageNum: 20})
  const {data,loading,error} = useAppSelector(state => state.teamGetReducer.teamGetResult)
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [contentData, setContentData] = useState<Team[]>(data)

  const profileMentionModal = () => {
    modal?.show({
      title:'',
      content: (
        <BottomSlideModalContent
          title='프로필을 입력하시겠어요?'
          yesButton={{
            title: '입력하기', 
            onPress: () => {
              modal.hide() 
              navigation.navigate('MainNavigation', {screen:'Profile'})
              console.log('touch, yes')
            },
          }}
          noButton={{
            title: '닫기', 
            onPress: () => {
              modal.hide()
              console.log('touch, yes')
            }
          }}
        >
          <View>
            <Text style={{textAlign:'center'}}>프로필을 작성하면</Text>
            <Text style={{textAlign:'center'}}>바로 팀매칭을</Text>
            <Text style={{textAlign:'center'}}>시작할 수 있습니다!</Text>
          </View>
        </BottomSlideModalContent>
      )
    })
  }
  const changeTeamFindingModeModal = () => {
    modal?.show({
      title:'',
      content: (
        <BottomSlideModalContent
          title='팀 찾기 모드로 변경하시겠어요?'
          yesButton={{
            title: '변경하기', 
            onPress: () => {
              modal.hide() 
              navigation.navigate('MainNavigation', {screen:'Profile'})
              console.log('touch, yes')
            },
          }}
          noButton={{
            title: '나중에 하기', 
            onPress: () => {
              modal.hide()
              console.log('touch, yes')
            }
          }}
        >
          <View>
            <Text style={{textAlign:'center'}}>팀 찾기 모드로 변경하면</Text>
            <Text style={{textAlign:'center'}}>원하는 팀을 찾아서 함께할 수 있습니다!</Text>
          </View>
        </BottomSlideModalContent>
      )
    })
  }

  const requestMoreTeam = () => {
    dispatch( getTeam(teamGetState.pageFrom, teamGetState.pageNum) )
    setTeamGetState( prevState => ({...prevState, pageFrom: teamGetState.pageFrom+1}))
    if(!loading){
      setContentData([...data, contentData])
    }
    setIsRefreshing(false)
  }

  useEffect(() => {
    console.log('useEffect 초기 렌더링 실행!')
    dispatch( getTeam(teamGetState.pageFrom, teamGetState.pageNum) )
    if(!loading){
      setContentData([...data])
    }
  },[])

  return (
    <View style={{flex: 1, flexGrow:1, backgroundColor: 'white', justifyContent:'flex-end', position:'relative'}}>
      <FlatList
        keyExtractor={item => item.teamId}
        data={contentData}
        renderItem={({item}) => 
        <TouchableOpacity onPress={() => navigation.navigate('MainNavigation', {screen: 'GroupDetail', params: {teamId: item.teamId}})}>
          <GroupListCard
            team={item}
          />
        </TouchableOpacity>}
        onEndReached={()=>{
          requestMoreTeam()
        }}
        onEndReachedThreshold={0.8}
        refreshing = {isRefreshing}
        onRefresh = {requestMoreTeam}
      />
      <View style={{position:'absolute',flex:1, flexDirection:'column-reverse',justifyContent:'flex-start', alignItems:'flex-end', width: '95%', backgroundColor:theme.colors.disabled}}>
        <FloatingButton title='팀 생성' onPress={() => navigation.navigate('MainNavigation', {screen: 'GroupEditor'})}/>
      </View>
    </View>
  )
}

export default GroupList
