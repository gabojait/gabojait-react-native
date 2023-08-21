import React, {ReactComponentElement} from 'react'
import {CompositeNavigationProp, NavigationProp, useNavigation} from '@react-navigation/native'
import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack'
import Login from '@/presentation/screens/Onboarding/Login'
import Register from '@/presentation/screens/Onboarding/Register'
import FindAccount from '@/presentation/screens/Onboarding/FindAccount'
import CompleteOnboarding from '@/presentation/screens/Onboarding/CompleteOnboarding'
import BackHeader from '@/presentation/screens/Headers/TitleWithCloseHeader'
import TitleHeader from '@/presentation/screens/Headers/TitleHeader'
import {OnboardingStackParamList} from '@/presentation/navigation/types'
import {RootStackNavigationProps} from '@/presentation/navigation/RootNavigation'
import RegisterCompleted from '../screens/Onboarding/RegisterCompleted'

const OnboardingStack = createStackNavigator<OnboardingStackParamList>()

const OnboardingNavigation = () => {
  return (
    <OnboardingStack.Navigator initialRouteName="Login">
      <OnboardingStack.Screen
        name="Login"
        component={Login}
        options={{
          header: TitleHeader,
          title: '',
          gestureEnabled: false,
        }}
      />
      <OnboardingStack.Screen
        name="Register"
        component={Register}
        options={{
          header: TitleHeader,
          title: '회원가입',
        }}
      />
      <OnboardingStack.Screen
        name="FindAccount"
        component={FindAccount}
        options={{
          header: BackHeader,
          headerTitle: '',
        }}
      />
      <OnboardingStack.Screen
        name="RegisterCompleted"
        component={RegisterCompleted}
        options={{headerShown: false}}
      />
      <OnboardingStack.Screen
        name="CompleteOnboarding"
        component={CompleteOnboarding}
        options={{
          headerShown: false,
        }}
      />
    </OnboardingStack.Navigator>
  )
}

export default OnboardingNavigation
