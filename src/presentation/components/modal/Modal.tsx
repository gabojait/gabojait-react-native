import globalStyles from '@/styles'
import {Text} from '@rneui/themed'
import React, {ForwardedRef, forwardRef, useImperativeHandle, useRef, useState} from 'react'
import {Alert, Modal, StyleSheet, View} from 'react-native'
import {FilledButton} from '../Button'
import {ModalContext} from './context'

export type CustomModalRef = {
  show: () => void
  hide: () => void
}

const CustomModal = () => {
  const modal = React.useContext(ModalContext)

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modal?.modal}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.')
        modal?.hide()
      }}>
      <View style={globalStyles.centeredView}>
        <View style={globalStyles.modal}>
          <Text h3>{modal?.title}</Text>
          {modal?.content}
        </View>
      </View>
    </Modal>
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

export default CustomModal
