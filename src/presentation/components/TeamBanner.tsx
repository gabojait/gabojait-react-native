import {CardProps} from '@rneui/base'
import {Card, Text, useTheme} from '@rneui/themed'
import React from 'react'
import {PixelRatio, View} from 'react-native'
import color from '../res/styles/color'
import CustomIcon from '@/presentation/components/icon/Gabojait'
import PositionRecruiting from '../model/PositionRecruitng'
import {Position} from '@/data/model/type/Position'
import {mapToInitial} from '../utils/util'

const TeamBanner: React.FC<
  CardProps & {teamMembersCnt: PositionRecruiting[]; teamName: String}
> = ({teamMembersCnt: teamMembers, teamName}) => {
  const {theme} = useTheme()

  const IsRecruitDone = (item: PositionRecruiting) => {
    console.log(`teamMembers:${teamMembers}`)
    return item.currentCnt == item.recruitCnt
  }

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
        flex: 1,
      }}>
      <Text
        style={{
          justifyContent: 'flex-end',
          fontWeight: theme.fontWeight.bold,
          fontSize: theme.fontSize.md,
        }}>
        {teamName}
      </Text>
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 10,
          paddingBottom: 15,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        {teamMembers?.map((item, index) => (
          <PartIcon position={item.position} isRecruitDone={IsRecruitDone(item)} key={index} />
        ))}
        <View
          style={{
            height: '100%',
            justifyContent: 'center',
            paddingHorizontal: 10,
          }}>
          <CustomIcon name="arrow-next" size={30} style={{margin: -10}} color={color.primary} />
        </View>
      </View>
    </Card>
  )
}
export const PartIcon: React.FC<{position: Position; isRecruitDone?: boolean; size?: number}> = ({
  position,
  isRecruitDone: isDone = false,
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
        backgroundColor: isDone ? theme.colors.primary : 'white',
      }}>
      {
        <Text style={{fontWeight: theme.fontWeight.bold, fontSize: 30}}>
          {mapToInitial(position)}
        </Text>
      }
    </View>
  )
}

export default TeamBanner
