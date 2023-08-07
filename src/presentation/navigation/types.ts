import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
  ParamListBase,
} from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { BoardStackNavigationProps } from './BoardNavigation';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';

interface WebViewPageProps {
  url: string;
  title: string;
}

export type RootStackParamList = {
  default: undefined;
  WebView: WebViewPageProps;
  SplashScreen: undefined;
  OnboardingNavigation: NavigatorScreenParams<OnboardingStackParamList>;
  MainNavigation: NavigatorScreenParams<MainStackParamList>;
  MainBottomTabNavigation: NavigatorScreenParams<MainBottomTabParamList>;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<
  RootStackParamList,
  T
>;

export type OnboardingStackParamList = {
  Login: undefined;
  Register: undefined;
  RegisterCompleted: undefined;
  FindAccount: undefined;
  CompleteOnboarding: undefined;
};

export type OnboardingScreenProps<T extends keyof OnboardingStackParamList> = StackScreenProps<
  OnboardingStackParamList,
  T
>;

export type MainStackScreenProps<T extends keyof MainStackParamList> = StackScreenProps<
  MainStackParamList,
  T
>;

export type MainStackParamList = {
  Profile: NavigatorScreenParams<ProfileStackParamList>;
  ApplyStatus: undefined;
  TeamHistory: undefined;
  TeamReview: { teamId: string };
  BookMark: undefined;
  OfferPage: undefined;
  TeamApplied: undefined;
  GroupDetail: { teamId: string };
  GroupCreator: undefined;
  OpenChatingPage: { uri: string };
  PositionSelector: { teamId: string };
  Setting: undefined;
  AlarmSetting: undefined;
  Etc: undefined;
  OpenSourcePage: undefined;
  UserModifier: undefined;
  TeamEditor: undefined;
  TeamComplete: undefined;
  CompleteSuccess: undefined;
  ManageTeammate: undefined;
};

export type MainBottomTabParamList = {
  Home: undefined;
  Team: undefined;
  MyPage: undefined;
  Notification: undefined;
};

export type MainBottomTabNavigationProps<T extends keyof MainBottomTabParamList = 'Home'> =
  CompositeScreenProps<
    BottomTabScreenProps<MainBottomTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

export type BoardStackParamList = {
  GroupList: undefined;
  TeamMate: NavigatorScreenParams<TeammateStackParamList>;
  MainNavigation: NavigatorScreenParams<MainStackParamList>;
};

export type BoardStackParamListProps<T extends keyof BoardStackParamList> = StackScreenProps<
  BoardStackParamList,
  T
>;

export type ProfileStackParamListProps<T extends keyof ProfileStackParamList> = StackScreenProps<
  ProfileStackParamList,
  T
>;

export type ProfileStackParamList = {
  View: undefined;
  EditMain: undefined;
  EditPortfolio: undefined;
  EditSchoolAndWork: undefined;
  EditSkillAndPosition: undefined;
};

// export type TeammateStackParamListProps<T extends keyof TeammateStackParamList> =
//   CompositeScreenProps<
//     MaterialTopTabScreenProps<TeammateStackParamList, T>,
//     BoardStackParamListProps<keyof BoardStackParamList>
//   >;

export type TeammateStackParamListProps<T extends keyof TeammateStackParamList> = StackScreenProps<
  TeammateStackParamList,
  T
>;

export type TeammateStackParamList = {
  TeammateList: NavigatorScreenParams<PositionTabParamList>;
  ProfilePreview: { userId: string };
};

export type PositionTabParamListProps<T extends keyof PositionTabParamList> = StackScreenProps<
  PositionTabParamList,
  T
>;

export type PositionTabParamList = {
  Frontend: undefined;
  Backend: undefined;
  Designer: undefined;
  PM: undefined;
};
