import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import Detail from './Detail'
import Editor from './Editor'
import HomeHeader from '@/presentation/screens/Headers/HomeHeader'
import List from './List'
import PositionSelector from './PositionSelector'

const Group = () => {
  const BoardStack = createStackNavigator()
  return (
    <BoardStack.Navigator initialRouteName="List">
      <BoardStack.Screen name="List" component={List} options={{
        header: HomeHeader,
        headerTitle: "팀 구하기",
      }}/>
      <BoardStack.Screen name="Detail" component={Detail} />
      <BoardStack.Screen name="PositionSelector" component={PositionSelector} />
      <BoardStack.Screen name="Editor" component={Editor} />
    </BoardStack.Navigator>
  )
}

export default Group
