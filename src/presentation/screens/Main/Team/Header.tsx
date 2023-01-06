import {getHeaderTitle} from '@react-navigation/elements'
import {StackHeaderProps} from '@react-navigation/stack'
import React from 'react'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { OutlinedButton } from '@/presentation/components/Button'
import CustomHeader from '@/presentation/components/CustomHeader'

const Header: React.FC<StackHeaderProps> = ({navigation, route, options, back}) => {
  const title = getHeaderTitle(options, route.name)
  return (
    <CustomHeader title={title} canGoBack={navigation.canGoBack()}   />
  )
}

export default Header
