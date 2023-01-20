import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import Detail from '@/presentation/screens/Main/Home/TeamMate/Detail'
import List from '@/presentation/screens/Main/Home/TeamMate/List'
import HomeHeader from '@/presentation/screens/Headers/HomeHeader'

const Teamate = () => {
  const TeamateStack = createStackNavigator()
  return (
    <TeamateStack.Navigator initialRouteName="List">
      <TeamateStack.Screen name="List" component={List} options={{
        header: HomeHeader,
        headerTitle: "팀원 찾기",
      }}/>
      <TeamateStack.Screen name="Detail" component={Detail} />
    </TeamateStack.Navigator>
  )
}

export default Teamate
