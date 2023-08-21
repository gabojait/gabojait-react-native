import {Switch, SwitchProps} from '@rneui/themed';
import React, {useState} from 'react'
import {View} from 'react-native';
import color from '../res/styles/color'

export const CustomSwitch = ({
                                 onValueChange,
                                 value,
                                 ...props
                             }: SwitchProps) => {
    return (
        <View>
            <Switch
                {...props}
                thumbColor={color.white}
                trackColor={{false: color.darkGrey, true: color.primary}}
                onValueChange={onValueChange}
                value={value}
            />
        </View>
    )
}