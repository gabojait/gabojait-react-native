import React, {useRef, useState} from 'react'
import {Icon, Input, Card, useTheme} from '@rneui/themed'
import colors from '../res/styles/color'
import {ButtonProps, IconProps, InputProps, makeStyles} from '@rneui/base'
import color from '../res/styles/color'
import { StyleSheet, TextInput, View } from 'react-native'
import { FontWeight, theme } from '@/theme'
import { TextInputProps } from 'react-native'

type Props = {
    inputChange?: any
}
type State = {
    internalValue: string
}
export default class CustomInput2 extends React.Component<Props&TextInputProps, State> {
    state: State = {
        internalValue: '',
    }
    callback: Props = {
        inputChange: this.props.inputChange
    }
    private updateText(text:string) {
        this.setState({
            internalValue: text,
        })
        this.callback.inputChange(text)
    }

    render(){
        return(
            <View
            style={[styles.view, this.props.style,{borderRadius:10}]}>
                <TextInput
                style={[styles.input]}
                placeholderTextColor={color.grey}
                {...this.props}
                value={this.state.internalValue}
                onChangeText={(text) => this.updateText(text)}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view:{
        borderColor:color.grey,
        borderWidth: 1.5,
        flex:1,
        flexDirection:'row',
        
    },
    input:{
        paddingLeft:14,
        flex:0.95,
        
    }
})