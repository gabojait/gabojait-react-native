import {theme} from '@/theme'
import {Icon, Input} from '@rneui/themed'
import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react'
import {StyleSheet, Text, TextInputProps, View} from 'react-native'
import color from '../res/styles/color'
import type {CustomInputProps} from '@/presentation/components/props/StateProps'
import textStyles from '../res/styles/textStyles'
export type RegisterInput = typeof RegisterInput

export const RegisterInput = forwardRef(
  (
    {
      size = 'sm',
      label,
      placeholder,
      isForPassword = false,
      state = 'none',
      ...props
    }: CustomInputProps & TextInputProps,
    ref,
  ) => {
    function isValid() {}
    const [secure, setSecure] = useState(true)

    const iconColors = {
      none: color.transparent,
      valid: color.primary,
      invalid: color.transparent,
    }
    const borderColors = {
      none: color.lightGrey,
      valid: color.primary,
      invalid: color.error,
    }

    return (
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <Input
          containerStyle={{height: '70%', paddingHorizontal: 0}}
          inputContainerStyle={{
            borderBottomWidth: 1.3,
            borderBottomColor: borderColors[state],
            height: '60%',
            marginEnd: 10,
          }}
          style={[styles.input, props.style]}
          placeholderTextColor={color.grey}
          placeholder={placeholder}
          rightIcon={
            isForPassword ? (
              <Icon
                name={secure ? 'eye-off-outline' : 'eye-outline'}
                onPress={() => {
                  secure ? setSecure(false) : setSecure(true)
                  console.log(secure)
                }}
                type="ionicon"
                color={color.darkGrey}
              />
            ) : (
              <Icon
                name="checkmark-circle-outline"
                type="ionicon"
                size={18}
                color={iconColors[state]}
              />
            )
          }
          secureTextEntry={isForPassword ? secure : false}
          label={label}
          labelStyle={styles.label}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          {...props}
        />
      </View>
    )
  },
)
const styles = StyleSheet.create({
  input: {
    flex: 10,
    fontSize: 14,
  },
  icon: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  label: {
    fontSize: 14,
    color: color.grey2,
  },
})
