import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack'
import {WebView} from 'react-native-webview'
import {RootStackNavigationProps} from '../navigation/RootNavigation'
import {RootStackParamList} from '../navigation/types'
import React, {useState} from 'react'
import {ActivityIndicator, StyleSheet, View} from 'react-native'
import {Button} from '@rneui/themed'
import globalStyles from '@/styles'

const WebViewPage = ({navigation, route}: StackScreenProps<RootStackParamList, 'WebView'>) => {
  navigation.setOptions({headerTitle: route.params.title})
  const [loading, setLoading] = useState(false)
  return (
    <View style={{flex: 1}}>
      <WebView
        style={{zIndex: 0}}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        source={{uri: route.params.url}}
      />
      {loading ? (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator />
        </View>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  loadingWrapper: {
    zIndex: 4,
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
})

export default WebViewPage
