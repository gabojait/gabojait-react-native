import {ButtonProps, Text, TouchableOpacity, View} from 'react-native'
import {FilledButton} from '../Button'
import React, {ReactNode} from 'react'
import {makeStyles, useTheme} from '@rneui/themed'
import useGlobalStyles from '@/styles'

interface BottomSlideModalContentProps {
  title: string
  children?: ReactNode
  neverSeeAgainButton?: boolean
  yesButton?: ButtonProps
  noButton?: ButtonProps
  handleNeverSeeAgain: () => {}
}

const BottomModalContent: React.FC<BottomSlideModalContentProps> = props => {
  const {theme} = useTheme()
  const globalStyles = useGlobalStyles()
  const style = useStyles(theme)

  return (
    <View style={style.modal}>
      <Text style={style.title}>{props.title}</Text>
      <View style={style.children}>{props.children}</View>
      <View style={{width: '100%', paddingHorizontal: 20}}>
        <FilledButton
          style={style.button}
          buttonStyle={{backgroundColor: theme.colors.primary, width: '100%'}}
          titleStyle={style.title}
          title={props.yesButton?.title}
          onPress={props.yesButton?.onPress}
          size="xs"
        />
        <FilledButton
          style={[style.button, {paddingBottom: 10}]}
          buttonStyle={{backgroundColor: theme.colors.disabled, width: '100%'}}
          titleStyle={style.title}
          title={props.noButton?.title}
          onPress={props.noButton?.onPress}
          size="xs"
        />
        {props.neverSeeAgainButton ? (
          <TouchableOpacity
            style={{paddingVertical: 7}}
            onPress={() => props.handleNeverSeeAgain()}>
            <Text style={style.neverSeeText}>다시보지 않기</Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    </View>
  )
}

const useStyles = makeStyles(theme => {
  return {
    modal: {
      width: '100%',
      backgroundColor: 'white',
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      paddingTop: 40,
    },
    button: {
      paddingVertical: 7,
    },
    children: {
      paddingTop: 30,
      paddingBottom: 20,
      alignItems: 'center',
    },
    title: {
      fontSize: theme.fontSize.md,
      fontWeight: theme.fontWeight.bold,
      color: theme.colors.black,
    },
    neverSeeText: {
      color: theme.colors.black,
      paddingBottom: 7,
      textAlign: 'center',
    },
  }
})

export default BottomModalContent
