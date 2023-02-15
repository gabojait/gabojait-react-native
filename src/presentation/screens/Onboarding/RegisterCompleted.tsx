import {FilledButton} from '@/presentation/components/Button'
import globalStyles from '@/styles'
import {Text} from '@rneui/themed'
import React from 'react'
import {View} from 'react-native'

const RegisterCompleted = () => {
  return (
    <View style={[globalStyles.centeredView, {margin: 0}]}>
      <Text>🎉</Text>
      <Text>환영합니다!</Text>
      <Text>함께 팀매칭 하러 가보자잇!</Text>
      <FilledButton title="시작하기" />
    </View>
  )
}

export default RegisterCompleted
