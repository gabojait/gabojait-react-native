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
          const intents = event.url.split('#Intent;')
          const path = intents[0] || ''
          const query = intents[1] || ''
          const params: Record<string, string> = {}
          query.split(';').map(item => {
            const pairs = item.split('=')
            params[pairs[0]] = pairs[0]
          })
          const scheme = params?.scheme
          const packageName = params?.package
          const data = path.replace('intent://', `${scheme}://`)
          SendIntentAndroid.openChromeIntent(event.url)
            .then(isOpened => {
              if (!isOpened) {
                console.log('앱 실행에 실패했습니다.')
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
