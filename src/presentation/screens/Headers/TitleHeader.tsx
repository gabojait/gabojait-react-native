import {getHeaderTitle} from '@react-navigation/elements'
import {StackHeaderProps} from '@react-navigation/stack'
import React from 'react'
import CustomHeader from '@/presentation/components/CustomHeader'

const Header: React.FC<StackHeaderProps> = ({navigation, route, options, back}) => {
    const title = getHeaderTitle(options, route.name)
  return (
    <CustomHeader title={title} canGoBack={false} />
  )
}

export default Header