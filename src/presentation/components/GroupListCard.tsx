import {CardProps} from '@rneui/base'
import {Card, makeStyles, Text, useTheme} from '@rneui/themed'
import React from 'react'
import {PixelRatio, View} from 'react-native'
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
      {parts.map(part => (
        <PartIcon key={part.id} partInitial={part.name[0]} />
      ))}
    </ArrowCard>
  )
}
export const EmptyCard = ({title, children}: {title: string; children: React.ReactNode}) => {
  const styles = useStyles()
  return (
    <Card containerStyle={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </Card>
  )
}

export const ArrowCard = ({
  title,
  arrowColor = 'black',
  children,
}: {
  title: string
  arrowColor?: string
  children: React.ReactNode
}) => {
  const styles = useStyles()
  return (
    <EmptyCard title={title}>
      <View style={{padding: 10, flexDirection: 'row', justifyContent: 'center'}}>
        {children}
        <View style={styles.iconWrapper}>
          <CustomIcon name="arrow-next" size={30} style={{margin: -10}} color={arrowColor} />
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
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    borderRadius: 20,
    paddingBottom: 25,
    paddingStart: 25,
    flex: 1,
  },
  title: {
    justifyContent: 'flex-end',
    fontWeight: theme.fontWeight.bold,
    fontSize: theme.fontSize.md,
  },
  iconWrapper: {
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
}))

export default GroupListCard
