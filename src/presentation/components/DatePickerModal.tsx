import globalStyles from '@/styles'
import {Button, Text} from '@rneui/themed'
import {Alert, Modal, StyleSheet, View} from 'react-native'
import DatePicker from 'react-native-date-picker'
import {FilledButton} from './Button'
import React from 'react'

interface DatePickerModalProps {
  title: string
  doneButtonText: string
  modalVisible: boolean
  onModalVisibityChanged: (visibility: boolean) => void
  date: Date
  onDatePicked: (date: Date) => void
}

const DatePickerModal: React.FC<DatePickerModalProps> = props => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.')
        props.onModalVisibityChanged(!props.modalVisible)
      }}>
      <View style={globalStyles.centeredView}>
        <View style={globalStyles.modal}>
          <Text h4 h4Style={{fontSize: 20, fontWeight: '600'}}>
            {props.title}
          </Text>
          <DatePicker
            mode="date"
            date={props.date}
            androidVariant="nativeAndroid"
            onDateChange={props.onDatePicked}
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

export default DatePickerModal
