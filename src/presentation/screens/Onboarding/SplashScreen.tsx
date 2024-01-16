import { RootStackScreenProps } from '@/presentation/navigation/types';
import React, { useEffect } from 'react';
import { Alert, BackHandler, PermissionsAndroid, Platform, View } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import CodePush, { DownloadProgress, RemotePackage } from 'react-native-code-push';
import Splash from 'react-native-splash-screen';
import { refreshToken } from '@/data/api/accounts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingSpinner from '../Loading';
import { onlineManager } from 'react-query';
import { AsyncStorageKey } from '@/lib/asyncStorageKey';
import { axiosConfig } from '@/lib/axiosInstance';
import usePlatform from '@/lib/usePlatform';

const SplashScreen = ({ navigation }: RootStackScreenProps<'SplashScreen'>) => {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    console.log('Authorization status:', enabled);

    // Android 13 이상부터 수동으로 권한 요청 필요.
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const androidAuthStatus = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      return androidAuthStatus === 'granted';
    }
    return enabled;
  }

  async function checkCodePush() {
    console.log('checking update');
    // Todo: 플랫폼별 업데이트 체크
    try {
      const update = await CodePush.checkForUpdate();
      console.log(
        `${update?.deploymentKey}, ${
          process.env[`CODEPUSH_DEPLOYMENT_KEY_STAGING_${Platform.OS.toUpperCase()}`]
        }`,
      );
      return update;
    } catch (e) {
      return null;
    }
  }

  const setupFCM = async () => {
    await messaging().registerDeviceForRemoteMessages();
    if (messaging().isDeviceRegisteredForRemoteMessages) {
      console.log(
        '[FCM]',
        `
      FCM 설정을 시작합니다.
      Firebase Messaging SDK Version: ${messaging.SDK_VERSION}
      ${Platform.OS === 'ios' ? 'Headless 여부: ' + (await messaging().getIsHeadless()) : ''}
      FCM 토큰: ${await messaging().getToken()}
      APNS 토큰: ${await messaging().getAPNSToken()}
      기기 등록 여부: ${messaging().isDeviceRegisteredForRemoteMessages}
      
    `,
      );
      return true;
    } else {
      return false;
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

  const checkLoginAndRefresh = async (refreshToken: string, fcmToken: string) => {
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'refresh-Token': `Bearer ${refreshToken}`,
      },
      body: JSON.stringify({ fcmToken: fcmToken }),
    };
    const response = await fetch(`${axiosConfig.baseURL}/user/token`, request);
    const body = await response.json();
    if (response.ok) {
      return [response.headers.get('Authorization')!, response.headers.get('refresh-token')!];
    } else {
      throw {
        name: body.responseCode,
        message: body.responseMessage,
      };
    }
  };

  async function handleLogin() {
    if (!messaging().isDeviceRegisteredForRemoteMessages) {
      return;
    }
    const token = await messaging().getToken();
    const isEverBeenLoginValue = await isEverBeenLogin();
    if (isEverBeenLoginValue) {
      console.log('토큰을 이용한 로그인 갱신 시도');
      // isEverBeenLogin 에서 토큰 없는 경우 어차피 걸림
      try {
        return await checkLoginAndRefresh(
          (await AsyncStorage.getItem(AsyncStorageKey.refreshToken))!,
          token,
        );
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  function handleFcmTokenRefresh() {
    messaging().onTokenRefresh(async token => {
      // FIXME: 로그인 흐름이 이상해질까봐 우선 제거했습니다.
      // // Todo: save token to server
      // console.log('New FCM token: ', token);
      // if (await isEverBeenLogin()) {
      //   await refreshToken({ fcmToken: token });
      // }
    });
  }

  const checkNetworkConnection = () => {
    if (!onlineManager.isOnline()) {
      Alert.alert('오류', '네트워크에 연결돼있지 않습니다. 앱을 종료합니다.', [
        { text: '확인', onPress: () => BackHandler.exitApp() },
      ]);
    }
  };

  const platform = usePlatform();
  const applyUpdate = async (update: RemotePackage) => {
    if (update) {
      console.log('update exists: ', update);
      platform.alertOnDev?.(undefined, `업데이트가 존재합니다. 버전: ${update.appVersion}`);
      const newPackage = await update.download((progress: DownloadProgress) =>
        console.log(`downloading app: ${(progress.receivedBytes / progress.totalBytes) * 100} %`),
      );
      newPackage.install(CodePush.InstallMode.IMMEDIATE).then(() => {
        if (platform.isDev) {
          Alert.alert('코드푸시 디버거', '업데이트 설치 완료. JS 번들을 교체합니다.');
          CodePush.restartApp(true);
        }
      });
      return true;
    }
  };

  const initApp = async () => {
    try {
      checkNetworkConnection();
      // 개발모드이거나 개발모드가 아닌데 코드푸시 업데이트가 존재하지 않으면 로그인 처리
      const isDev = __DEV__;
      const update = await checkCodePush();
      if (!isDev && update) {
        await applyUpdate(update);
        return 0;
      }

      Splash.hide();

      const authStatus = await requestUserPermission();
      console.log('알림 권한 요청 완료. 알림 권한:', authStatus);
      if (authStatus) {
        if (!(await setupFCM())) {
          return 1;
        }
        console.log('FCM 셋업 완료');
        console.log('메시지 핸들러 셋업 완료 ');
        handleFcmTokenRefresh();
      }

      if (isDev || (!isDev && !update)) {
        const tokens = await handleLogin();
        if (tokens) {
          const [accessToken, refreshToken] = tokens;
          await AsyncStorage.setItem(AsyncStorageKey.accessToken, accessToken);
          await AsyncStorage.setItem(AsyncStorageKey.refreshToken, refreshToken);
        }
        if (tokens) {
          navigation.replace('MainBottomTabNavigation', {
            screen: 'Home',
          });
        } else {
          navigation.replace('OnboardingNavigation', {
            screen: 'Login',
          });
        }
      }
    } catch (e) {
      Splash.hide();
      Alert.alert((e as Error)?.message);
    }
  };

  useEffect(() => {
    initApp().catch(e => Alert.alert(e.message));
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '' }}>
      <LoadingSpinner />
    </View>
  );
};
export default SplashScreen;
