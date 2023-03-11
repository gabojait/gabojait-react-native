import HeaderProps from '@/presentation/components/props/HeaderProps'
import {Text, useTheme} from '@rneui/themed'
import Icon from 'react-native-vector-icons/FontAwesome'
import React from 'react'
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import color from '../res/styles/color'
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
  const Title = (
    <Text
      style={{
        fontWeight: theme.fontWeight.semibold,
        fontSize: theme.fontSize.lg,
        textAlign: 'center',
      }}>
      {title}
    </Text>
  )
  return (
    <View style={[headerStyle.parent, {borderColor: theme.colors.disabled}]}>
      <View style={headerStyle.left}>
        {canGoBack ? back : null}
        {leftChildren}
        {align == 'left' || !align ? Title : null}
      </View>
      {align == 'center' ? Title : null}
      {rightChildren}
    </View>
  )
}

const headerGlobalStyle: StyleProp<ViewStyle> = {
  flexDirection: 'row',
  alignItems: 'flex-end',
  paddingTop: 5,
}

// card base components, width /radius 다름, theme에서 하나만

const headerStyle = StyleSheet.create({
  parent: {
    ...headerGlobalStyle,
    paddingHorizontal: 20,
    paddingBottom: 5,
    borderBottomWidth: 0.8,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  left: headerGlobalStyle,
})

export default CustomHeader
