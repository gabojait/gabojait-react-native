import HeaderProps from '@/presentation/components/props/HeaderProps'
import {Text, useTheme} from '@rneui/themed'
import Icon from 'react-native-vector-icons/FontAwesome'
import React from 'react'
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native'
import {useNavigation} from '@react-navigation/native'
const CustomHeader: React.FC<HeaderProps> = ({
  title,
  canGoBack,
  leftChildren,
  rightChildren,
  align,
}) => {
  const navigation = useNavigation()
  const {theme} = useTheme()
  const back = (
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
  )
  return (
    <View style={headerStyle.parent}>
      <View style={headerStyle.left}>
        {canGoBack ? back : null}
        {leftChildren}
        <Text h4>{title}</Text>
      </View>
      {rightChildren}
    </View>
  )
}

const headerGlobalStyle: StyleProp<ViewStyle> = {
  flexDirection: 'row',
  alignItems: 'center',
}

// card base components, width /radius 다름, theme에서 하나만

const headerStyle = StyleSheet.create({
  parent: {
    ...headerGlobalStyle,
    paddingHorizontal: 20,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  left: headerGlobalStyle,
})

export default CustomHeader
