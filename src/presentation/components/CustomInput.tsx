import {theme} from '@/theme'
import {Icon, useTheme} from '@rneui/themed'
import React, {useRef, useState} from 'react'
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native'
import color from '../res/styles/color'
import type {CustomInputProps} from '@/presentation/components/props/StateProps'

export const CustomInput = ({
  size = 'sm',
  placeholder,
  state = 'none',
  ...props
}: CustomInputProps & TextInputProps) => {
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

  return (
    <View
      style={[
        {borderColor: borderColors[state]},
        styles.view,
        props.containerStyle,
        {borderRadius: theme.radius[size]},
      ]}>
      <TextInput
        style={[styles.input, props.style]}
        placeholderTextColor={color.grey}
        placeholder={placeholder}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    padding: 14,
    flex: 1,
  },
  icon: {
    flex: 1,
    justifyContent: 'center',
    paddingEnd: 14,
  },
})
