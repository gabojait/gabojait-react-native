import React, {useEffect} from 'react'
import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack'
import {NavigationContainer, useNavigation} from '@react-navigation/native'
import MainBottomTabNavigation from '@/presentation/navigation/MainBottomTabNavigation'
import OnboardingNavigation from '@/presentation/navigation/OnboardingNavigation'
import {RootStackParamList} from './types'
import WebViewPage from '../components/WebView'
import SplashScreen from '../screens/Onboarding/SplashScreen'
import {useAppDispatch, useAppSelector} from '@/redux/hooks'
import {User} from '@/model/User'
import {getUser} from '@/redux/reducers/loginReducer'
import {AsyncState} from '@/lib/reducerUtils'
import MainNavigation from './MainNavigation'

export type RootStackNavigationProps<T extends keyof RootStackParamList = 'default'> =
  StackNavigationProp<RootStackParamList, T>

const RootStack = createStackNavigator<RootStackParamList>()

export const RootNavigation = () => {
  return (
    <NavigationContainer>
      {/* initialRouteName은 일시적. 추후 자동로그인 가능 여부에 따라 OnboardingNavigation, MainNavigation으로 라우팅될 예정 */}
      <RootStack.Navigator initialRouteName={'SplashScreen'}>
        <RootStack.Screen
          name="WebView"
          component={WebViewPage}
          options={{headerBackTitleVisible: false}}
        />
        <RootStack.Group screenOptions={{headerShown: false}}>
          <RootStack.Screen name="OnboardingNavigation" component={OnboardingNavigation} />
          <RootStack.Screen name="SplashScreen" component={SplashScreen} />
          <RootStack.Screen name="MainNavigation" component={MainNavigation} />
          <RootStack.Screen name="MainBottomTabNavigation" component={MainBottomTabNavigation} options={{gestureEnabled: false}} />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  )
}
