import notifee, { EventType } from '@notifee/react-native';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { Linking, Platform } from 'react-native';
import { QueryClient } from 'react-query';
import { schemeLinkConfig } from '@/presentation/schemeLink/schemeLinkConfig';
import { reviewKeys } from '@/reactQuery/key/ReviewKeys';
import { teamKeys } from '@/reactQuery/key/TeamKeys';

const AppScheme = 'gabojait';
export const MessageChannel = {
  alarm: 'gabojait_alarm',
};

export function initializeMessage(queryClient: QueryClient) {
  if (Platform.OS === 'ios') {
    setIosCategories();
  } else {
    setAndroidForegroundService();
    setAndroidAlarmChannel();
  }

  messaging().onMessage(async remoteMessage => {
    let id = 0;
    removeCache(remoteMessage?.data?.deepLink, queryClient);
    displayForegroundNotification(id.toString(), remoteMessage);
    id++;
  });

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    let id = 0;
    removeCache(remoteMessage?.data?.deepLink, queryClient);
    displayBackgroundNotification(id.toString(), remoteMessage);
    id++;
  });
}

export function setIosCategories() {
  notifee.setNotificationCategories([
    {
      id: MessageChannel.alarm,
      actions: [
        {
          id: 'deepLink',
          title: 'Open',
          foreground: true,
          destructive: true,
          authenticationRequired: true,
        },
      ],
    },
  ]);
}

export function setAndroidForegroundService() {
  notifee.registerForegroundService(notification => {
    return new Promise(() => {});
  });
}

export function setAndroidAlarmChannel() {
  notifee.createChannel({
    id: MessageChannel.alarm,
    name: '알람',
    sound: 'hollow',
  });
}

export function displayForegroundNotification(
  id: string,
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
) {
  const data = remoteMessage.data;
  console.log(
    `===========================remoteMessage:{title:${data?.title}, body:${data?.body}, deepLink:${data?.deepLink}`,
  );
  notifee.displayNotification({
    id: id,
    title: data?.title || '새 소식이 왔어요!',
    body: data?.body || '알람 페이지를 확인해보세요',
    android: {
      channelId: MessageChannel.alarm,
      asForegroundService: true,
      colorized: true,
      smallIcon: 'ic_fcm_alarm',
      actions: [
        {
          title: 'Open',
          icon: 'ic_fcm_alarm',
          pressAction: {
            id: 'deepLink',
            launchActivity: 'gabojait',
          },
        },
      ],
    },
    ios: {
      categoryId: MessageChannel.alarm,
      interruptionLevel: 'critical',
      sound: 'default',
    },
  });

  notifee.onForegroundEvent(({ type, detail }) => {
    if (type === EventType.ACTION_PRESS && detail.pressAction?.id) {
      console.log('Foreground-----User pressed an action with the id: ', detail.pressAction.id);
      openDeepLink(data?.deepLink);
    }
  });
}

function openDeepLink(url: string | undefined) {
  if (url) {
    Linking.openURL(url);
  }
}
export function displayBackgroundNotification(
  id: string,
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
) {
  const data = remoteMessage.data;
  notifee.displayNotification({
    id: id,
    title: data?.title || '새 소식이 왔어요!',
    body: data?.body || '알람 페이지를 확인해보세요',
    android: {
      channelId: MessageChannel.alarm,
      asForegroundService: false,
      colorized: true,
      actions: [
        {
          title: 'Open',
          icon: 'ic_fcm_alarm',
          pressAction: {
            id: 'deepLink',
            launchActivity: 'gabojait',
          },
        },
      ],
    },
    ios: {
      categoryId: MessageChannel.alarm,
      interruptionLevel: 'critical',
      sound: 'default',
    },
  });
  notifee.onBackgroundEvent(async ({ type, detail }) => {
    if (type === EventType.ACTION_PRESS && detail.pressAction?.id === 'deepLink') {
      console.log(
        'Background-----------User pressed an action with the id: ',
        detail.pressAction.id,
      );
      openDeepLink(data?.deepLink);
    }
  });
}

export function removeCache(url: string | undefined, queryClient: QueryClient) {
  switch (url) {
    case AppScheme + ':/' + schemeLinkConfig.screens.MainNavigation.screens.ApplyStatus:
      break;
    case AppScheme + ':/' + schemeLinkConfig.screens.MainNavigation.screens.OfferFromTeam:
      break;
    case AppScheme +
      ':/' +
      schemeLinkConfig.screens.MainBottomTabNavigation.screens.Home.screens.GroupList:
      break;
    case AppScheme + ':/' + schemeLinkConfig.screens.MainNavigation.screens.TeamHistory:
      queryClient.removeQueries(reviewKeys.reviewAvailableTeams);
      break;
    case AppScheme + ':/' + schemeLinkConfig.screens.MainBottomTabNavigation.screens.Team:
      queryClient.removeQueries(teamKeys.myTeam);
      break;
    default:
      console.error('deepLink url이 없습니다!');
      break;
  }
}
