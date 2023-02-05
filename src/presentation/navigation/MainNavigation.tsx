import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {CompositeNavigationProp} from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import Home from '@/presentation/navigation/HomeNavigation'
import MyPage from '../screens/Main/MyPage/MyPage'
import Team from '../screens/Main/Team'
import { RootStackNavigationProps } from './RootNavigation'
import { MainStackParamList} from './types'
import CustomIcon from '@/presentation/components/icon/Gabojait'

type MainNavigationProp<
T extends keyof MainStackParamList = 'Home'
> = StackNavigationProp<MainStackParamList, T>

export type MainStackNavigationProps<
  T extends keyof MainStackParamList = 'Home'
> = CompositeNavigationProp< MainNavigationProp<T>, RootStackNavigationProps<'MainNavigation'>>

const MainBottomTab = createBottomTabNavigator()

// 바텀네비게이션
const MainNavigation = () => {

  return (
    <MainBottomTab.Navigator backBehavior='none'>
      <MainBottomTab.Group screenOptions={{headerShown: false}} >
        <MainBottomTab.Screen
          name="홈"
          component={Home}
          options={{
            tabBarIcon: ({size, color}) => <CustomIcon name="home" size={size} color={color} />,
          }}
        />
        <MainBottomTab.Screen
          name="팀페이지"
          component={Team}
          options={{
            tabBarIcon: ({size, color}) => <Icon name="music" size={size} color={color} />,
          }}
        />
        <MainBottomTab.Screen
          name="마이페이지"
          component={MyPage}
          options={{
            tabBarIcon: ({size, color}) => <Icon name="user" size={size} color={color} />,
          }}
        />
      </MainBottomTab.Group>
    </MainBottomTab.Navigator>
  )
}

export default MainNavigation
