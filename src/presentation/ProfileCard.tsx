import React from 'react'
import {Icon} from '@rneui/themed'
import {StyleSheet, TextInput, View} from 'react-native'
import textStyles from './res/styles/textStyles'
import colors from './res/styles/color'
import {Text} from '@rneui/base'

interface profileCard {
  height: number
  placeholderText: string
  state?: 'success' | 'error' //undefined, success, error 3가지 상태 -> 3가지 UI 색상 적용
  title: string
  nextIcon?: boolean //상세 페이지로 넘어가는 아이콘버튼의 표시여부 결정
}
const ProfileCard = ({height, placeholderText, state, title, nextIcon = false}: profileCard) => {
  return (
    <View
      style={[
        styles.card,
        state === undefined ? styles.default : state === 'success' ? styles.success : styles.error,
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

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: colors.white,
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
  default: {
    borderColor: colors.white,
  },
  error: {
    borderColor: colors.error,
  },
  success: {
    borderColor: colors.primary,
  },
  title: {
    paddingStart: 10,
    paddingTop: 10,
  },
})

export default ProfileCard
