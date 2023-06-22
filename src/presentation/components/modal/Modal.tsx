import useGlobalStyles from '@/styles'
import globalStyles from '@/styles'
import {Text} from '@rneui/themed'
import React, {ForwardedRef, forwardRef, useImperativeHandle, useRef, useState} from 'react'
import {Alert, Modal, ModalProps, StyleSheet, View} from 'react-native'
import {FilledButton} from '../Button'
import {ModalContext} from './context'

export type CustomModalRef = {
  show: () => void
  hide: () => void
}

const CustomModal = () => {
  const modal = React.useContext(ModalContext)
  const globalStyles = useGlobalStyles()

  return (
    <Modal
      animationType={modal?.modalProps?.animationType}
      transparent={true}
      visible={modal?.modal}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.')
        modal?.hide()
      }}>
      <View
        style={[
          modal?.modalProps?.justifying == 'bottom'
            ? globalStyles.bottomView
            : globalStyles.centeredView,
          {backgroundColor: 'rgba(217, 217, 217, 0.5)', marginTop: 0},
        ]}>
        {modal?.title != '' ? <Text h3>{modal?.title}</Text> : null}
        {modal?.content}
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
