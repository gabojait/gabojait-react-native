import React, {useState} from 'react'
import {Icon, Input} from '@rneui/themed'
import colors from '../res/styles/color'
import {InputProps} from '@rneui/base'

const successColor= {borderBottomColor: colors.primary}
const errorColor= {borderBottomColor: colors.error}
const defaultColor= {borderBottomColor: colors.lightGrey}
const borderBottomWidth = {borderBottomWidth: 2}

 

let inputType:InputTypeProps

interface InputTypeProps{
    value?: 'AccordanceCheck'
  }

export const PasswordInput = ({inputType}:any, props:JSX.IntrinsicAttributes & InputProps) => {
  const [secure, setSecure] = useState(true)
  const [isAvailableValue, setIsAvailableValue] = useState<boolean>(true)
  const [isExistedError, setIsExistedError] = useState<boolean>(false)
  return (
    <Input
      {...isAvailableValue? {inputContainerStyle:[successColor,borderBottomWidth]}: {inputContainerStyle:[errorColor,borderBottomWidth]}}
      inputContainerStyle={[defaultColor,borderBottomWidth]}
      secureTextEntry={secure}
      rightIcon={
        <Icon
          name={secure ? 'eye-off-outline' : 'eye-outline'}
          onPress={() => {
            secure ? setSecure(false) : setSecure(true)
            console.log(secure)
          }}
          type="ionicon"
          color={colors.barIcon}
        />
      }
      renderErrorMessage={isExistedError}
    />
  )
}