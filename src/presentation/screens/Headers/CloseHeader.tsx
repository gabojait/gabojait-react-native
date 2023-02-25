import {StackHeaderProps} from '@react-navigation/stack'
import React from 'react'
import CustomHeader from '@/presentation/components/CustomHeader'
import {getHeaderTitle} from '@react-navigation/elements'
import Icon from 'react-native-vector-icons/MaterialIcons'

const Header: React.FC<StackHeaderProps> = ({navigation, route, options, back}) => {
  return <CustomHeader title="" canGoBack={false} rightChildren={<Icon name="close"></Icon>} />
}

export default Header
