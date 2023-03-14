import {ButtonProps, Text} from '@rneui/themed'
import { StyleSheet, View} from 'react-native'
import {FilledButton} from '../Button'
import React from 'react'

export interface SymbolModalContentProps {
  title?: string
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
