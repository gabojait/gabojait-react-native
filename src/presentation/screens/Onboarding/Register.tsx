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
import { TabItem } from '@rneui/base/dist/Tab/Tab.Item'

export type RegisterProps = StackScreenProps<OnboardingStackParamList,'Register'>

const Register = ({navigation, route}:RegisterProps) => {
    const usernameRef = useRef('')
    const nicknameRef = useRef('')
    const passwordRef = useRef('')
    const passwordCheckRef = useRef('')
    const emailRef = useRef('')
    const legalName = useRef('')
    const birthdateRef = useRef('')

    const [usernameState, setUsernameState]= useState<StateProp>({state:'none'})
    const [nicknameState, setNicknameState]= useState<StateProp>({state:'none'})
    const [passwordState, setPasswordState]= useState<StateProp>({state:'none'})
    const [passwordCheckState, setPasswordCheckState]= useState<StateProp>({state:'none'})
    const [emailState, setEmailState]= useState<StateProp>({state:'none'})
    const [realnameState, setRealnameState]= useState<StateProp>({state:'none'})

    const usernameRegex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{5,15}$/ //5~15자 영문, 숫자 조합
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{10,30}$/ //영문, 숫자 조합 10~30자
    const nicknameRegex = /^.{2,8}$/ //2~8자
    const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/
    const realnameRegex = /^.{2,5}$/ //2~5자

    function getState(regexResult:boolean):StateProp{
        if (regexResult == true){
            return {state:'valid'}
        }
        else{
            return {state:'invalid'}
        }
    }
    function isEqual(text1:string, text2:string):StateProp{
        if(text1 == text2){
            return {state:'valid'}
        }
        else{
            return {state:'invalid'}
        }
    }
    return (
        <ScrollView style={styles.view} showsVerticalScrollIndicator={false}>
            <View style={styles.item}>
                <View style={{flex:5}}>
                    <RegisterInput state={usernameState.state} label='아이디 입력'
                        inputChange={(text:string)=>{
                            usernameRef.current = text
                            let state = getState(usernameRegex.test(text))
                            setUsernameState(state)
                        }}
                    />
                </View>
                <OutlinedButton  title="중복확인" size="sm"/>
            </View>
            <View style={styles.item}>
                <View style={{flex:5}}>
                    <RegisterInput state={nicknameState.state} label='닉네임 입력'
                        inputChange={(text:string)=>{
                            nicknameRef.current = text
                            let state = getState(nicknameRegex.test(text))
                            setNicknameState(state)
                        }}
                    />
                </View>
                <OutlinedButton  title="중복확인" size="sm"/>
            </View>
            <RegisterInput state={passwordState.state} label='비밀번호 입력' isForPassword={true} 
                inputChange={(text:string)=>{
                    let state = getState(passwordRegex.test(text))
                    passwordRef.current = text
                    setPasswordState(state)
                    setPasswordCheckState(isEqual(text, passwordCheckRef.current))
                }}
            />
            <RegisterInput state={passwordCheckState.state} label='비밀번호 재입력' isForPassword={true} 
                inputChange={(text:string)=>{
                    if(passwordRef.current == text && passwordState.state == 'valid'){
                        passwordCheckRef.current = text
                        setPasswordCheckState({state:'valid'})
                    }else{
                        setPasswordCheckState({state:'invalid'})
                    }
                }}
            />
            <View style={styles.item}>
                <View style={{flex:5}}>
                    <RegisterInput state={emailState.state} label='이메일 입력'
                        inputChange={(text:string)=>{
                            emailRef.current = text
                            let state = getState(emailRegex.test(text))
                            setEmailState(state)
                        }}
                    />
                </View>
                <OutlinedButton  title="인증하기" size="sm"/>
            </View>
            <RegisterInput state={realnameState.state} label='이름(실명)'
                inputChange={(text:string)=>{
                    legalName.current = text
                    let state = getState(realnameRegex.test(text))
                    setRealnameState(state)
                }}
            />
            <View style={styles.itemBox}>
                <Text style={styles.label}>생년월일 입력</Text>
                <DateDropdown label={'생년월일 입력'} 
                    inputChange={(text:string)=>{ console.log(text) }}
                />
            </View>
            <View style={styles.itemBox}>
                <Text style={styles.label}>성별</Text>
                <View style={styles.genderView}>
                <OutlinedButton title={'여자'} size='sm'/>
                <OutlinedButton title={'남자'} size='sm'/>
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
    item:{
        flex:1,
        flexDirection:'row',
        alignItems:'flex-end'
    },
    itemBox:{
        paddingStart:10,
        paddingTop:30
    },
    genderView:{
        flexDirection:'row',
        flex:2,
        justifyContent:'center'
    },
    input:{
        flex:1,
    },
    label:{
        fontSize:14,
        color:color.grey2,
        paddingBottom:24
    }
})
export default Register