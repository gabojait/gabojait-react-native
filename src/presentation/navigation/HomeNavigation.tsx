import { BoardStackParamList } from '@/presentation/navigation/types'
import { CompositeNavigationProp, NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import Group from '../screens/Main/Home/Group'
import Teamate from '../screens/Main/Home/Teamate'
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
    <BoardStack.Navigator initialRouteName='Teamate' screenOptions={{headerShown:false}}>
        <BoardStack.Screen name='Group' component={Group}/>
        <BoardStack.Screen name='Teamate' component={Teamate}/>
    </BoardStack.Navigator>
  )
}

export default Home