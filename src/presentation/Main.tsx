import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {NavigationContainer} from '@react-navigation/native'
import {Text} from '@rneui/base'
import React from 'react'
import {View} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Home from './Home'
import MyPage from './MyPage'
import Team from './components/Team'

const Main = () => {
  const MainBottomTab = createBottomTabNavigator()
  return (
    <MainBottomTab.Navigator initialRouteName="Home">
      <MainBottomTab.Group screenOptions={{headerShown: false}}>
        <MainBottomTab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({size, color}) => <Icon name="home" size={size} color={color} />,
          }}
        />
        <MainBottomTab.Screen
          name="Team"
          component={Team}
          options={{
            tabBarIcon: ({size, color}) => <Icon name="music" size={size} color={color} />,
          }}
        />
        <MainBottomTab.Screen
          name="MyPage"
          component={MyPage}
          options={{
            tabBarIcon: ({size, color}) => <Icon name="user" size={size} color={color} />,
          }}
        />
      </MainBottomTab.Group>
    </MainBottomTab.Navigator>
  )
}

export default Main
