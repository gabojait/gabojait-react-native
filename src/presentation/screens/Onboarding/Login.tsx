import { StackScreenProps } from '@react-navigation/stack'
import { FilledButton } from '@/presentation/components/Button'
import { Text } from '@rneui/themed'
import React from 'react'
import { View } from 'react-native'
import { OnboardingStackParamList, RootStackParamList } from '@/presentation/navigation/types'

export type OnboardingProps = StackScreenProps<OnboardingStackParamList, 'Login'>

const Login = ({navigation}:OnboardingProps ) => <View>
    <Text>This is Login Screen</Text>
    <FilledButton title="로그인" onPress={() => navigation.popToTop}/> 
    <FilledButton title="아이디 찾기/ 비밀번호 찾기" onPress={() => navigation.navigate('FindAccount')}/>
    <FilledButton title="회원가입" onPress={() => navigation.navigate('Register')}/>
</View>

export default Login