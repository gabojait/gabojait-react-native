import {View} from 'react-native'
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import Header from '@/presentation/screens/Headers/TitleHeader'
import Main from '../screens/Main/MyPage/Main'
import Profile from '../screens/Main/MyPage/Profile'
import CloseHeader from '@/presentation/screens/Headers/CloseHeader'

const MyPageStack = createStackNavigator()
const MyPage = () => {
  return (
    <MyPageStack.Navigator initialRouteName="Profile">
      <MyPageStack.Group screenOptions={{headerShown: false}}>
        <MyPageStack.Screen name="Main" component={Main} />
        <MyPageStack.Screen name="Profile" component={Profile} />
      </MyPageStack.Group>
    </MyPageStack.Navigator>
  )
}
export default MyPage
