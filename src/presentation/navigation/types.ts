interface WebViewPageProps {
  url: string
  title: string
}

export type RootStackParamList = {
  default: undefined
  WebView: WebViewPageProps
  SplashScreen: undefined
  OnboardingNavigation: undefined
  MainNavigation: undefined
}

export type OnboardingStackParamList = {
  Login: undefined
  Register: undefined
  RegisterCompleted: undefined
  FindAccount: undefined
  CompleteOnboarding: undefined
}

export type MainStackParamList = {
  Home: undefined
  Team: undefined
  MyPage: undefined
  Notification: undefined
}

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
