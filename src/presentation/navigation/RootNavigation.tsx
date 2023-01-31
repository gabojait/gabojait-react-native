import React from 'react'
import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack'
import {NavigationContainer, useNavigation} from '@react-navigation/native'
import MainNavigation from '@/presentation/navigation/MainNavigation'
import OnboardingNavigation from '@/presentation/navigation/OnboardingNavigation'
import {RootStackParamList} from './types'
import WebViewPage from '../components/WebView'

export type RootStackNavigationProps<T extends keyof RootStackParamList = 'default'> =
  StackNavigationProp<RootStackParamList, T>

const RootStack = createStackNavigator<RootStackParamList>()

export const RootNavigation = () => {
  console.log('HELLO')
  return (
    <NavigationContainer>
      {/* initialRouteName은 일시적. 추후 자동로그인 가능 여부에 따라 OnboardingNavigation, MainNavigation으로 라우팅될 예정 */}
      <RootStack.Navigator initialRouteName="MainNavigation">
        <RootStack.Screen
          name="WebView"
          component={WebViewPage}
          options={{headerBackTitleVisible: false}}
        />
        <RootStack.Group screenOptions={{headerShown: false}}>
          <RootStack.Screen name="OnboardingNavigation" component={OnboardingNavigation} />
          <RootStack.Screen name="MainNavigation" component={MainNavigation} />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  )
}
