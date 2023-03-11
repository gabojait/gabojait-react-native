import {FilledButton} from '@/presentation/components/Button'
import CustomInput from '@/presentation/components/CustomInput'
import {CustomSwitch} from '@/presentation/components/CustomSwitch'
import {MainStackScreenProps} from '@/presentation/navigation/types'
import {nicknameRegex, passwordRegex} from '@/util'
import {useTheme} from '@rneui/themed'
import React, {useState} from 'react'
import {Text, View} from 'react-native'

const UserModifier = ({navigation}: MainStackScreenProps<'UserModifier'>) => {
  const {theme} = useTheme()

  const [nickname, setNickname] = useState('')
  const [passwords, setPasswords] = useState<string[]>([])

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Text>닉네임 변경</Text>
      <CustomInput value={nickname} onChangeText={value => setNickname(value)} />
      <FilledButton title="중복확인" disabled={!nicknameRegex.test(nickname)} />
      <Text>비밀번호 변경</Text>
      <CustomInput
        secureTextEntry
        value={passwords[0]}
        onChangeText={value => setPasswords(prevState => [value, prevState[1]])}
      />
      <CustomInput
        secureTextEntry
        value={passwords[1]}
        onChangeText={value => setPasswords(prevState => [prevState[0], value])}
      />
      <FilledButton
        title="완료"
        disabled={
          !(passwords[0] == passwords[1]) ||
          !passwordRegex.test(passwords[0]) ||
          !passwordRegex.test(passwords[1])
        }
      />
    </View>
  )
}

export default UserModifier
