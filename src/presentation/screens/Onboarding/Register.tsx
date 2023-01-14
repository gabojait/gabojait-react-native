import { Text } from '@rneui/themed'
import React from 'react'
import { View } from 'react-native'
import { FilledButton } from '@/presentation/components/Button'
import { OnboardingStackParamList, RootStackParamList } from '@/presentation/navigation/types'
import { StackScreenProps } from '@react-navigation/stack'

export type RegisterProps = StackScreenProps<OnboardingStackParamList,'Register'>

const Register = ({navigation, route}:RegisterProps) => <View>
    <Text>회원가입 화면입니다</Text>
    <FilledButton title="가입하기" onPress={() => navigation.navigate('CompleteOnboarding')}/>
</View>

export default Register