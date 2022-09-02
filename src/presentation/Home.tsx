import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import GroupList from './components/GroupList'

const Home : React.FC = (props) => {
  return <GroupList />
}

export default Home
