import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import HomeHeader from '@/presentation/screens/Headers/HomeHeader'
import Detail from '@/presentation/screens/Main/Team/Detail'
import Review from '@/presentation/screens/Main/Team/Review'
import TeamSelector from '@/presentation/screens/Main/Team/TeamSelector'
import TitleHeader from '@/presentation/screens/Headers/TitleHeader'

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
