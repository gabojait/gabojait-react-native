import styles from '@/styles'
import {Text, TextProps} from '@rneui/themed'
import React from 'react'
import {StyleSheet} from 'react-native'

export default function CenteredText(props: TextProps) {
  return (
    <Text style={[props.style,styles.centerText, ]} {...props}>
      {props.children}
    </Text>
  )
}
