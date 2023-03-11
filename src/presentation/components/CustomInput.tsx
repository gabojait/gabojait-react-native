import {Icon, Input, makeStyles} from '@rneui/themed'
import React, {forwardRef, useState} from 'react'
import {View} from 'react-native'
import color from '../res/styles/color'
import type {CustomInputProps} from '@/presentation/components/props/StateProps'

const CustomInput = forwardRef(
  (
    {size = 'sm', shape = 'underline', placeholder, state = 'none', ...props}: CustomInputProps,
    ref,
  ) => {
    const [secure, setSecure] = useState(true)
    const styles = useStyles()
    const iconColors = {
      none: color.transparent,
      valid: color.primary,
      invalid: color.transparent,
    }

    const inputIcon = props.secureTextEntry ? (
      <Icon
        name={secure ? 'eye-off-outline' : 'eye-outline'}
        onPress={() => {
          setSecure(prevState => !prevState)
        }}
        type="ionicon"
        color={color.darkGrey}
      />
    ) : (
      <Icon name="checkmark-circle-outline" type="ionicon" size={18} color={iconColors[state]} />
    )

    return (
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <Input
          {...props}
          containerStyle={[styles.container, props.containerStyle]}
          inputContainerStyle={
            shape == 'underline' ? styles.underlineInputContainer : styles.roundInputContainer
          }
          style={[shape == 'underline' ? styles.underlineInput : styles.roundInput, props.style]}
          placeholderTextColor={color.grey}
          placeholder={placeholder}
          rightIcon={inputIcon}
          secureTextEntry={props.secureTextEntry ? secure : false}
          labelStyle={styles.label}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
        />
      </View>
    )
  },
)

export default CustomInput

const useStyles = makeStyles((theme, props: CustomInputProps) => {
  const borderColors = {
    none: color.lightGrey,
    valid: color.primary,
    invalid: color.error,
  }

  return {
    roundInputContainer: {
      borderWidth: 1.3,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderColor: borderColors[props.state ?? 'none'],
      borderRadius: theme.radius[props.size ?? 'sm'],
      paddingEnd: 10,
    },
    roundInput: {
      padding: 14,
      flex: 1,
    },
    container: {height: '70%', paddingHorizontal: 0},
    underlineInputContainer: {
      borderBottomWidth: 1.3,
      borderBottomColor: borderColors[props.state ?? 'none'],
      height: '60%',
      marginEnd: 10,
    },
    underlineInput: {
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
  }
})
