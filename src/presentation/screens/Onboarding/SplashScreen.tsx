/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { RootStackScreenProps } from '@/presentation/navigation/types';
import { getUser } from '@/redux/action/login';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useEffect } from 'react';
import { Alert, Dimensions, PermissionsAndroid, Platform, SafeAreaView, View } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { createTable, getDBConnection, saveNotification } from '@/data/localdb';
import CodePush, { DownloadProgress, LocalPackage } from 'react-native-code-push';
import { Text } from '@rneui/themed';
import Splash from 'react-native-splash-screen';
import useGlobalStyles from '@/presentation/styles';
import { refreshToken } from '@/data/api/accounts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingSpinner from '../Loading';

const SplashScreen = ({ navigation }: RootStackScreenProps<'SplashScreen'>) => {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    // Android 13 이상부터 수동으로 권한 요청 필요.
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    }

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  async function checkCodePush() {
    try {
      console.log('checking update');
      // Todo: 플랫폼별 업데이트 체크
      const update = await CodePush.checkForUpdate();
      if (update) {
        console.log('update exists: ', update);
        update
          .download((progress: DownloadProgress) =>
            console.log(
              `downloading app: ${(progress.receivedBytes / progress.totalBytes) * 100} %`,
            ),
          )
          .then((newPackage: LocalPackage) =>
            newPackage.install(CodePush.InstallMode.IMMEDIATE).then(() => CodePush.restartApp()),
          );
        return;
      }
      console.log('update not exists1');
      throw new Error('업데이트 없음');
    } catch {
      console.log('update not exists2');
      handleLogin();
    }
  }

  const setupFCM = async () => {
    if (!messaging().isAutoInitEnabled) {
      await messaging().registerDeviceForRemoteMessages();
    }

    // Get the device token
    const token = await messaging().getToken();
    console.log(token);

    // If using other push notification providers (ie Amazon SNS, etc)
    // you may need to get the APNs token instead for iOS:
    if (Platform.OS == 'ios') {
      const apnsToken = await messaging().getAPNSToken();
      console.log('apnsToken: ', apnsToken);
    }
  };

  async function isEverBeenLogin() {
    const accessToken = (await AsyncStorage.getItem('accessToken')) ?? '';
    const refreshToken = (await AsyncStorage.getItem('refreshToken')) ?? '';

    if (accessToken?.length > 0 && refreshToken?.length > 0) {
      return true;
    }
    return false;
  }

  async function handleLogin() {
    const token = await messaging().getToken();
    const isEverBeenLoginValue = await isEverBeenLogin();
    if (isEverBeenLoginValue) {
      console.log('토큰을 이용한 로그인 갱신 시도');
      refreshToken({ fcmToken: token });
      navigation.replace('MainBottomTabNavigation', {
        screen: 'Home',
      });
    } else {
      navigation.replace('OnboardingNavigation', {
        screen: 'Login',
      });
      Splash.hide();
    }
  }

  function handleFcmTokenRefresh() {
    messaging().onTokenRefresh(async token => {
      // Todo: save token to server
      console.log('New FCM token: ', token);
      if (await isEverBeenLogin()) {
        refreshToken({ fcmToken: token });
      }
    });
  }

  function handleSubscribe() {
    messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage);
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      const db = await getDBConnection();
      if (!db) {
        return;
      }
      await createTable(db);
      await saveNotification(db, {
        id: parseInt(remoteMessage.messageId ?? '99999') ?? 0,
        title: remoteMessage.data?.title ?? '',
        body: remoteMessage.data?.body ?? '',
        time: remoteMessage.data?.time ?? '',
        type: remoteMessage.data?.type ?? '',
      });

      await db.close();
    });
  }

  useEffect(() => {
    setupFCM();
    requestUserPermission();
    handleSubscribe();
    checkCodePush();
    handleFcmTokenRefresh();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '' }}>
      <LoadingSpinner />
    </View>
  );
};
export default SplashScreen;
