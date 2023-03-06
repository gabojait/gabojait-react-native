import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import TeamPage from '@/presentation/screens/Main/Team/TeamPage'
import TitleHeader from '../../Headers/TitleHeader'

const TeamStack = createStackNavigator()

const TeamScreen = () => {
  return (
    <TeamStack.Navigator initialRouteName="List">
      <TeamStack.Group
        screenOptions={{
          header: TitleHeader,
          headerTitle: '팀페이지',
        }}>
        <TeamStack.Screen name="TeamPage" component={TeamPage} />
      </TeamStack.Group>
    </TeamStack.Navigator>
  )
}

export default TeamScreen
