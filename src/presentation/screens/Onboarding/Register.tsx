import { Text } from '@rneui/themed'
import React, { useRef, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { FilledButton, OutlinedButton } from '@/presentation/components/Button'
import { OnboardingStackParamList, RootStackParamList } from '@/presentation/navigation/types'
import { StackScreenProps } from '@react-navigation/stack'
import { RegisterInput } from '@/presentation/components/RegisterInput'
import { StateProp } from '@/presentation/components/props/StateProps'
import color from '@/presentation/res/styles/color'
import { DateDropdown } from '@/presentation/components/DateDropdown'

export type RegisterProps = StackScreenProps<OnboardingStackParamList,'Register'>

const Register = ({navigation, route}:RegisterProps) => {
    const usernameRef = useRef('')
    const passwordRef = useRef('')
    const [usernameState, setUsernameState]= useState<StateProp>({state:'none'})
    const [passwordState, setPasswordState]= useState<StateProp>({state:'none'})

    function judgeRegexError(isCorrect:boolean) {
        if (isCorrect == false) throw Error('지정된 형식이 아닙니다')
    
    }
    function isEmpty(text:string){
        if (text.length == 0){
            return true
        }
        else return false
    }
    function checkUsername(text:string){
        const usernameRegex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{5,15}$/ //5~15자 영문, 숫자 조합
        try {
            judgeRegexError(usernameRegex.test(text))
            setUsernameState({state:'valid'})
        }catch (error){
            if (text.length == 0){
                setPasswordState({state:'none'})
            }
            else {setUsernameState({state:'invalid'})}
        }
    }
    function checkPassword(text:string){
        const PasswordRegex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{10,30}$/ //영문, 숫자 조합 10~30자
        try {
            judgeRegexError(PasswordRegex.test(text))
            setPasswordState({state:'valid'})
        }catch (error) {
            if (text.length == 0){
                setPasswordState({state:'none'})
            }
            setPasswordState({state:'invalid'})
        }
    }
    return (
        <ScrollView style={styles.view}>
            <View style={{alignItems:'flex-start'}}>
                <Text style={{alignItems:'center'}}>아이디 입력</Text>
                <View style={styles.idView}>
                    <View style={{flex:5}}>
                        <RegisterInput state={usernameState.state}
                            inputChange={(text:string)=>{
                                usernameRef.current = text
                                checkUsername(text)
                            }}
                        />
                    </View>
                    <OutlinedButton  title="중복확인" size="sm"/>
                </View>
            </View>
             
            
            <FilledButton title="가입하기" onPress={() => navigation.navigate('CompleteOnboarding')}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    view:{
        backgroundColor:color.white
    },
    idView:{
        flex:1,
        flexDirection:'row'
    },
    genderView:{
        flexDirection:'row',
        flex:2,
        backgroundColor:color.darkGrey,
        justifyContent:'space-between'
    },
    input:{
        flex:1,
    },
})
export default Register