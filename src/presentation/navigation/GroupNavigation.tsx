import {CompositeNavigationProp, NavigationContainer} from '@react-navigation/native'
import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import HomeHeader from '@/presentation/screens/Headers/HomeHeader'
import { GroupStackParamList } from '@/presentation/navigation/types'
import { BoardStackNavigationProps } from '@/presentation/navigation/HomeNavigation'
import { CardTitle } from '@rneui/base/dist/Card/Card.Title'
import TitleHeader from '@/presentation/screens/Headers/TitleHeader'
import List from '../screens/Main/Home/Group/List'
import Detail from '../screens/Main/Home/Group/Detail'
import PositionSelector from '../screens/Main/Home/Group/PositionSelector'
import Editor from '../screens/Main/Home/Group/Editor'
import BackHeader from '../screens/Headers/BackHeader'

type GroupNavigationProp<
T extends keyof GroupStackParamList = 'List'
> = StackNavigationProp<GroupStackParamList, T>

export type GroupNavigationProps<
  T extends keyof GroupStackParamList = 'List'
> = CompositeNavigationProp< GroupNavigationProp<T>, BoardStackNavigationProps<'Group'>>

const Group = () => {
  const GroupStack = createStackNavigator<GroupStackParamList>()
  return (
    <GroupStack.Navigator initialRouteName="List">
      <GroupStack.Screen name="List" component={List} options={{
        header: HomeHeader,
        headerTitle: "팀 구하기",
      }}/>
      <GroupStack.Screen name="Detail" component={Detail} options={{
        header: BackHeader,
        headerTitle: ""
      }}/>
      <GroupStack.Screen name="PositionSelector" component={PositionSelector} options={{
        header: BackHeader,
        headerTitle: "포지션 선택"
      }}/>
      <GroupStack.Screen name="Editor" component={Editor} options={{
        header: TitleHeader,
        headerTitle: ""
      }}/>
    </GroupStack.Navigator>
  )
}

export default Group