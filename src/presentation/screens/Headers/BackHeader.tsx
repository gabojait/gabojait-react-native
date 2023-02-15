import {StackHeaderProps} from '@react-navigation/stack'
import React from 'react'
import CustomHeader from '@/presentation/components/CustomHeader'
import { getHeaderTitle } from '@react-navigation/elements'

const Header: React.FC<StackHeaderProps> = ({navigation, route, options, back}) => {
  const title = getHeaderTitle(options, route.name)
  return (
    <CustomHeader title={title} canGoBack={navigation.canGoBack()}/>
  )
}

export default Header