import {FilledButton} from '@/presentation/components/Button'
import {
  MainStackParamList,
  OnboardingScreenProps,
  OnboardingStackParamList,
  RootStackParamList,
} from '@/presentation/navigation/types'
import globalStyles from '@/styles'
import {useNavigation} from '@react-navigation/native'
import {StackScreenProps} from '@react-navigation/stack/lib/typescript/src/types'
import {Text, useTheme} from '@rneui/themed'
import React from 'react'
import {View} from 'react-native'

const RegisterCompleted = ({navigation}: OnboardingScreenProps<'RegisterCompleted'>) => {
  const {theme} = useTheme()

  return (
    <View style={[globalStyles.centeredView, {padding: 20, alignItems: 'stretch'}]}>
      <Text style={{fontSize: theme.emojiSize.lg, textAlign: 'center', paddingBottom: 50}}>🎉</Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: theme.fontSize.lg,
          fontWeight: theme.fontWeight.semibold,
          marginBottom: 14,
        }}>
        환영합니다!
      </Text>
      <Text style={{fontSize: theme.fontSize.md, textAlign: 'center', marginBottom: 93}}>
        함께 팀매칭 하러 가보자잇!
      </Text>
      <FilledButton
        title="시작하기"
        onPress={() =>
          navigation.getParent()?.navigate('MainBottomTabNavigation', {screen: 'Home'})
        }
      />
    </View>
  )
}

export default RegisterCompleted
