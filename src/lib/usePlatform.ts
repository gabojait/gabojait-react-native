import { useEffect, useMemo, useState } from 'react';
import { Platform } from 'react-native';
import CodePush, { LocalPackage } from 'react-native-code-push';

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

  const isDev = useMemo(
    () =>
      latestVersionPackage?.deploymentKey ===
        process.env[`CODEPUSH_DEPLOYMENT_KEY_STAGING_${Platform.OS.toUpperCase()}`] || __DEV__,
    [latestVersionPackage],
  );
  return {
    isDev,
    isDebug: __DEV__,
    isStaging: !__DEV__ && isDev,
    currentPackage: latestVersionPackage,
  };
}
