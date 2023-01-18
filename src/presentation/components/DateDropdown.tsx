import React, {useState} from 'react'
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native'
import DatePicker from 'react-native-date-picker'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import colors from '@/presentation/res/styles/color'
import textStyles from '@/presentation/res/styles/textStyles'

interface DateDropdownProps{
  title:string
}

export const DateDropdown =  (({title}:DateDropdownProps) => {
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [confirm, setConfirm] = useState(false)

  return (
    <View
      style={[styles.container, {borderColor: confirm == true ? colors.primary : colors.disable}]}>
      <TouchableOpacity style={styles.touchableSpace} onPress={() => setOpen(true)}>
        <Text
          style={[
            {color: confirm == true ? colors.black : colors.disable},
            textStyles.size4,
            textStyles.weight2,
          ]}>
          {confirm == true
            ? `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`
            : title}
        </Text>
        <DatePicker
          modal
          mode="date"
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false)
            setDate(date)
            setConfirm(true)
          }}
          onCancel={() => {
            setOpen(false)
            setConfirm(false)
          }}
          title={title}
        />
      </TouchableOpacity>
      <FontAwesomeIcon
        color={confirm == true ? colors.white : colors.disable}
        name="angle-down"
        size={25}
        onPress={() => setOpen(true)}
      />
    </View>
  )
})
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 2,
    flexDirection: 'row',
    padding: 0,
    height: 50,
  },
  touchableSpace: {
    width: '93%',
    height: '100%',
    justifyContent: 'center',
    paddingStart: 8,
  },
})
