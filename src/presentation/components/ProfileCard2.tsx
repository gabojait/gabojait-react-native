import React, {useState} from 'react'
import {Icon, Input, Card, Text, createTheme, ThemeProvider, useTheme} from '@rneui/themed'
import {StyleSheet, TextInput} from 'react-native'
import textStyles from '../res/styles/textStyles'
import {InputProps} from '@rneui/base'
import colors from '../res/styles/color'
import textstyles from '../res/styles/textStyles'

interface PartialProps {
  state?: 'success' | 'error' | 'default' //값이 undefined, default일 때 디폴트UI를 나타냄
}
interface ProfileCardProps extends PartialProps {
  height: number
  placeholderText?: string
  title?: string
  nextIcon?: boolean //상세 페이지로 넘어가는 아이콘버튼의 표시여부 결정
}

const ProfileCard2 = ({height, placeholderText, state, title, nextIcon}: ProfileCardProps) => {
  return (
    <ThemeProvider
      theme={state === 'success' ? theme_success : state === 'error' ? theme_error : theme_default}>
      <Card>
        <Text>{title}</Text>
        <Input
          multiline={true}
          numberOfLines={height}
          placeholder={placeholderText}
          rightIcon={
            nextIcon && (
              <Icon
                name="angle-right"
                type="font-awesome"
                size={30}
                onPress={() => console.log('not implemented yet!')}
              />
            )
          }
        />
      </Card>
    </ThemeProvider>
  )
}

const theme_success = createTheme({
  components: {
    Card: {
      containerStyle: {
        borderColor: colors.primary, //theme_success의 정체성: success컬러
        backgroundColor: colors.white,
        borderRadius: 50,
        borderWidth: 1.3,
        justifyContent: 'space-between',
        marginHorizontal: 5,
        marginVertical: 8,
        shadowColor: colors.black,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.8,
        elevation: 5,
      },
    },
    Text: {
      style: {
        paddingStart: 10,
        paddingTop: 10,
        fontWeight: textstyles.weight3.fontWeight,
        fontFamily: textstyles.weight3.fontFamily,
      },
    },
    Input: {
      inputContainerStyle: {
        borderColor: colors.white,
        justifyContent: 'space-between',
      },
      inputStyle: {
        borderBottomColor: colors.white,
      },
    },
  },
})

const theme_error = createTheme({
  components: {
    Card: {
      containerStyle: {
        borderColor: colors.error, //theme_error의 정체성: error컬러
        backgroundColor: colors.white,
        borderRadius: 50,
        borderWidth: 1.3,
        justifyContent: 'space-between',
        marginHorizontal: 5,
        marginVertical: 8,
        shadowColor: colors.black,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.8,
        elevation: 5,
      },
    },
    Text: {
      style: {
        paddingStart: 10,
        paddingTop: 10,
        fontWeight: textstyles.weight3.fontWeight,
        fontFamily: textstyles.weight3.fontFamily,
      },
    },
    Input: {
      inputContainerStyle: {
        borderColor: colors.white,
        justifyContent: 'space-between',
      },
      inputStyle: {
        borderBottomColor: colors.white,
      },
    },
  },
})

const theme_default = createTheme({
  components: {
    Card: {
      containerStyle: {
        borderColor: colors.white, //theme_default의 정체성
        backgroundColor: colors.white,
        borderRadius: 50,
        borderWidth: 1.3,
        justifyContent: 'space-between',
        marginHorizontal: 5,
        marginVertical: 8,
        shadowColor: colors.black,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.8,
        elevation: 5,
      },
    },
    Text: {
      style: {
        paddingStart: 10,
        paddingTop: 10,
        fontWeight: textstyles.weight3.fontWeight,
        fontFamily: textstyles.weight3.fontFamily,
      },
    },
    Input: {
      inputContainerStyle: {
        borderColor: colors.white,
        justifyContent: 'space-between',
      },
      inputStyle: {
        borderBottomColor: colors.white,
      },
    },
  },
})
export default ProfileCard2
