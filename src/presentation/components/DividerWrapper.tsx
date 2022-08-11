import React from 'react'
import {View, StyleSheet} from 'react-native'
import colors from '@/presentation/res/styles/color'

const DiveiderWrapper = ({children}: any) => {
  return (
    <View style={styles.card}>
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
    width: '100%',
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
    marginVertical: 5,
  },
  element: {
    width: '33%',
    height: '100%',
    borderWidth: 1,
    borderTopColor: colors.white,
    borderBottomColor: colors.white,
    borderLeftColor: colors.white,
    borderRightColor: colors.disable,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 5,
  },
  last_element: {
    width: '33%',
    height: '100%',
    borderWidth: 1,
    borderColor: colors.white,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 5,
  },
})
