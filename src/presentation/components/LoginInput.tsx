import React, {useState} from 'react'
import {Icon, Input, Card, Text, createTheme, ThemeProvider, useTheme} from '@rneui/themed'
import colors from '@/presentation/res/styles/color'

interface PartialProps {
  state?: 'success' | 'error' | 'default' //값이 undefined, default일 때 디폴트UI를 나타냄
  type?: 'id' | 'pw' | 'realname' | 'nickname' //값에 따라 유효성 검사의 기준이 달라짐
}

interface loginInputProps extends PartialProps {
  //Input 3종류: 기본형, 아이콘형, 비밀번호형
  iconInput?: boolean
  secureInput?: boolean
}

/**false는 에러메세지 방출*/
const [id, setId] = useState<boolean>(true)
const [pw, setPw] = useState<boolean>(true)
const [realname, setRealname] = useState<boolean>(true)
const [nickname, setNickname] = useState<boolean>(true)
const [email, setEmail] = useState<boolean>(true)
/**에러 메세지 */
const msgId = '5~15자 영문, 숫자 조합으로 작성하세요'
const msgPw = '10~30자 영문, 숫자 조합으로 작성하세요'
const msgRealname = '2~5자로 작성하세요'
const msgNickname = '2~8자로 작성하세요'
const msgEmail = '이메일 형식을 지켜주세요'

/**아이디 유효성 검사 */
const checkId = (text: any) => {
  //5~15자 영문, 숫자의 조합
  var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{5,15}$/
  if (regExp.test(text)) setId(true)
  else setId(false)
}

/**비밀번호 유효성 검사 */
export const checkPassword = (text: any) => {
  //영문, 숫자 조합 10~30자
  var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{10,30}$/
  if (regExp.test(text)) setPw(true)
  else setPw(false)
}

/**실명 */
export const checkRealName = (text: any) => {
  //2~5자
  var regExp = /^{2,5}$/
  if (regExp.test(text)) setRealname(true)
  else setRealname(false)
}

/**닉네임 */
export const checkNickname = (text: any) => {
  //2~8자
  var regExp = /^{2,5}$/
  if (regExp.test(text)) setNickname(true)
  else setNickname(false)
}
/**이메일 */
export const checkEmail = (text: any) => {
  var regExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (regExp.test(text)) setEmail(true)
  else setEmail(false)
}

/**3가지 타입(기본형, 아이콘형, 비밀번호형) */
const LoginInput = ({state, iconInput = false, secureInput = false, type}: loginInputProps) => {
  return iconInput ? (
    <IconInput state={state} type={type} />
  ) : secureInput ? (
    <SecureInput state={state} type={type} />
  ) : (
    <BasicInput state={state} type={type} />
  )
}

/**기본형*/
const BasicInput = ({state, type}: PartialProps) => {
  return (
    <ThemeProvider
      theme={state === 'success' ? theme_success : 'error' ? theme_error : theme_default}>
      <Input
        onChange={type === 'id' ? checkId : 'realname' ? checkRealName : checkNickname}
        errorMessage={type === 'id' ? msgId : 'realname' ? msgRealname : msgNickname}
      />
    </ThemeProvider>
  )
}

/**아이콘형*/
const IconInput = ({state, type}: PartialProps) => {
  return (
    <ThemeProvider
      theme={state === 'success' ? theme_success : 'error' ? theme_error : theme_default}>
      <Input
        rightIcon={<Icon name="checkmark-circle-outline" type="ionicon" size={18} />}
        onChange={type === 'id' ? checkId : 'realname' ? checkRealName : checkNickname}
        errorMessage={type === 'id' ? msgId : 'realname' ? msgRealname : msgNickname}
      />
    </ThemeProvider>
  )
}

/**비밀번호형(유효성만 검사) */
const SecureInput = ({state, type}: PartialProps) => {
  const [secure, setSecure] = useState(true)
  return (
    <ThemeProvider
      theme={state === 'success' ? theme_success : 'error' ? theme_error : theme_default}>
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
        onChange={checkPassword}
        errorMessage={msgPw}
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
