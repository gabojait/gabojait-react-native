import { MainStackScreenProps } from '@/presentation/navigation/types';
import WebView from 'react-native-webview';
import React, { useCallback } from 'react';
import { Linking, Platform } from 'react-native';

const KAKAO_TALK_PLAYSTORE_URL = 'https://play.google.com/store/apps/details?id=com.kakao.talk';
const KAKAO_TALK_APPSTORE_URL = 'https://apps.apple.com/us/app/kakaotalk/id362057947';
export const OpenChatingPage = ({ navigation, route }: MainStackScreenProps<'OpenChatingPage'>) => {
  // 각각의 버튼에 대한 실행될 링크(url)와 링크가 실행되지 않을 때 대체 링크(alterUrl)
  const handlePress = useCallback(async (url: string, alterUrl: string) => {
    // 만약 어플이 설치되어 있으면 true, 없으면 false
    const supported = await Linking.canOpenURL(url);

    // if (supported) {
    //   // 설치되어 있으면
    //   await Linking.openURL(url);
    // } else {
    //   // 앱이 없으면
    //   await Linking.openURL(alterUrl);
    // }
  }, []);
  return (
    <WebView
      // @ts-ignore
      source={{ uri: route.params.uri }}
      style={{ flex: 1 }}
      originWhitelist={['intent://*']}
      onShouldStartLoadWithRequest={event => {
        if (Platform.OS === 'android' && event.url.startsWith('intent:')) {
          // handlePress(event.url, KAKAO_TALK_PLAYSTORE_URL);
          return false;
        } else if (Platform.OS === 'ios') {
          // handlePress(event.url, KAKAO_TALK_APPSTORE_URL);
          return false;
        }
        return true;
      }}
    />
  );
};
