import React from 'react'
import globalStyles from '@/styles'
import {Text, useTheme} from '@rneui/themed'
import {View} from 'react-native'

const Profile = () => {
  const {theme} = useTheme()
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.25}} />

      <View
        style={{
          flex: 0.75,
          backgroundColor: 'white',
          borderTopStartRadius: 18,
          borderTopEndRadius: 18,
        }}>
        <View
          style={{
            position: 'absolute',
            width: 128,
            height: 128,
            backgroundColor: theme.colors.grey0,
            borderRadius: 8,
            top: -(128 - 30),
            left: 20,
          }}></View>
      </View>
    </View>
  )
}

export default Profile
