import Gabojait from '@/presentation/components/icon/Gabojait'
import {MainStackScreenProps} from '@/presentation/navigation/types'
import {useNavigation} from '@react-navigation/native'
import {useTheme} from '@rneui/themed'
import React from 'react'
import {Text, TouchableOpacity, View} from 'react-native'

const MenuItem = ({title, text, onClick}: {title: string; text?: string; onClick?: () => void}) => {
  const {theme} = useTheme()
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 25,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: theme.colors.disabled,
      }}>
      <Text
        style={{
          fontSize: theme.fontSize.md,
          fontWeight: theme.fontWeight.semibold,
          color: 'black',
          textAlignVertical: 'center',
        }}>
        {title}
      </Text>
      {text && !onClick ? (
        <Text>{text}</Text>
      ) : (
        <Gabojait name="arrow-next" size={30} color={theme.colors.primary} />
      )}
    </TouchableOpacity>
  )
}

const Setting = ({navigation}: MainStackScreenProps<'Setting'>) => {
  const {theme} = useTheme()

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <MenuItem title="회원 정보 수정" onClick={() => navigation.navigate('UserModifier')} />
      <MenuItem title="알림 설정" onClick={() => navigation.navigate('AlarmSetting')} />
      <MenuItem title="기타" onClick={() => navigation.navigate('Etc')} />
      <MenuItem title="버전" text="1.0.0." />
    </View>
  )
}

export default Setting
