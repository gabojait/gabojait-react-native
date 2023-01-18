import React, {useState} from 'react'
import {Icon, Input} from '@rneui/themed'
import colors from '../res/styles/color'
import {IconProps, InputProps, makeStyles} from '@rneui/base'
import color from '../res/styles/color'

interface StateProps{
  state?: 'valid'|'invalid'|'none'
}
interface InputTypeProps{
  inputType?: 'id'|'realname'|'nickname'|'email'
  placeholder:string
}
function judgeRegexError(isCorrect:boolean) {
  if (isCorrect == false) throw Error('지정된 형식이 아닙니다')
}

export const IconInput = ({inputType,placeholder}:InputTypeProps, props:JSX.IntrinsicAttributes & InputProps & IconProps) => {
  const [regexState, setRegexState] = useState<StateProps>({state:'none'})
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
  function CheckIdRegex(text:string){
    const IdRegex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{5,15}$/ //5~15자 영문, 숫자 조합
      try {
        judgeRegexError(IdRegex.test(text))
        showValidTheme()
      } catch (error) {
        showErrorTheme()
      }
  }
  function CheckRealnameRegex(text:string){
    const RealnameRegex = /^.{2,5}$/ //2~5자
      try {
        judgeRegexError(RealnameRegex.test(text))
        showValidTheme()
      } catch (error) {
        showErrorTheme()
      }
  }
  function CheckNicknameRegex(text:string){
    const NicknameRegex = /^.{2,8}$/ //2~8자
    try {
      judgeRegexError(NicknameRegex.test(text))
      showValidTheme()
    } catch (error) {
      showErrorTheme()
    }
  }
  function CheckEmailRegex(text:string){
    const EmailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/
    try {
      judgeRegexError(EmailRegex.test(text))
      showValidTheme()
    } catch (error) {
      showErrorTheme()
    }
  }
  function handleChange(text:string){
    switch (inputType) {
      case 'id':
        CheckIdRegex(text)
        break
      case 'realname':
        CheckRealnameRegex(text)
        break
      case 'nickname':
        CheckNicknameRegex(text)
        break
      case 'email':
        CheckEmailRegex(text)
      break
    }
  }
  return (
    <Input 
      {...props}
      style={[
        styles.input
      ]}
      rightIcon={<Icon 
        name="checkmark-circle-outline" type="ionicon" size={18}
        iconStyle={styles.icon}
        
      />}
      onChangeText={text => {
        handleChange(text)
        isInputEmpty(text)?showDefaultTheme():{}
      }}
      {...renderMessage? {errorMessage:'지정된 형식을 입력해주세요'}:{}}
      renderErrorMessage={renderMessage}
      placeholder={placeholder}
      placeholderTextColor={color.disable}
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
      borderBottomWidth: 2
    },
    icon:{
      color: stateColors[regexState.state!!]
    }
  }
})
