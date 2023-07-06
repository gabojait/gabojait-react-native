import {MainStackScreenProps} from '@/presentation/navigation/types'
import WebView from 'react-native-webview'
import React from 'react'
import {Platform} from 'react-native'
import SendIntentAndroid from 'react-native-send-intent'
export const OpenChatingPage = ({navigation, route}: MainStackScreenProps<'OpenChatingPage'>) => {
  function startActivityAsync(arg0: string, arg1: {data: string; packageName: string}) {
    throw new Error('Function not implemented.')
  }

  return (
    <WebView
      source={{uri: route.params.uri}}
      style={{flex: 1}}
      originWhitelist={['intent://*']}
      onShouldStartLoadWithRequest={event => {
        if (Platform.OS === 'android' && event.url.startsWith('intent:')) {
          SendIntentAndroid.openChromeIntent(event.url)
            .then(isOpened => {
              if (!isOpened) {
                //TODO: 카카오톡 구글플레이스토어로 보내기
              }
              return false
            })
            .catch(err => {
              console.log(err)
            })
          return false
        }
        return true
      }}
    />
  )
}
