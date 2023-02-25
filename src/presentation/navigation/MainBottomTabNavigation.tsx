import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import React from 'react'
import Home from '@/presentation/navigation/HomeNavigation'
import MyPage from '@/presentation/screens/Main/MyPage/Main'
import Team from '../screens/Main/Team'
import {MainBottomTabParamList, RootStackParamList} from './types'
import CustomIcon from '@/presentation/components/icon/Gabojait'
import {useTheme} from '@rneui/themed'
import {CompositeNavigationProp, CompositeScreenProps} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'

export type MainBottomTabNavigationProp<T extends keyof MainBottomTabParamList = 'Home'> =
  BottomTabNavigationProp<MainBottomTabParamList, T>



const MainBottomTab = createBottomTabNavigator<MainBottomTabParamList>()

// 바텀네비게이션
const MainBottomTabNavigation = () => {
  const {theme} = useTheme()
  return (
    <MainBottomTab.Navigator
      backBehavior="none"
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.black,
        tabBarLabelStyle: {fontSize: 13, fontWeight: theme.fontWeight.semibold, paddingTop: 10},
        tabBarStyle: {minHeight: 60, paddingVertical: 10},
      }}>
      <MainBottomTab.Group screenOptions={{headerShown: false}}>
        <MainBottomTab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({size, color}) => <CustomIcon name="home" size={size} color={color} />,
          }}
        />
        <MainBottomTab.Screen
          name="Team"
          component={Team}
          options={{
            tabBarIcon: ({size, color}) => <CustomIcon name="people" size={size} color={color} />,
          }}
        />
        <MainBottomTab.Screen
          name="MyPage"
          component={MyPage}
          options={{
            tabBarIcon: ({size, color}) => <CustomIcon name="person" size={size} color={color} />,
          }}
        />
      </MainBottomTab.Group>
    </MainBottomTab.Navigator>
  )
}

export default MainBottomTabNavigation
