import {View} from 'react-native'
import React from 'react'
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack'
import Header from '../../Headers/TitleHeader'
import {Text} from '@rneui/themed'
import globalStyles from '@/styles'
import {FilledButton} from '@/presentation/components/Button'
import {MainBottomTabNavigationProps, MainBottomTabParamList} from '@/presentation/navigation/types'
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs'

const Main = ({navigation}: MainBottomTabNavigationProps<'MyPage'>) => {
  return (
    <View style={globalStyles.container}>
      <Text>마이페이지 메인입니다. </Text>
      <FilledButton
        title="프로필"
        onPress={() => {
          navigation.getParent()?.navigate('MainNavigation', {screen: 'Profile'})
        }}
      />
    </View>
  )
}
export default Main
