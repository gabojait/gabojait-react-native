import useGlobalStyles from '@/styles'
import {Text} from '@rneui/themed'
import React from 'react'
import {Alert, Modal, StyleSheet, View} from 'react-native'
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

export default CustomModal
