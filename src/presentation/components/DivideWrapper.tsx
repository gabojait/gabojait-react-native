import React from 'react'
import {View, StyleSheet} from 'react-native'
import colors from '@/presentation/res/styles/color'

const DiveiderWrapper = ({children, style}: any) => {
  return (
    <View style={[styles.card, style]}>
      {React.Children.map(children, (child, index) =>
        index != children.length - 1 ? (
          <View style={[styles.element]}>{child}</View>
        ) : (
          <View style={[styles.last_element]}>{child}</View>
        ),
      )}
    </View>
  )
}

export default DiveiderWrapper

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:colors.white,
    borderColor:colors.transparent,
    width: '100%',
    height: 100,
    borderRadius: 14,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 5,
  },
  element: {
    flex:1,
    height: '100%',
    borderWidth: 1,
    borderTopColor: colors.transparent,
    borderBottomColor: colors.transparent,
    borderLeftColor: colors.transparent,
    borderRightColor: colors.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  last_element: {
    flex:1,
    height: '100%',
    borderWidth: 1,
    borderColor: colors.transparent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
})