import {getHeaderTitle} from '@react-navigation/elements'
import {StackHeaderProps} from '@react-navigation/stack'
import React from 'react'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { OutlinedButton } from '../../components/Button'
import CustomHeader from '../../components/CustomHeader'

const Header: React.FC<StackHeaderProps> = ({navigation, route, options, back}) => {
  const title = getHeaderTitle(options, route.name)
  const rightChildren = (
    <View style={{flexDirection:'row', alignItems:'center',  }}>
      <Icon name="bell" size={25} style={{
        marginRight: 8
      }} />
      <OutlinedButton title="팀원찾기" size="xs" />
    </View>
  )

  return (
    <CustomHeader title={title} canGoBack={navigation.canGoBack()} rightChildren={rightChildren} />
  )
}

export default Header
