import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import CustomHeader from '../CustomHeader'
import Header from '../GroupList/Header'
import Detail from './Detail'
import List from './List'

const TeamScreen = () => {
  const TeamStack = createStackNavigator()
  return (
    <TeamStack.Navigator initialRouteName="List">
      <TeamStack.Screen name="List" component={List} options={{
        header: Header,
        headerTitle: ""
      }} />
      <TeamStack.Screen name="Detail" component={Detail} />
    </TeamStack.Navigator>
  )
}

export default TeamScreen
