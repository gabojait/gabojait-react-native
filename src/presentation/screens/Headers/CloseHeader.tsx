import {StackHeaderProps} from '@react-navigation/stack'
import React from 'react'
import CustomHeader from '@/presentation/components/CustomHeader'
import {getHeaderTitle} from '@react-navigation/elements'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {View} from 'react-native'

const Header: React.FC<StackHeaderProps> = ({navigation, route, options, back}) => {
  return (
    <View style={{alignItems: 'flex-end', padding: 20}}>
      <Icon
        name="close"
        size={25}
        onPress={() => (navigation.canGoBack() ? navigation.goBack() : null)}></Icon>
    </View>
  )
}

export default Header
