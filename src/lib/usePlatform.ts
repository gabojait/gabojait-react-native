import { useEffect, useMemo, useState } from 'react';
import { Alert, Platform } from 'react-native';
import CodePush, { LocalPackage } from 'react-native-code-push';
import {
  CODEPUSH_DEPLOYMENT_KEY_RELEASE_ANDROID,
  CODEPUSH_DEPLOYMENT_KEY_RELEASE_IOS,
  CODEPUSH_DEPLOYMENT_KEY_STAGING_ANDROID,
  CODEPUSH_DEPLOYMENT_KEY_STAGING_IOS,
} from '@env';

const env = {
  CODEPUSH_DEPLOYMENT_KEY_RELEASE_ANDROID,
  CODEPUSH_DEPLOYMENT_KEY_RELEASE_IOS,
  CODEPUSH_DEPLOYMENT_KEY_STAGING_ANDROID,
  CODEPUSH_DEPLOYMENT_KEY_STAGING_IOS,
};
const osNameToUpperCase: (osName: string) => 'ANDROID' | 'IOS' = (osName: string) =>
  osName.toUpperCase() as 'ANDROID' | 'IOS';

/**
 * 'dev' 상태는 Debug와 Staging 빌드를 포함합니다.
 */
export default function () {
  const [latestVersionPackage, setLatestVersionPackage] = useState<LocalPackage | null>(null);

  useEffect(() => {
    CodePush.getUpdateMetadata().then(r => {
      setLatestVersionPackage(r);
    });
  }, []);

  const isStaging = useMemo(
    () =>
      latestVersionPackage?.deploymentKey ===
      env[`CODEPUSH_DEPLOYMENT_KEY_STAGING_${osNameToUpperCase(Platform.OS)}`],
    [latestVersionPackage],
  );
  const isRelease = useMemo(
    () =>
      latestVersionPackage?.deploymentKey ===
      env[`CODEPUSH_DEPLOYMENT_KEY_RELEASE_${osNameToUpperCase(Platform.OS)}`],
    [latestVersionPackage],
  );

  const isDebug = __DEV__;

  const isDev = useMemo(() => isStaging || isDebug, [isStaging]);

  const alertOnDev = isDev
    ? (title: string = '코드푸시 디버거', message: string) => {
        Alert.alert(title, message);
      }
    : null;

  return {
    isDebug,
    isDev, // staging or debug
    isRelease,
    isStaging,
    currentPackage: latestVersionPackage,
    alertOnDev,
  };
}
