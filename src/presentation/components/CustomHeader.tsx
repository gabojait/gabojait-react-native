import HeaderProps from '@/presentation/components/props/HeaderProps'
import {Text} from '@rneui/themed'
import Icon from 'react-native-vector-icons/FontAwesome'
import React from 'react'
import {StyleProp, View, ViewStyle} from 'react-native'
import {useNavigation} from '@react-navigation/native'
const CustomHeader: React.FC<HeaderProps> = ({title, canGoBack, leftChildren, rightChildren}) => {
  const navigation = useNavigation()
  const back = canGoBack ? (
    <Icon
      name="angle-left"
      size={30}
      onPress={() => {
        if (navigation.canGoBack()) navigation.goBack()
      }}
      style={{
        marginRight: 10,
      }}
    />
  ) : null
  return (
    <View style={headerStyle}>
      <View>
        {back}
        {leftChildren}
        <Text h4>{title}</Text>
      </View>
      {rightChildren}
    </View>
  )
}

const headerStyle: StyleProp<ViewStyle> = {
  flexDirection: 'row',
  padding: 20,
  backgroundColor: 'white',
  alignItems: 'center',
  justifyContent: 'space-between',
}

export default CustomHeader
