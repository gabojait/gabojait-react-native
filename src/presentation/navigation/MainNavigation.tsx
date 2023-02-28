import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {MainStackParamList} from './types'
import Profile from '../screens/Main/MyPage/Profile'
import CloseHeader from '../screens/Headers/CloseHeader'
import BackHeader from '../screens/Headers/TitleWithCloseHeader'
import PositionSelector from '../screens/Main/Home/Group/PositionSelector'
import TitleHeader from '../screens/Headers/TitleHeader'
import GroupEditor from '../screens/Main/Home/Group/GroupEditor'
import GroupDetail from '../screens/Main/Home/Group/GroupDetail'
import ApplyStatus from '../screens/Main/MyPage/ApplyStatus'
import TeamHistory from '../screens/Main/MyPage/TeamHistory'
import TitleCenterHeader from '../components/TitleCenterHeader'
import TitleWithCloseHeader from '../screens/Headers/TitleWithCloseHeader'

const Main = createStackNavigator<MainStackParamList>()

const MainNavigation = () => {
  console.log('MainNavigation')
  return (
    <Main.Navigator initialRouteName='GroupDetail'>
      <Main.Screen name="Profile" options={{header: CloseHeader}} component={Profile}></Main.Screen>
      <Main.Screen name="ApplyStatus" component={ApplyStatus} options={{
        header: TitleWithCloseHeader,
        headerTitle: "지원현황"
      }}/>
      <Main.Screen name="TeamHistory" component={TeamHistory} options={{
        header: TitleWithCloseHeader,
        headerTitle: "팀 히스토리"
      }}/>
      <Main.Screen name="GroupDetail" component={GroupDetail} options={{
        header: BackHeader,
        headerTitle: ""
      }}/>
      <Main.Screen name="PositionSelector" component={PositionSelector} options={{
        header: TitleWithCloseHeader,
        headerTitle: "포지션 선택"
      }}/>
      <Main.Screen name="GroupEditor" component={GroupEditor} options={{
        header: TitleHeader,
        headerTitle: ""
      }}/>
    </Main.Navigator>
  )
}

export default MainNavigation
