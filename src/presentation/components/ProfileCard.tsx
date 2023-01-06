import React from 'react'
import {Icon, makeStyles} from '@rneui/themed'
import {StyleSheet, TextInput, View} from 'react-native'
import textStyles from '../res/styles/textStyles'
import colors from '../res/styles/color'
import {Text} from '@rneui/themed'

interface ProfileCardProps {
  height: number
  placeholderText: string
  state?: 'success' | 'error' | 'default' //undefined, success, error 3가지 상태 -> 3가지 UI 색상 적용
  title: string
  nextIcon?: boolean //상세 페이지로 넘어가는 아이콘버튼의 표시여부 결정
}
const ProfileCard = ({
  height,
  placeholderText,
  state = 'default',
  title,
  nextIcon = false,
}: ProfileCardProps) => {
  const styles = useStyles()
  return (
    <View
      style={[
        styles.card,
      ]}>
      <View>
        <Text style={[styles.title, textStyles.weight3, textStyles.size4]}>{title}</Text>
        <TextInput
          multiline={true}
          maxLength={30}
          numberOfLines={height}
          placeholder={placeholderText}></TextInput>
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

const useStyles = makeStyles((theme, props: ProfileCardProps) => {
  const stateColors = {
    default: theme.colors.white,
    error: theme.colors.error,
    success: theme.colors.success,
  }

  return {
    card: {
      backgroundColor: theme.colors.white,
      borderColor: stateColors[props.state!!],
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
  }
})
export default ProfileCard
