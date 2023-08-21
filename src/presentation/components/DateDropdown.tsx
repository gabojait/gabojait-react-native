import React, {useState} from 'react'
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native'
import DatePicker from 'react-native-date-picker'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import colors from '@/presentation/res/styles/color'
import textStyles from '@/presentation/res/styles/textStyles'

interface DateDropdownProps{
  inputChange?:any
  label:string
}

export const DateDropdown =  (({inputChange, label}:DateDropdownProps) => {
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [title, setTitle] = useState(label)

  function updateDate(date:Date):string{
    let yy = date.getFullYear().toString()
    let mm = date.getMonth()+1 < 10? '0'+ (date.getMonth()+1).toString() : (date.getMonth()+1).toString()
    let dd = date.getDate()+1 < 10? '0'+ (date.getDate()).toString() : (date.getDate()).toString()
    let text = `${yy}-${mm}-${dd}`
    inputChange(text)
    return text
  }
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
            {title}
        </Text>
        <DatePicker
          modal
          mode="date"
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false)
            let text= updateDate(date)
            setTitle(text)
            setConfirm(true)
          }}
          onCancel={() => {
            setOpen(false)
            setConfirm(false)
          }}
          title={label}
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
    borderRadius: 4,
    borderWidth: 1.3,
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
