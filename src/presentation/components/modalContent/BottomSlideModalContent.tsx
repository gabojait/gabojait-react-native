import {Alert, ButtonProps, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import globalStyles from '@/styles'
import {FilledButton} from '../Button'
import React from 'react'
import {useTheme} from '@rneui/themed'
import {theme} from '@/theme'
import {PropTypes} from 'mobx-react'

interface BottomSlideModalContentProps {
  title: string
  children?: any
  neverSeeAgainButton?: boolean
  yesButton?: ButtonProps
  noButton?: ButtonProps
}

const BottomSlideModalContent: React.FC<BottomSlideModalContentProps> = props => {
  const {theme} = useTheme()

  return (
    <Modal
      animationType="slide"
      transparent={true}
      style={{justifyContent: 'center'}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: globalStyles.modalDim.backgroundColor,
        }}>
        <View style={style.modal}>
          <Text
            style={{
              fontSize: theme.fontSize.md,
              fontWeight: theme.fontWeight.bold,
              color: theme.colors.black,
            }}>
            {props.title}
          </Text>
          <View style={style.children}>{props.children}</View>
          <View style={{width: '100%', paddingHorizontal: 20}}>
            <FilledButton
              buttonStyle={{backgroundColor: theme.colors.primary, width: '100%'}}
              titleStyle={{color: theme.colors.black}}
              title={props.yesButton?.title}
              onPress={props.yesButton?.onPress}
            />
            <FilledButton
              buttonStyle={{backgroundColor: theme.colors.grey3, width: '100%'}}
              titleStyle={{color: theme.colors.black}}
              title={props.noButton?.title}
              onPress={props.noButton?.onPress}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const NeverSeeAgain = () => {
  const {theme} = useTheme()

  return (
    <TouchableOpacity>
      <Text style={{color: theme.colors.black, paddingTop: 10}}>다시보지 않기</Text>
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
  modal: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  children: {
    paddingTop: 30,
    paddingBottom: 20,
    alignItems: 'center',
  },
})

export default BottomSlideModalContent
