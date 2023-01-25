import { theme } from '@/theme'
import { Icon, Input} from '@rneui/themed'
import React, {useRef, useState} from 'react'
import { StyleSheet, Text, TextInputProps, View} from 'react-native'
import color from '../res/styles/color'
import type { CustomInputProps} from '@/presentation/components/props/StateProps'
import textStyles from '../res/styles/textStyles'

export const RegisterInput = ({inputChange, size='sm', label, placeholder, isForPassword=false, state='none', ...props}:CustomInputProps&TextInputProps) => {
    const valueRef = useRef('')
    const [secure, setSecure] = useState(true)
    
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
        <View style={{flex:1, justifyContent:'flex-end'}}>
                <Input
                    containerStyle={{height:'70%'}}
                    inputContainerStyle={{borderBottomWidth:1.3, borderBottomColor:borderColors[state], height:'60%'}}
                    style={[styles.input, props.style]}
                    placeholderTextColor={color.grey}
                    placeholder={placeholder}
                    onChangeText={(text) => updateText(text)}
                    rightIcon={
                        isForPassword
                            ?<Icon name={secure ? 'eye-off-outline' : 'eye-outline'}
                                onPress={() => {
                                secure ? setSecure(false) : setSecure(true)
                                console.log(secure)
                                }}
                                type="ionicon"
                                color={color.darkGrey}
                            /> 
                            :<Icon name="checkmark-circle-outline" type="ionicon" size={18} color={iconColors[state]}/>
                    }
                    secureTextEntry={isForPassword?secure:false}
                    label={label}
                    labelStyle={styles.label}
                />
        </View>       
    )
}

const styles = StyleSheet.create({
    input:{
        paddingLeft:14,
        flex: 10,
        fontSize:14,
    },
    icon:{
        flex:1,
        justifyContent:'center',
        paddingHorizontal: 14
    },
    label:{
        fontSize:14,
        color:color.grey2
    }
})