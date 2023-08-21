import React,{useState} from 'react'
import {Icon, makeStyles,Text} from '@rneui/themed'
import {StyleSheet, TextInput, View} from 'react-native'
import textStyles from '../res/styles/textStyles'
import colors from '../res/styles/color'

interface StateProps{
  state?: 'success'|'error'|'none'
}
interface ProfileCardProps {
  height: number
  placeholderText: string
  title: string
  nextIcon?: boolean //상세 페이지로 넘어가는 아이콘버튼의 표시여부 결정
}
export const ProfileCard = ({height, placeholderText, title, nextIcon=false,}: ProfileCardProps) => {
  const [state, setState] = useState<StateProps>({state:'none'})

  function isInputEmpty(text:string){
    if(text.length == 0) return true
  }

  return (
    <View
      style={[
        styles(state).card,
      ]}>
      <View>
        <Text style={[styles(state).title, textStyles.weight3, textStyles.size4]}>{title}</Text>
        <TextInput
          multiline={true}
          maxLength={30}
          numberOfLines={height}
          placeholder={placeholderText}
          onChangeText={text => isInputEmpty(text)?setState({state:'error'}):setState({state:'success'})}/>
      </View>
      <View>
        {nextIcon && (
          <Icon
            name="angle-right"
            type="font-awesome"
            size={30}
            onPress={() => console.log('not implemented yet!')}
          />
        )}
      </View>
    </View>
  )
}

const stateColors = {
  success: colors.primary,
  error: colors.error,
  none: colors.white,
}
const styles = (cardState:StateProps) => StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderColor: cardState.state==='success'?stateColors.success:cardState.state==='error'?stateColors.error:stateColors.none,
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
    marginVertical: 8,
    padding: 15,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.8,
    elevation: 5,
  },
  title: {
    paddingStart: 10,
    paddingTop: 10,
  },
})