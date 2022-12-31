import React, {ButtonHTMLAttributes, useState} from 'react'
import {Icon, Input, Card, Text, createTheme, ThemeProvider, useTheme, CardProps, TextProps} from '@rneui/themed'
import {StyleSheet, TextInput, View} from 'react-native'
import textStyles from '../res/styles/textStyles'
import colors from '../res/styles/color'
import textstyles from '../res/styles/textStyles'
import color from '../res/styles/color'

interface MenuCardProps {
  placeholderText?: string
  title?: string
  iconName: string
}

const MenuCard = ({title, iconName}: MenuCardProps) => {
  return (
    <Card containerStyle={{
      alignItems: 'center',
        backgroundColor:colors.white,
        borderColor:colors.transparent,
        shadowColor:colors.transparent,
        flex:1,
        justifyContent: 'center',
        marginHorizontal: 4,
        marginVertical: 8,
    }}>
      <Icon
          name = {iconName}
          type='ionicon' // 프로젝트 전용 커스텀 아이콘이 미완성인 관계로 ionicon으로 임시지정
          size={50}
          style={{alignSelf:'center'}}
      />
      <Text style={{
        alignSelf:'center',
        fontWeight: textstyles.weight3.fontWeight,
        fontFamily: textstyles.weight3.fontFamily,
        fontSize:textstyles.size4.fontSize,}}>{title}</Text>
    </Card>
  )
}
export default MenuCard