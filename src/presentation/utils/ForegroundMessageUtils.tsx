import notifee from '@notifee/react-native';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

export const MessageChannel = {
  alarm: 'gabojait_alarm',
};

export function setIosCategories() {
  notifee.setNotificationCategories([{ id: MessageChannel.alarm }]);
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
  notifee.displayNotification({
    id: id,
    title: data?.title || '새 소식이 왔어요!',
    body: data?.body || '알람 페이지를 확인해보세요',
    android: {
      channelId: MessageChannel.alarm,
      asForegroundService: true,
      colorized: true,
      smallIcon: 'ic_fcm_alarm',
    },
    ios: {
      categoryId: MessageChannel.alarm,
      interruptionLevel: 'critical',
      sound: 'default',
    },
  });
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
      smallIcon: 'ic_fcm_alarm',
    },
    ios: {
      categoryId: MessageChannel.alarm,
      interruptionLevel: 'critical',
      sound: 'default',
    },
  });
}
