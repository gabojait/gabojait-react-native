import {FilledButton} from '@/presentation/components/Button'
import CustomInput from '@/presentation/components/CustomInput'
import {MainStackScreenProps} from '@/presentation/navigation/types'
import useGlobalStyles from '@/presentation/styles'
import {useTheme} from '@rneui/themed'
import React from 'react'
import {Text, View} from 'react-native'

export const TeamComplete = ({navigation}: MainStackScreenProps<'TeamComplete'>) => {
  const globalStyles = useGlobalStyles()
  const {theme} = useTheme()

  return (
    <View style={[globalStyles.container]}>
      <Text
        style={{
          fontWeight: theme.fontWeight.semibold,
          fontSize: 15,
          color: 'black',
          textAlign: 'center',
          paddingBottom: 20,
        }}>
        {'프로젝트 링크를 남겨주세요:)'}
      </Text>
      <CustomInput
        placeholder={'깃허브, XD, 앱스토어, 피그마 등'}
        onChangeText={(text: string) => {}}
        shape="round"
      />
      <FilledButton
        onPress={() => navigation.navigate('CompleteSuccess')}
        title={'제출하기'}
        containerStyle={{paddingTop: 10}}
      />
    </View>
  )
}
