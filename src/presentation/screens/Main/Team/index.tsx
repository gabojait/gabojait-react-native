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
    <TeamStack.Navigator initialRouteName="Detail">
      <TeamStack.Screen name="Detail" component={Detail} options={{
        header: TitleHeader,
        headerTitle: "팀페이지"
      }} />
      <TeamStack.Screen name="TeamSelector" component={TeamSelector} />
      <TeamStack.Screen name="Review" component={Review} />
    </TeamStack.Navigator>
  )
}

export default TeamScreen
