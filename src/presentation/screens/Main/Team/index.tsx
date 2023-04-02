import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {TeamPage} from '@/presentation/screens/Main/Team/TeamPage'
import {MainBottomTabNavigationProps} from '@/presentation/navigation/types'
import { TeamEditor } from './TeamEditor'

const TeamStack = createStackNavigator()

export const TeamScreen = ({navigation}:MainBottomTabNavigationProps<'Team'>) => {
  return (
    <TeamStack.Navigator initialRouteName="TeamPage">
      <TeamStack.Group
        screenOptions={{
          headerShown:false
        }}>
        <TeamStack.Screen name="TeamPage" component={TeamPage}/>
        <TeamStack.Screen name="TeamEditor" component={TeamEditor}/>
      </TeamStack.Group>
    </TeamStack.Navigator>
  )
}

export default TeamScreen
