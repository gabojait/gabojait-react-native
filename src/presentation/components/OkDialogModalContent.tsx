import globalStyles from '@/styles'
import {Button, ButtonProps, Text} from '@rneui/themed'
import {Alert, Modal, StyleSheet, View} from 'react-native'
import DatePicker from 'react-native-date-picker'
import {FilledButton} from './Button'
import React from 'react'
import DefaultDialogModalContent from './DefaultDialogModalContent'

interface OkDialogModalContentProps {
  text: string
  onOkClick: () => void
}

const OkDialogModalContent: React.FC<OkDialogModalContentProps> = props => {
  return (
    <DefaultDialogModalContent
      text={props.text}
      yesButton={{onPress: props.onOkClick, title: '확인'}}
    />
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

export default OkDialogModalContent
