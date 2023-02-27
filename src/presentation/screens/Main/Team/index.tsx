import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import Detail from '@/presentation/screens/Main/Team/Detail'
import Header from '../../Headers/TitleHeader'

const TeamStack = createStackNavigator()

const TeamScreen = () => {
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
