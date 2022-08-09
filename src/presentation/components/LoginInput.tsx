import React, {useState} from 'react'
import {Icon, Input, Card, Text, createTheme, ThemeProvider, useTheme} from '@rneui/themed'
import {StyleSheet} from 'react-native'
import colors from '../res/styles/color'
import textStyles from '../res/styles/textStyles'
import {InputProps} from '@rneui/base'

interface PartialProps {
  state?: 'success' | 'error' | 'default' //값이 undefined, default일 때 디폴트UI를 나타냄
}
interface loginInputProps extends PartialProps {
  //Input 3종류: 기본형, 아이콘형, 비밀번호형
  iconInput?: boolean
  secureInput?: boolean
}
const LoginInput = ({state, iconInput = false, secureInput = false}: loginInputProps) => {
  return iconInput ? (
    <IconInput state={state} />
  ) : secureInput ? (
    <SecureInput state={state} />
  ) : (
    <BasicInput state={state} />
  )
}
const BasicInput = ({state}: PartialProps) => {
  return (
    <ThemeProvider
      theme={state === 'success' ? theme_success : state === 'error' ? theme_error : theme_default}>
      <Input />
    </ThemeProvider>
  )
}
const IconInput = ({state}: PartialProps) => {
  return (
    <ThemeProvider
      theme={state === 'success' ? theme_success : state === 'error' ? theme_error : theme_default}>
      <Input rightIcon={<Icon name="checkmark-circle-outline" type="ionicon" size={18} />} />
    </ThemeProvider>
  )
}
const SecureInput = ({state}: PartialProps) => {
  const [secure, setSecure] = useState(true)
  return (
    <ThemeProvider
      theme={state === 'success' ? theme_success : state === 'error' ? theme_error : theme_default}>
      <Input
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
      />
    </ThemeProvider>
  )
}

const theme_success = createTheme({
  components: {
    Input: {
      inputContainerStyle: {
        borderBottomColor: colors.primary,
        borderBottomWidth: 2,
      },
    },
    Icon: {
      color: colors.primary,
    },
  },
})
const theme_error = createTheme({
  components: {
    Input: {
      inputContainerStyle: {
        borderBottomColor: colors.error,
        borderBottomWidth: 2,
      },
    },
    Icon: {
      color: colors.white,
    },
  },
})
const theme_default = createTheme({
  components: {
    Input: {
      inputContainerStyle: {
        borderBottomColor: colors.disable,
        borderBottomWidth: 2,
      },
    },
    Icon: {
      color: colors.disable,
    },
  },
})
export default LoginInput
