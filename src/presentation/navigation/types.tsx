interface WebViewPageProps {
  url: string
  title: string
}

export type RootStackParamList = {
  default: undefined
  WebView: WebViewPageProps
  OnboardingNavigation: undefined
  MainNavigation: undefined
}

export type OnboardingStackParamList = {
  Login: undefined
  Register: undefined
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
