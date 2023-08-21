import React from 'react'
import {Icon,Card, Text} from '@rneui/themed'
import colors from '../res/styles/color'
import textstyles from '../res/styles/textStyles'

interface MenuCardProps {
  placeholderText?: string
  title?: string
  iconName: string
  style?:any
}

const MenuCard = ({title, iconName, style}: MenuCardProps) => {
  return (
    <Card containerStyle={[{
      alignItems: 'center',
        backgroundColor:colors.transparent,
        borderColor:colors.transparent,
        shadowColor:colors.transparent,
        flex:1,
        justifyContent: 'center',
        marginHorizontal: 4,
        marginVertical: 8,
    }, style]}>
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