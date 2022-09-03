import React from 'react'
import {View, StyleSheet} from 'react-native'
import colors from '@/presentation/res/styles/color'
import textStyles from '@/presentation/res/styles/textStyles'
import {theme} from '@/theme'

const DividerWrapper = ({children, style}: any) => {
  return (
    <View style={[styles.card]}>
      {React.Children.map(children, (child, index) =>
        index != children.length - 1 ? (
          <View
            style={[styles.element, style, textStyles.size4, textStyles.weight3, styles.textcolor]}>
            {child}
          </View>
        ) : (
          <View
            style={[
              styles.last_element,
              style,
              textStyles.size4,
              textStyles.weight3,
              styles.textcolor,
            ]}>
            {child}
          </View>
        ),
      )}
    </View>
  )
}

export default DividerWrapper

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 100 /**컴포넌트 단독 개발 때만 height 100이지만 나중에는 %단위로 맞출 예정*/,
    backgroundColor: colors.white,
    borderRadius: theme.radius?.md,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginVertical: theme.shadow?.marginVertical,
    elevation: theme.shadow?.elevation,
    shadowOpacity: theme.shadow?.opacity,
    shadowRadius: theme.shadow?.radius,
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
  textcolor: {
    color: colors.black,
  },
})
