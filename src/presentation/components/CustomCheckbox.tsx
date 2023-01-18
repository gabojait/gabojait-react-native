
import { makeStyles } from '@rneui/base'
import { CheckBox } from '@rneui/themed'
import React, {useState} from 'react'
import color from '../res/styles/color'

export const CustomCheckBox =  ({}) => {
    const [checked, setChecked] = React.useState(false)
    const toggleCheckbox = () => setChecked(!checked);
    const styles = useStyles(checked)

    return(
        <CheckBox
        style={styles.input}
        iconType="material-community"
           checkedIcon="checkbox-marked"
           uncheckedIcon="checkbox-blank-outline"
           checkedColor={color.primary}
        checked={checked}
        onPress={toggleCheckbox}/>
    )
}

const useStyles = makeStyles((checked:Boolean) => {
  
    return {
      input:{
        borderBottomWidth: 2,
        
      }
    }
  })