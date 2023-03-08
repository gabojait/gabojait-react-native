import {CardProps} from '@rneui/base'
import {Card, makeStyles, Text, useTheme} from '@rneui/themed'
import React from 'react'
import {PixelRatio, StyleProp, View, ViewProps, ViewStyle} from 'react-native'
import color from '../res/styles/color'
import CustomIcon from '@/presentation/components/icon/Gabojait'

export class Part {
  id: string
  name: string
  members: Array<string>
  constructor(id: string, name: string, members: Array<string>) {
    this.id = id
    this.name = name
    this.members = members
  }
}

const GroupListCard: React.FC<CardProps & {title: string; parts: Array<Part>}> = ({
  title,
  parts,
}) => {
  const {theme} = useTheme()
  return (
    <ArrowCard title={title} arrowColor={theme.colors.primary}>
      <View style={{flexDirection: 'row'}}>
        {parts.map(part => (
          <PartIcon key={part.id} partInitial={part.name[0]} />
        ))}
      </View>
    </ArrowCard>
  )
}
export const EmptyCard = ({
  children,
  style,
}: {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
}) => {
  const styles = useStyles()
  return <View style={[styles.card, style]}>{children}</View>
}

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
    <EmptyCard style={style}>
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
    </EmptyCard>
  )
}
export const PartIcon: React.FC<{partInitial: string; isDone?: boolean; size?: number}> = ({
  partInitial,
  isDone = false,
  size = 20,
}) => {
  const {theme} = useTheme()
  return (
    <View
      style={{
        borderColor: theme.colors.primary,
        borderWidth: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(38),
        width: PixelRatio.getPixelSizeForLayoutSize(size),
        height: PixelRatio.getPixelSizeForLayoutSize(size),
        marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(2),
        backgroundColor: isDone ? theme.colors.primary : '',
      }}>
      {<Text style={{fontWeight: theme.fontWeight.bold, fontSize: 30}}>{partInitial}</Text>}
    </View>
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

export default GroupListCard
