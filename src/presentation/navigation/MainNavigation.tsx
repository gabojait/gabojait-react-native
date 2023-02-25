import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {MainStackParamList} from './types'
import Profile from '../screens/Main/MyPage/Profile'
import {CompositeNavigationProp} from '@react-navigation/native'
import {RootStackNavigationProps} from './RootNavigation'

const Main = createStackNavigator<MainStackParamList>()

const MainNavigation = () => {
  console.log('MainNavigation')
  return (
    <Main.Navigator>
      <Main.Screen name="Profile" component={Profile}></Main.Screen>
    </Main.Navigator>
  )
}

export default MainNavigation
