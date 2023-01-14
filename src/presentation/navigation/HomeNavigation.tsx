import { BoardStackParamList } from '@/presentation/navigation/types'
import { CompositeNavigationProp, NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import Group from '../screens/Main/Home/Group'
import TeamMate from '../screens/Main/Home/TeamMate'
import { RootStackNavigationProps } from './RootNavigation'

type BoardNavigationProp<
T extends keyof BoardStackParamList = 'Group'
> = StackNavigationProp<BoardStackParamList, T>

export type BoardStackNavigationProps<
  T extends keyof BoardStackParamList = 'Group'
> = CompositeNavigationProp< BoardNavigationProp<T>, RootStackNavigationProps<'MainNavigation'>>

const BoardStack = createStackNavigator<BoardStackParamList>()

const Home = () => {
  return (
    <BoardStack.Navigator initialRouteName='Group' screenOptions={{headerShown:false}}>
        <BoardStack.Screen name='Group' component={Group}/>
        <BoardStack.Screen name='TeamMate' component={TeamMate}/>
    </BoardStack.Navigator>
  )
}

export default Home