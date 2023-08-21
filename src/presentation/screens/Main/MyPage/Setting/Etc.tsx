import {CustomSwitch} from '@/presentation/components/CustomSwitch'
import {MainStackScreenProps} from '@/presentation/navigation/types'
import {useTheme} from '@rneui/themed'
import React from 'react'
import {Text, TouchableOpacity, View} from 'react-native'

const Etc = ({navigation}: MainStackScreenProps<'Etc'>) => {
  const {theme} = useTheme()

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('OpenSourcePage')
        }}>
        <View
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
            오픈소스
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default Etc
