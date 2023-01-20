
import { CheckBoxProps, makeStyles } from '@rneui/base'
import { CheckBox } from '@rneui/themed'
import React, {useState} from 'react'
import { StyleSheet } from 'react-native'
import color from '../res/styles/color'

export const CustomCheckBox:React.FC<CheckBoxProps> =  ({...props}) => {
    const [checked, setChecked] = React.useState(false)
    const toggleCheckbox = () => setChecked(!checked);
    return(
        <CheckBox
        {...props}
        style={styles.checkBox}
        iconType="material-community"
           checkedIcon="checkbox-marked"
           uncheckedIcon="checkbox-blank-outline"
           checkedColor={color.primary}
        checked={checked}
        onPress={toggleCheckbox}
        disabledStyle={styles.checkBox}/>
    )
}

const styles = StyleSheet.create({
  checkBox:{
    borderBottomWidth: 2,
    width: 10,
    height: 10,
    borderColor: color.grey
  },
  disabled:{
    borderColor: color.disable
  }
})