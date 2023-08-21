import React, {useState} from 'react'
import {Icon, Input} from '@rneui/themed'
import colors from '../res/styles/color'
import {InputProps, makeStyles} from '@rneui/base'

interface StateProps{
  state?: 'valid'|'invalid'|'none'
}
interface InputTypeProps{
  inputType: 'password'|'spellingCheck'
  placeholder?:string
  passwordSpell?:string
}
function judgeRegexError(isCorrect:boolean) {
  if (isCorrect == false) throw Error('지정된 형식이 아닙니다')
}
export const PasswordInput = ({inputType,placeholder,passwordSpell}:InputTypeProps, props:JSX.IntrinsicAttributes & InputProps) => {
  const [secure, setSecure] = useState(true)
  const [regexState, setRegexState] = useState<StateProps>({state:'none'})
  const [isEqualToPasswordSpell, setIsEqualToPasswordSpell] = useState<boolean>(false)
  const [renderMessage, setRenderMessage] = useState<boolean>(false)
  const styles = useStyles(regexState)

  function isInputEmpty(text:string){
    if(text.length == 0) return true
  }
  function showDefaultTheme(){
    setRegexState({state:'none'})
    setRenderMessage(false)
  }
  function showValidTheme(){
    setRegexState({state:'valid'})
    setRenderMessage(false)
  }
  function showErrorTheme(){
    setRegexState({state:'invalid'})
    setRenderMessage(true)
  }
  function CheckPasswordRegex(text:string){
    const PasswordRegex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{10,30}$/ //영문, 숫자 조합 10~30자
      try {
        judgeRegexError(PasswordRegex.test(text))
        showValidTheme()
        return {state:'valid'}
      } catch (error) {
        showErrorTheme()
      }
  }
  function CheckTargetAccordance(text:string){
    setIsEqualToPasswordSpell(()=>{
      if(text == passwordSpell) {
        showValidTheme()
        return true
      }
      else{
        showErrorTheme()
        return false
      }
    })
  }
  function handleChange(text:string){
    switch (inputType) {
      case 'password':
        CheckPasswordRegex(text)
        break
      case 'spellingCheck':
        CheckTargetAccordance(text)
        break
    }
  }
  return (
    <Input
    {...props}
    inputContainerStyle={[styles.input]}
      secureTextEntry={secure}
      rightIcon={
        <Icon
          name={secure ? 'eye-off-outline' : 'eye-outline'}
          onPress={() => {
            secure ? setSecure(false) : setSecure(true)
            console.log(secure)
          }}
          type="ionicon"
          color={colors.darkGrey}
        />
      }
      onChangeText={text => {
        handleChange(text)
        isInputEmpty(text)?showDefaultTheme():{}
      }}
      {...renderMessage && regexState.state==='invalid'? {errorMessage:'지정된 형식을 입력해주세요'}:
      renderMessage && !isEqualToPasswordSpell?{errorMessage:'위에 입력한 비밀번호와 일치하지 않습니다'}:{}}
      renderErrorMessage={renderMessage}
      placeholder={placeholder}
      placeholderTextColor={colors.disable}
    />
  )
}

const useStyles = makeStyles((regexState:StateProps) => {
  const stateColors = {
    none: colors.lightGrey,
    valid: colors.primary,
    invalid: colors.error
  }

  return {
    input:{
      borderBottomColor: stateColors[regexState.state!!],
      borderBottomWidth: 1.5,
    },
    icon:{
      color: stateColors[regexState.state!!]
    }
  }
})