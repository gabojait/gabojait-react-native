import {StackScreenProps} from '@react-navigation/stack'
import {FilledButton} from '@/presentation/components/Button'
import {Text, useTheme} from '@rneui/themed'
import React, {useEffect, useState} from 'react'
import {Touchable, TouchableWithoutFeedback, View} from 'react-native'
import {OnboardingStackParamList, RootStackParamList} from '@/presentation/navigation/types'
import {loginAsyncAction, LoginRequestDTO} from '@/redux/action/login'
import {Input} from '@rneui/themed'
import ExtendedText from '@/presentation/components/CenteredText'
import CenteredText from '@/presentation/components/CenteredText'
import styles from '@/styles'
import {makeStyles} from '@rneui/themed'
import {login} from '@/redux/reducers/loginReducer'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '@/redux/reducers'

export type OnboardingProps = StackScreenProps<OnboardingStackParamList, 'Login'>

const Login = ({navigation}: OnboardingProps) => {
  const [loginState, setLoginState] = useState({username: '', password: ''} as LoginRequestDTO)
  const {theme} = useTheme()
  const dispatch = useDispatch()
  const {data, loading, error} = useSelector((state: RootState) => state.loginReducer.loginResult)
  useEffect(() => {
    console.log(data, loading, error)
  }, [data, loading, error])
  return (
    <View
      style={[
        {
          flex: 1,
          display: 'flex',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        },
        styles.container,
      ]}>
      <View>
        <Text></Text>
        <Input
          autoCorrect={false}
          autoComplete="off"
          placeholder="아이디를 입력하세요"
          autoCapitalize={'none'}
          value={loginState.username}
          onChangeText={value => setLoginState(prevState => ({...prevState, username: value}))}
        />
        <Input
          secureTextEntry
          placeholder="비밀번호를 입력하세요"
          value={loginState.password}
          onChangeText={value => setLoginState(prevState => ({...prevState, password: value}))}
        />
        <FilledButton
          title="로그인"
          onPress={() => login({username: '', password: ''})(dispatch)}
        />
        <TouchableWithoutFeedback onPress={() => navigation.navigate('FindAccount')}>
          <Text style={[{color: theme.colors.grey1}, styles.centerText]}>
            아이디 / 비밀번호 찾기
          </Text>
        </TouchableWithoutFeedback>
      </View>
      <Text style={[styles.centerText, {margin: 30}]}>
        <Text style={{color: theme.colors.grey1}}>아직 가보자잇에 가입하지 않으셨나요? </Text>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Register')}>
          <Text>회원가입</Text>
        </TouchableWithoutFeedback>
      </Text>
    </View>
  )
}
export default Login

const useStyles = makeStyles(theme => {
  const stateColors = {
    default: theme.colors.white,
    error: theme.colors.error,
    success: theme.colors.success,
  }

  return {}
})
