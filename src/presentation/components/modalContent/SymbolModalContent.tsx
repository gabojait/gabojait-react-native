import globalStyles from '@/styles'
import {Button, ButtonProps, Text} from '@rneui/themed'
import {Alert, Modal, StyleSheet, View} from 'react-native'
import DatePicker from 'react-native-date-picker'
import {FilledButton} from '../Button'
import React from 'react'

interface SymbolModalContentProps {
  title: string
  text: string
  symbol: React.ReactNode
  yesButton?: ButtonProps
}

const SymbolModalContent: React.FC<SymbolModalContentProps> = props => {
  return (
    <View style={[{display: 'flex'}, style.modalContainer]}>
      {props.symbol}
      <Text style={{fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginBottom: 20}}>{props.title}</Text>
      <Text style={{textAlign: 'center', marginBottom: 20}}>{props.text}</Text>
      {props.yesButton ? <FilledButton {...props.yesButton} /> : null}
    </View>
  )
}

const style = StyleSheet.create({
  modalContainer: {
    padding: 20,
  },
})

export default SymbolModalContent
