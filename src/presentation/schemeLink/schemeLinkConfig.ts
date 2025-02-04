export const schemeLinkConfig = {
  screens: {
    WebView: undefined,
    OnboardingNavigation: {
      screens: {
        Login: undefined,
        Register: undefined,
        FindAccount: undefined,
        RegisterCompleted: undefined,
        CompleteOnboarding: undefined,
      },
    },
    SplashScreen: '/SplashScreen',
    MainNavigation: {
      screens: {
        Profile: undefined,
        MoreReview: undefined,
        OfferSentUser: undefined,
        ApplyStatus: '/MainNavigation/ApplyStatus',
        ProfilePreview: undefined,
        TeamHistory: '/MainNavigation/TeamHistory',
        TeamReview: '/MainNavigation/TeamReview',
        BookMark: undefined,
        OfferFromTeam: '/MainNavigation/OfferFromTeam',
        TeamDetail: undefined,
        JoinTeam: undefined,
        OfferToTeamHistory: undefined,
        GroupDetail: undefined,
        PositionSelector: undefined,
        GroupCreator: undefined,
        AlertPage: undefined,
        Setting: undefined,
        AlarmSetting: undefined,
        UserModifier: undefined,
        Etc: undefined,
        OpensourcePage: undefined,
        TeamEditor: undefined,
        WebviewPage: undefined,
        TeamComplete: undefined,
        CompleteSuccess: undefined,
        ManageTeammate: undefined,
      },
    },
    MainBottomTabNavigation: {
      screens: {
        Home: {
          screens: {
            GroupList: '/MainBottomTabNavigation/Home/GroupList',
            TeamMate: undefined,
          },
        },
        Team: '/MainBottomTabNavigation/Team',
        MyPage: {
          screens: {
            View: undefined,
            EditMain: undefined,
            EditSchoolAndWork: undefined,
            EditSkill: undefined,
            EditPosition: undefined,
          },
        },
      },
    },
  },
};
