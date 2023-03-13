import {BottomTabScreenProps} from '@react-navigation/bottom-tabs'
import {CompositeScreenProps, NavigatorScreenParams, ParamListBase} from '@react-navigation/native'
import {StackScreenProps} from '@react-navigation/stack'

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
export type MainStackScreenProps<T extends keyof MainStackParamList> = StackScreenProps<
  MainStackParamList,
  T
>

export type MainStackParamList = {
  Profile: NavigatorScreenParams<ProfileStackParamList>
  ApplyStatus: undefined
  TeamHistory: undefined
  TeamReview: {teamId: string}
  BookMark: undefined
  OfferPage: undefined
  TeamApplied: undefined
  GroupDetail: {teamId: string}
  GroupEditor: undefined
  PositionSelector: {teamId: string}
  Setting: undefined
  AlarmSetting: undefined
  Etc: undefined
  UserModifier: undefined
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
  GroupList: undefined
  TeamMate: undefined
  MainNavigation: NavigatorScreenParams<MainStackParamList>
}
export type BoardStackParamListProps<T extends keyof BoardStackParamList> = StackScreenProps<
  BoardStackParamList,
  T
>

export type ApplyStatusTabParamList = {
  Frontend: undefined
  Backend: undefined
  Designer: undefined
  PM: undefined
}

export type ProfileStackParamListProps<T extends keyof ProfileStackParamList> = StackScreenProps<
  ProfileStackParamList,
  T
>

export type ProfileStackParamList = {
  View: undefined
  EditMain: undefined
  EditPortfolio: undefined
  EditSchoolAndCareer: undefined
  EditSkillAndPosition: undefined
}
