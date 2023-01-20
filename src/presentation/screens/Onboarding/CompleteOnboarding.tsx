import { Text } from '@rneui/themed'
import React from 'react'
import { View } from 'react-native'
import { FilledButton } from '@/presentation/components/Button'
import { StackScreenProps,StackNavigationProp } from '@react-navigation/stack'
import { OnboardingStackParamList, RootStackParamList } from '@/presentation/navigation/types'
import { CompositeNavigationProp, CompositeScreenProps } from '@react-navigation/native'
import { RootStackNavigationProps } from '@/presentation/navigation/RootNavigation'

export type OnboardingProps = StackScreenProps<OnboardingStackParamList, 'CompleteOnboarding'>

const CompleteOnboarding = ({navigation, route}:OnboardingProps) => {
    return(
        <View>
            <Text>환영합니다 회원가입을 축하합니다</Text>
            <FilledButton title="시작하기" onPress={() => navigation.navigate('Login')}/>
        </View>
    )
}

export default CompleteOnboarding