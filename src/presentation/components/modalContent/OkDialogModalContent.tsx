import {Alert, Modal, StyleSheet, View} from 'react-native'
import React from 'react'
import DefaultDialogModalContent from './DefaultDialogModalContent'

interface OkDialogModalContentProps {
  title?: string
  text: string
  onOkClick: () => void
}

const OkDialogModalContent: React.FC<OkDialogModalContentProps> = props => {
  return (
    <DefaultDialogModalContent
    title={props.title}
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
