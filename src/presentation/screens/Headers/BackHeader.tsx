import {StackHeaderProps} from '@react-navigation/stack'
import React from 'react'
import CustomHeader from '@/presentation/components/CustomHeader'

const Header: React.FC<StackHeaderProps> = ({navigation, route, options, back}) => {
  return (
    <CustomHeader title='' canGoBack={navigation.canGoBack()}/>
  )
}

export default Header