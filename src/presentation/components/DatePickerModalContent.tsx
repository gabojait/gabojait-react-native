import globalStyles from '@/styles'
import {Button, Text} from '@rneui/themed'
import {Alert, Modal, StyleSheet, View} from 'react-native'
import DatePicker from 'react-native-date-picker'
import {FilledButton} from './Button'
import React from 'react'

interface DatePickerModalProps {
  doneButtonText: string
  onModalVisibityChanged: (visibility: boolean) => void
  date: Date
  onDatePicked: (date: Date) => void
}

const DatePickerModalContent: React.FC<DatePickerModalProps> = props => {
  return (
    <View style={{display: 'flex', alignItems: 'center'}}>
      <DatePicker
        mode="date"
        date={props.date}
        androidVariant="nativeAndroid"
        onDateChange={props.onDatePicked}
        maximumDate={new Date()}
      />
      <View style={{flexDirection: 'row', display: 'flex'}}>
        <FilledButton
          title={props.doneButtonText}
          containerStyle={style.buttonContainerStyle}
          titleStyle={{color: '#FFFFFF'}}
          buttonStyle={style.buttonStyle}
          onPress={() => {
            props.onModalVisibityChanged(false)
          }}
        />
      </View>
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

export default DatePickerModalContent
