import {CompositeNavigationProp, NavigationContainer} from '@react-navigation/native'
import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import Detail from './Detail'
import Editor from './Editor'
import HomeHeader from '@/presentation/screens/Headers/HomeHeader'
import List from './List'
import PositionSelector from './PositionSelector'
import { GroupStackParamList } from '@/presentation/navigation/types'
import { BoardStackNavigationProps } from '@/presentation/navigation/HomeNavigation'

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
      <GroupStack.Screen name="Detail" component={Detail} />
      <GroupStack.Screen name="PositionSelector" component={PositionSelector} />
      <GroupStack.Screen name="Editor" component={Editor} />
    </GroupStack.Navigator>
  )
}

export default Group
