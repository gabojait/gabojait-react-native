import { useTheme } from '@rneui/themed'
import React from 'react'
import { PixelRatio, Text, TouchableOpacity, View } from 'react-native'
import CustomIcon from '@/presentation/components/icon/Gabojait'
import { getOwnPropertyDescriptors } from 'immer/dist/internal'

interface FloatingButtonProps{
    title?: string
    onPress?: any
}
const FloatingButton = ({title, onPress}:FloatingButtonProps) => {
    const {theme} = useTheme()
    return (
        <TouchableOpacity
            style={{
            borderColor: theme.colors.primary,
            borderWidth: 1,
            alignItems:'center',
            flexDirection:'row',
            justifyContent:'center',
            display: 'flex',
            position:'absolute',
            borderRadius: PixelRatio.getPixelSizeForLayoutSize(38),
            width: PixelRatio.getPixelSizeForLayoutSize(30),
            height: PixelRatio.getPixelSizeForLayoutSize(30),
            marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(2),
            backgroundColor: theme.colors.primary,
            }}
            onPress={() => onPress()}>
            <CustomIcon name='pencil' color={theme.colors.white} size={20}/>
            <Text style={{color:theme.colors.white, fontWeight:theme.fontWeight.bold, fontSize:theme.fontSize.md}}>{title}</Text>
        </TouchableOpacity>
    )
  }
  
  export default FloatingButton