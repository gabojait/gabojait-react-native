import {makeStyles, Text} from '@rneui/themed'
import React from 'react'
import {StyleProp, View, ViewStyle} from 'react-native'
import CustomIcon from '@/presentation/components/icon/Gabojait'
import CardWrapper from './CardWrapper'

export const ArrowCard = ({
  title,
  arrowColor = 'black',
  children,
  onArrowPress,
  style,
}: {
  title: string
  arrowColor?: string
  children: React.ReactNode
  onArrowPress?: () => void
  style?: StyleProp<ViewStyle>
}) => {
  const styles = useStyles()
  return (
    <CardWrapper style={[styles.card, style]}>
      <View style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center'}}>
        <View style={{flex: 9}}>
          <Text style={styles.title}>{title}</Text>
          {children}
        </View>
        <View style={[{flex: 1, alignItems: 'center', justifyContent: 'center'}]}>
          <CustomIcon
            name="arrow-next"
            size={30}
            style={{height: 30}}
            color={arrowColor}
            onPress={onArrowPress}
          />
        </View>
      </View>
    </CardWrapper>
  )
}
const useStyles = makeStyles(theme => ({
  card: {
    borderWidth: 1,
    borderColor: theme.colors.disabled,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    borderRadius: 20,
    padding: 25,
    display: 'flex',
  },
  title: {
    justifyContent: 'flex-start',
    fontWeight: theme.fontWeight.bold,
    fontSize: theme.fontSize.md,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
}))
