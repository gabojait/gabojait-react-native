import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import CustomHeader from '../../../components/CustomHeader'
import Header from '../Home/GroupList/Header'
import Detail from './Detail'
import List from './List'

const TeamScreen = () => {
  const TeamStack = createStackNavigator()
  return (
    <TeamStack.Navigator initialRouteName="List">
      <TeamStack.Group
        screenOptions={{
          header: Header,
          headerTitle: '팀페이지',
        }}>
        <TeamStack.Screen name="Detail" component={Detail} />
      </TeamStack.Group>
    </TeamStack.Navigator>
  )
}

export default TeamScreen
