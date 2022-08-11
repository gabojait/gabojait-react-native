import React from 'react'
import {StyleSheet, View} from 'react-native'
import colors from '@/presentation/res/styles/color'

const CardWrapper = ({children, style}: any) => {
  return <View style={[styles.card, style]}>{children}</View>
}

export default CardWrapper

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    height: 100,
    backgroundColor: colors.white,
    borderRadius: 14,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 9,
    marginVertical: 5,
  },
})
