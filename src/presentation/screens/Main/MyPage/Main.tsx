import {View} from 'react-native'
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import Header from '../../Headers/TitleHeader'
import {Text} from '@rneui/themed'
import globalStyles from '@/styles'

const Main = () => {
  return (
    <View style={globalStyles.container}>
      <Text>마이페이지 메인입니다. </Text>
    </View>
  )
}
export default Main
