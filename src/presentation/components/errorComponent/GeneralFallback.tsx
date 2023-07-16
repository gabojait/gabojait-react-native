import {Text, View} from 'react-native'
import React from 'react'

export const Fallback500 = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>500 서버에러</Text>
    </View>
  )
}

export const Fallback503 = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>500 서버에러</Text>
    </View>
  )
}
