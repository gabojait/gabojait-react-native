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
import { useDB } from '@/data/localdb/dbProvider';

const SplashScreen = ({ navigation }: RootStackScreenProps<'SplashScreen'>) => {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    console.log('Authorization status:', enabled);

    // Android 13 이상부터 수동으로 권한 요청 필요.
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
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
    console.log(
      '[FCM]',
      `
      FCM 설정을 시작합니다.
      Firebase Messaging SDK Version: ${messaging.SDK_VERSION}
      Auto init 활성화 여부: ${messaging().isAutoInitEnabled}
      Headless 여부: ${await messaging().getIsHeadless()}
      FCM 토큰: ${await messaging().getToken()}
      APNS 토큰: ${await messaging().getAPNSToken()}
      기기 등록 여부: ${messaging().isDeviceRegisteredForRemoteMessages}
      
    `,
    );
    if (!messaging().isAutoInitEnabled) {
      await messaging().registerDeviceForRemoteMessages();
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
      await refreshToken({ fcmToken: token });
      navigation.replace('MainBottomTabNavigation', {
        screen: 'Home',
      });
    } else {
      navigation.replace('OnboardingNavigation', {
        screen: 'Login',
      });
    }
    Splash.hide();
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

  const db = useDB();

  function handleSubscribe() {
    messaging().onMessage(async remoteMessage => {
      console.log(`
      새로운 FCM 메시지가 도착했어요.
      DB 상태: ${db ? '정상' : '오류'}
      ----------
      ${JSON.stringify(remoteMessage)}
      ----------
      `);
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
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
