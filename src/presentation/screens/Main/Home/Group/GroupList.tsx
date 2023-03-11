import BottomSlideModalContent from '@/presentation/components/modalContent/BottomSlideModalContent'
import FloatingButton from '@/presentation/components/FloatingButton'
import {useTheme} from '@rneui/themed'
import React, { useEffect, useState} from 'react'
import {FlatList, Text, TouchableOpacity, View} from 'react-native'
import TeamBanner from '@/presentation/components/TeamBanner'
import { ModalContext } from '@/presentation/components/modal/context'
import { BoardStackParamListProps } from '@/presentation/navigation/types'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getTeam } from '@/redux/reducers/teamGetReducer'
import Team from '@/model/Team/Team'
import { useCookies } from 'react-cookie'
import { isDataAvailable, isInitializable } from '@/util'

const GroupList = ({navigation}:BoardStackParamListProps<'GroupList'>) => {

  const {theme} = useTheme() 
  const modal = React.useContext(ModalContext)
  const dispatch = useAppDispatch()
  const [teamGetState, setTeamGetState] = useState({pageFrom: 0, pageNum: 20})
  const {data,loading,error} = useAppSelector(state => state.teamGetReducer.teamGetResult)
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [contentData, setContentData] = useState<Team[]>()
  const COOKIE_KEY = 'profileMentionModal'               // 쿠키이름세팅 
  const [appCookies, setAppCookies] = useCookies() // 쿠키이름을 초기값으로 넣어 쿠키세팅
  const [hasCookie, setHasCookie] = useState(true)

  const getExpiredDate = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  };

  const closeModalUntilExpires = () => {
    if (!appCookies) return;
    const expires = getExpiredDate(1);
    setAppCookies("MODAL_EXPIRES", true, { path: "/", expires });
  };

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
              closeModalUntilExpires()
              navigation.navigate('MainNavigation', {screen:'Profile'})
            },
          }}
          noButton={{
            title: '닫기', 
            onPress: () => {
              modal.hide()
              closeModalUntilExpires()
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
              navigation.navigate('MainNavigation', {screen: 'Profile'})
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
    if(data != null && data.length >= teamGetState.pageNum){
      dispatch( getTeam(teamGetState.pageFrom, teamGetState.pageNum) )
      setTeamGetState( prevState => ({...prevState, pageFrom: teamGetState.pageFrom+1}))
    }
  }

  useEffect(() => {
    isDataAvailable(loading, data, contentData)
    ? setContentData([...contentData, ...data])
    :{}
  },[data, loading, error])

  useEffect(() => {
    console.log('useEffect 초기 렌더링 실행!')
    dispatch( getTeam(teamGetState.pageFrom, teamGetState.pageNum) )
    setTeamGetState( prevState => ({...prevState, pageFrom: teamGetState.pageFrom+1}))
    isInitializable(loading, data)? setContentData(data): {}

    if (!hasCookie) profileMentionModal()
    if (appCookies["MODAL_EXPIRES"]) return;
    console.log(`appCookies:${appCookies["MODAL_EXPIRES"]}`);
    setHasCookie(false);
  },[])

  return (
    <View style={{flex: 1, flexGrow:1, backgroundColor: 'white', justifyContent:'flex-end', position:'relative'}}>
      <FlatList
        keyExtractor={item => item.teamId}
        data={contentData}
        renderItem={({item}) => 
        <TouchableOpacity onPress={() => navigation.navigate('MainNavigation', {screen: 'GroupDetail', params: {teamId: item.teamId}})}>
          <TeamBanner
            team={item}
          />
        </TouchableOpacity>}
        onEndReached={()=>{
          requestMoreTeam()
        }}
        onEndReachedThreshold={1}
      />
      <View style={{position:'absolute',flex:1, flexDirection:'column-reverse',justifyContent:'flex-start', alignItems:'flex-end', width: '95%', backgroundColor:theme.colors.disabled}}>
        <FloatingButton title='팀 생성' onPress={() => navigation.navigate('MainNavigation', {screen: 'GroupEditor'})}/>
      </View>
    </View>
  )
}

export default GroupList
