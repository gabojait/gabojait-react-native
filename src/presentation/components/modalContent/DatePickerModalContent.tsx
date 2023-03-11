import globalStyles from '@/styles'
import {Button, CheckBox, Text, useTheme} from '@rneui/themed'
import {Alert, Modal, StyleSheet, View} from 'react-native'
import DatePicker from 'react-native-date-picker'
import {FilledButton} from '../Button'
import React from 'react'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

interface DatePickerModalProps {
  doneButtonText: string
  onModalVisibityChanged: (visibility: boolean) => void
  date: Date
  onDatePicked: (date: Date) => void
  isCurrent?: boolean
  setIsCurrent?: (isCurrent: boolean) => void
  isCurrentCheckable?: boolean
}

const DatePickerModalContent: React.FC<DatePickerModalProps> = ({
  isCurrent = false,
  setIsCurrent,
  isCurrentCheckable = false,
  ...props
}) => {
  const {theme} = useTheme()
  return (
    <View style={{display: 'flex', alignItems: 'center'}}>
      <DatePicker
        mode="date"
        date={props.date}
        androidVariant="nativeAndroid"
        onDateChange={props.onDatePicked}
        maximumDate={new Date()}
      />
      {isCurrentCheckable ? (
        <CheckBox
          checked={isCurrent}
          onPress={() => setIsCurrent!(!isCurrent)}
          checkedIcon={<MaterialIcon name="check-box" size={18} color={theme.colors.primary} />}
          uncheckedIcon={
            <MaterialIcon name="check-box-outline-blank" size={18} color={theme.colors.grey2} />
          }
          title="현재 진행중입니다"
        />
      ) : null}
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
