import {StackHeaderProps} from '@react-navigation/stack'
import React from 'react'
import { getHeaderTitle } from '@react-navigation/elements'
import TitleCenterHeader from '@/presentation/components/TitleCenterHeader'

const TitleWithCloseHeader: React.FC<StackHeaderProps> = ({navigation, route, options, back}) => {
  const title = getHeaderTitle(options, route.name)
  return (
    <TitleCenterHeader title={title} canGoBack={navigation.canGoBack()} />
  )
}

export default TitleWithCloseHeader