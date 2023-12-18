import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { Position } from '@/data/model/type/Position';

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
  ApplyStatus: NavigatorScreenParams<PositionTabParamList>;
  TeamHistory: undefined;
  TeamReview: { teamId: string };
  BookMark: { isLeader: boolean };
  OfferFromTeamPage: undefined;
  TeamDetail: { teamId: string; targetPosition: Position; offerId: number };
  JoinTeam: { teamId: string; targetPosition: Position; offerId: number };
  OfferToTeamHistory: undefined;
  GroupDetail: { teamId: string };
  GroupCreator: undefined;
  OpenChatingPage: { uri: string };
  PositionSelector: { teamId: string };
  Setting: undefined;
  AlarmSetting: undefined;
  AlertPage: undefined;
  Etc: undefined;
  OpenSourcePage: undefined;
  UserModifier: undefined;
  TeamEditor: undefined;
  TeamComplete: undefined;
  CompleteSuccess: undefined;
  ManageTeammate: undefined;
  ProfilePreview: { userId: string };
  OfferSentUser: NavigatorScreenParams<PositionTabParamList>;
  MoreReview: { userId: string };
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
  TeamMate: NavigatorScreenParams<PositionTabParamList>;
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

export type PositionTabParamListProps<T extends keyof PositionTabParamList> = StackScreenProps<
  PositionTabParamList,
  T
>;

export type PositionTabParamList = {
  Frontend: {
    position: Position;
  };
  Backend: {
    position: Position;
  };
  Designer: {
    position: Position;
  };
  PM: {
    position: Position;
  };
};
