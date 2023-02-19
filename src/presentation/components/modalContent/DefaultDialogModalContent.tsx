import globalStyles from '@/styles'
import {Button, ButtonProps, Text} from '@rneui/themed'
import {Alert, Modal, StyleSheet, View} from 'react-native'
import DatePicker from 'react-native-date-picker'
import {FilledButton} from '../Button'
import React from 'react'

interface DefaultDialogModalContentProps {
  text: string
  yesButton?: ButtonProps
  noButton?: ButtonProps
}

const DefaultDialogModalContent: React.FC<DefaultDialogModalContentProps> = props => {
  return (
    <View style={{display: 'flex'}}>
      <Text>{props.text}</Text>
      {props.yesButton ? <FilledButton {...props.yesButton} /> : null}
      {props.noButton ? <FilledButton {...props.noButton} /> : null}
    </View>
  )
}

const style = StyleSheet.create({
  buttonStyle: {
    borderRadius: 20,
    borderTopStartRadius: 0,
    borderTopEndRadius: 0,
    paddingVertical: 25,
  },
  buttonContainerStyle: {
    padding: 0,
    width: '100%',
    borderTopStartRadius: 0,
    borderTopEndRadius: 0,
  },
})

export default DefaultDialogModalContent
