import { theme } from '@/theme'
import { Icon, Input, useTheme } from '@rneui/themed'
import React, {useRef, useState} from 'react'
import { StyleSheet, TextInput, TextInputProps, View,  } from 'react-native'
import color from '../res/styles/color'
import type { CustomInputProps} from '@/presentation/components/props/StateProps'

export const RegisterInput = ({inputChange, size='sm', placeholder ,state='none', ...props}:CustomInputProps&TextInputProps) => {
    const valueRef = useRef('')

    const iconColors = {
        none: color.transparent,
        valid: color.primary,
        invalid: color.transparent
    }
    const borderColors = {
        none: color.lightGrey,
        valid: color.primary,
        invalid: color.error
    }
    function updateText(text:string) {
        valueRef.current = text
        inputChange(text)
    }
    
    return (
        <>
            <Input
                inputContainerStyle={{borderBottomWidth:1.3, borderBottomColor:borderColors[state]}}
                style={[styles.input, props.style]}
                placeholderTextColor={color.grey}
                placeholder={placeholder}
                onChangeText={(text) => updateText(text)}
                rightIcon={
                <Icon name="checkmark-circle-outline" type="ionicon" size={18} color={iconColors[state]}/>
                }
            />
        </>
        
    )
}
const styles = StyleSheet.create({
    input:{
        paddingLeft:14,
        flex: 10
    },
    icon:{
        flex:1,
        justifyContent:'center',
        paddingHorizontal: 14
    }
})