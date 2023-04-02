import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import TeamPage from '@/presentation/screens/Main/Team/TeamPage'

const TeamStack = createStackNavigator()

const TeamScreen = () => {
  return (
    <TeamStack.Navigator initialRouteName="List">
      <TeamStack.Group
        screenOptions={{
          headerShown:false
        }}>
        <TeamStack.Screen name="TeamPage" component={TeamPage} />
      </TeamStack.Group>
    </TeamStack.Navigator>
  )
}

export default TeamScreen
