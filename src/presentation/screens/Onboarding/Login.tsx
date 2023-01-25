import {StackScreenProps} from '@react-navigation/stack'
import {FilledButton} from '@/presentation/components/Button'
import {Image, Text, useTheme} from '@rneui/themed'
import React, {useRef, useState} from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {OnboardingStackParamList, RootStackParamList} from '@/presentation/navigation/types'
import color from '@/presentation/res/styles/color'
import {CustomInput} from '@/presentation/components/CustomInput'
import Gabojait from '@/presentation/components/icon/Gabojait'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '@/redux/reducers'
import {LoginRequestDTO} from '@/redux/action/login'
import {login} from '@/redux/reducers/loginReducer'
import Heart_circled from '@/presentation/components/icon/Heart_circled'

export type OnboardingProps = StackScreenProps<OnboardingStackParamList, 'Login'>

const Login = ({navigation}: OnboardingProps) => {
  const [loginState, setLoginState] = useState({username: '', password: ''} as LoginRequestDTO)
  const dispatch = useDispatch()
  const {data, loading, error} = useSelector((state: RootState) => state.loginReducer.loginResult)

  return (
    <View style={styles.entireView}>
      <View style={{flex: 0.3}} />
      <View style={styles.logoView}>
        <Gabojait name="gabojait" color={color.primary} size={35} />
        <Heart_circled name="heart_circled" color={color.primary} size={35} />
      </View>
      <View style={styles.inputView}>
        <CustomInput
          style={styles.input}
          placeholder={'아이디'}
          inputChange={(text: string) =>
            setLoginState(prevState => ({...prevState, username: text}))
          }
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
        />
        <CustomInput
          style={styles.input}
          placeholder={'비밀번호'}
          inputChange={(text: string) =>
            setLoginState(prevState => ({...prevState, password: text}))
          }
          secureTextEntry={true}
        />
        <Text>{data?.birthdate}</Text>
      </View>
      <FilledButton
        size="sm"
        title="로그인"
        onPress={() => {
          console.log(loginState.username, loginState.password)
          login({username: loginState.username, password: loginState.password})(dispatch)
          navigation.popToTop
        }}
      />
      <View style={styles.linkTextView}>
        <TouchableOpacity onPress={() => navigation.navigate('FindAccount')}>
          <Text style={styles.text}>아이디 찾기/ 비밀번호 찾기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.resgisterTouchableOpacity}
          onPress={() => navigation.navigate('Register')}>
          <Text style={styles.text}>아직 가보자잇에 가입하지 않으셨나요?</Text>
          <Text style={styles.highlightText}> 회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  logoView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputView: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  input: {
    flex: 0.25,
  },
  linkTextView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 11,
  },
  entireView: {
    justifyContent: 'center',
    flex: 4,
    backgroundColor: color.white,
  },
  resgisterTouchableOpacity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  highlightText: {
    color: color.primary,
  },
  text: {
    color: color.grey,
  },
})
export default Login
