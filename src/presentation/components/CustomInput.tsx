import {theme} from '@/theme'
import {Icon, useTheme} from '@rneui/themed'
import React, {useRef, useState} from 'react'
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native'
import color from '../res/styles/color'
import type {CustomInputProps} from '@/presentation/components/props/StateProps'
export const CustomInput = ({
  inputChange,
  size = 'sm',
  placeholder,
  state = 'none',
  ...props
}: CustomInputProps & TextInputProps) => {
  const valueRef = useRef('')
  const {theme} = useTheme()
  const iconColors = {
    none: color.transparent,
    valid: color.primary,
    invalid: color.transparent,
  }
  const borderColors = {
    none: color.grey,
    valid: color.primary,
    invalid: color.error,
  }
  function updateText(text: string) {
    valueRef.current = text
    inputChange(text)
  }

  return (
    <View
      style={[
        {borderColor: borderColors[state]},
        styles.view,
        props.style,
        {borderRadius: theme.radius[size]},
      ]}>
      <TextInput
        style={[styles.input]}
        placeholderTextColor={color.grey}
        placeholder={placeholder}
        onChangeText={text => updateText(text)}
        {...props}
      />
      <Icon
        style={styles.icon}
        name="checkmark-circle-outline"
        type="ionicon"
        size={18}
        color={iconColors[state]}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  view: {
    borderWidth: 1.3,
    flex: 1,
    flexDirection: 'row',
  },
  input: {
    paddingLeft: 14,
    flex: 10,
  },
  icon: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
})
