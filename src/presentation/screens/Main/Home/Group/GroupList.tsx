import BottomSlideModalContent from '@/presentation/components/modalContent/BottomSlideModalContent'
import FloatingButton from '@/presentation/components/FloatingButton'
import {useTheme} from '@rneui/themed'
import React, {useEffect, useState} from 'react'
import {FlatList, Text, TouchableOpacity, View} from 'react-native'
import TeamBanner from '@/presentation/components/TeamBanner'
import {ModalContext} from '@/presentation/components/modal/context'
import {BoardStackParamListProps} from '@/presentation/navigation/types'
import {useAppDispatch, useAppSelector} from '@/redux/hooks'
import {getTeam} from '@/redux/reducers/teamGetReducer'
import Team from '@/model/Team/Team'
import { isDataAvailable, isInitializable } from '@/util'
import { testTeamArray } from '@/testData'

const GroupList = ({navigation}: BoardStackParamListProps<'GroupList'>) => {
  const {theme} = useTheme()
  const modal = React.useContext(ModalContext)
  const dispatch = useAppDispatch()
  const [teamGetState, setTeamGetState] = useState({pageFrom: 0, pageSize: 4})
  const {data, loading, error} = useAppSelector(state => state.teamGetReducer.teamGetResult)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [contentData, setContentData] = useState<Team[]>()


  const requestMoreTeam = () => {
    if (data != null && data.length >= teamGetState.pageSize) {
      dispatch(getTeam(teamGetState.pageFrom, teamGetState.pageSize))
      setTeamGetState(prevState => ({...prevState, pageFrom: teamGetState.pageFrom + 1}))
    }

  }

  const refreshMoreTeam = () => {
    setContentData([])
    requestMoreTeam()
    setIsRefreshing(false)
  }

  useEffect(() => {
    // isDataAvailable(loading, data, contentData) ? setContentData([...contentData, ...data]) : {}
  }, [data, loading, error])

  useEffect(() => {
    console.log('useEffect 초기 렌더링 실행!')
    dispatch(getTeam(teamGetState.pageFrom, teamGetState.pageSize))
    setTeamGetState(prevState => ({...prevState, pageFrom: teamGetState.pageFrom + 1}))
    // isInitializable(loading, data) ? setContentData(data) : {}
  },[])

  if (){

  }
  return (
    <View
      style={{
        flex: 1,
        flexGrow: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        position: 'relative',
      }}>
      <FlatList
        keyExtractor={item => item.teamId}
        data={data}
        renderItem={({item}) => 
        <TouchableOpacity onPress={() => navigation.navigate('MainNavigation', {screen: 'GroupDetail', params: {teamId: item.teamId}})}>
          <TeamBanner
            team={item}
          />
        </TouchableOpacity>}
        refreshing={isRefreshing}
        onRefresh={refreshMoreTeam}
        onEndReached={() => {
          requestMoreTeam()
        }}
        onEndReachedThreshold={0.6}
      />
      <View
        style={{
          position: 'absolute',
          flex: 1,
          flexDirection: 'column-reverse',
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          width: '95%',
          backgroundColor: theme.colors.disabled,
        }}>
        <FloatingButton
          title="팀 생성"
          onPress={() => navigation.navigate('MainNavigation', {screen: 'GroupEditor'})}
        />
      </View>
    </View>
  )
}

export default GroupList
