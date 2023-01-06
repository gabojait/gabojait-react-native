import {CardProps} from '@rneui/base'
import {Card, Text, useTheme} from '@rneui/themed'
import React from 'react'
import {AppRegistry, FlatList, PixelRatio, View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

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
    <Card
      containerStyle={{
        borderWidth: 1,
        borderColor: theme.colors.disabled,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: {
          width: 2,
          height: 2,
        },
        borderRadius: 20,
        paddingVertical: 25,
        paddingStart: 25,
      }}>
      <Text h4>{title}</Text>
      <View style={{padding: 10, flexDirection: 'row', justifyContent: 'center'}}>
        {parts.map(part => (
          <PartIcon key={part.id} partInitial={part.name[0]} />
        ))}
      </View>

      <View
        style={{
          position: 'absolute',
          end: 0,
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
        }}>
        <Icon name="chevron-right" size={30} style={{margin: -10}} />
      </View>
    </Card>
  )
}
const PartIcon: React.FC<{partInitial: string; isDone?: boolean}> = ({
  partInitial,
  isDone = false,
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
        width: PixelRatio.getPixelSizeForLayoutSize(20),
        height: PixelRatio.getPixelSizeForLayoutSize(20),
        marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(3),
        backgroundColor: isDone ? theme.colors.primary : '',
      }}>
      {<Text h3>{partInitial}</Text>}
    </View>
  )
}

export default GroupListCard
