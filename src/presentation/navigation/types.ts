import {BottomTabScreenProps} from '@react-navigation/bottom-tabs'
import {CompositeScreenProps, NavigatorScreenParams, ParamListBase} from '@react-navigation/native'
import {StackScreenProps} from '@react-navigation/stack'
import {MainBottomTabNavigationProp} from './MainBottomTabNavigation'

interface WebViewPageProps {
  url: string
  title: string
}

export type RootStackParamList = {
  default: undefined
  WebView: WebViewPageProps
  SplashScreen: undefined
  OnboardingNavigation: NavigatorScreenParams<OnboardingStackParamList>
  MainNavigation: NavigatorScreenParams<MainStackParamList>
  MainBottomTabNavigation: NavigatorScreenParams<MainBottomTabParamList>
}

export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<
  RootStackParamList,
  T
>

export type OnboardingStackParamList = {
  Login: undefined
  Register: undefined
  RegisterCompleted: undefined
  FindAccount: undefined
  CompleteOnboarding: undefined
}

export type OnboardingScreenProps<T extends keyof OnboardingStackParamList> = StackScreenProps<
  OnboardingStackParamList,
  T
>

export type MainStackParamList = {
  Profile: undefined
}

export type MainBottomTabParamList = {
  Home: undefined
  Team: undefined
  MyPage: undefined
  Notification: undefined
}

export type MainBottomTabNavigationProps<T extends keyof MainBottomTabParamList = 'Home'> =
  CompositeScreenProps<
    BottomTabScreenProps<MainBottomTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >

export type BoardStackParamList = {
  Group: undefined
  TeamMate: undefined
}

export type GroupStackParamList = {
  List: undefined
  Detail: undefined
  PositionSelector: undefined
  Editor: undefined
}
