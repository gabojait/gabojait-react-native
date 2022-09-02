import {getHeaderTitle} from '@react-navigation/elements'
import {StackHeaderProps} from '@react-navigation/stack'
import {Text} from '@rneui/base'
import React from 'react'
import {View} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { OutlinedButton } from '../Button'
import CustomHeader from '../CustomHeader'

const Header: React.FC<StackHeaderProps> = ({navigation, route, options, back}) => {
  const title = getHeaderTitle(options, route.name)
  const rightChildren = (
    <View style={{flexDirection:'row', alignItems:'center'}}>
      <Icon name="bell" size={30} />
      <OutlinedButton title="팀원찾기" size="sm" />
    </View>
  )

  return (
    <CustomHeader title={title} canGoBack={navigation.canGoBack()} rightChildren={rightChildren} />
  )
}

export default Header
