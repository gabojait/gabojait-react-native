import { theme } from '@/theme'
import { useTheme } from '@rneui/themed'
import React, {useRef, useState} from 'react'
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native'
import color from '../res/styles/color'

interface Props {
    inputChange?: any
    style?: any
    placeholder: string
    size?: 'xs' | 'sm' | 'md' | 'lg'
}

export const CustomInput = ({inputChange, size='sm', ...props}:Props&TextInputProps) => {
    const valueRef = useRef('')
    const {theme} = useTheme()
    
    function updateText(text:string) {
        valueRef.current = text
        inputChange(text)
    }

    return (
        <View
            style={[styles.view, props.style, {borderRadius:theme.radius[size]}]}>
                <TextInput
                style={[styles.input]}
                placeholderTextColor={color.grey}
                {...props}
                onChangeText={(text) => updateText(text)}/>
            </View>
    )
}
const styles = StyleSheet.create({
    view:{
        borderColor:color.grey,
        borderWidth: 1.5,
        flex:1,
        flexDirection:'row'
        
    },
    input:{
        paddingLeft:14,
        flex:0.95,
        
    }
})