import { BoardStackParamList } from '@/presentation/navigation/types'
import { CompositeNavigationProp, NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import HomeHeader from '../screens/Headers/HomeHeader'
import GroupList from '../screens/Main/Home/Group/GroupList'
import TeamMate from '../screens/Main/Home/TeamMate'
import { RootStackNavigationProps } from './RootNavigation'
type BoardNavigationProp<
T extends keyof BoardStackParamList = 'GroupList'
> = StackNavigationProp<BoardStackParamList, T>

export type BoardStackNavigationProps<
  T extends keyof BoardStackParamList = 'GroupList'
> = CompositeNavigationProp< BoardNavigationProp<T>, RootStackNavigationProps<'MainNavigation'>>

const BoardStack = createStackNavigator<BoardStackParamList>()

const Home = () => {
  return (
    <BoardStack.Navigator initialRouteName='GroupList'>
        <BoardStack.Screen name='GroupList' component={GroupList}
        options={{
          header: HomeHeader,
          headerTitle: "팀구하기"
        }}/>
        <BoardStack.Screen name='TeamMate' component={TeamMate}
          options={{
            headerShown:false
          }}
        />
    </BoardStack.Navigator>
  )
}

export default Home