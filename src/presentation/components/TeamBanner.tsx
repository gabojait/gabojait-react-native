import {CardProps} from '@rneui/base'
import {Card, Text, useTheme} from '@rneui/themed'
import React from 'react'
import {PixelRatio, View} from 'react-native'
import color from '../res/styles/color'
import CustomIcon from '@/presentation/components/icon/Gabojait'
import Team from '@/model/Team/Team'
import TeamModel from '../model/Team'

const TeamBanner: React.FC<CardProps & {team: TeamModel}> = ({team}) => {
  const {theme} = useTheme()
  const positions = [
    [team.backendTotalRecruitCnt, 'B'],
    [team.frontendTotalRecruitCnt, 'F'],
    [team.designerTotalRecruitCnt, 'D'],
    [team.managerTotalRecruitCnt, 'M'],
  ]
  const IsRecruitDone = (positionInitial: string) => {
    if (positionInitial == 'B') {
      if (team.backendTotalRecruitCnt == team.backendCurrentCnt) return true
    }
    if (positionInitial == 'F') {
      if (team.frontendTotalRecruitCnt == team.frontendCurrentCnt) return true
    }
    if (positionInitial == 'D') {
      if (team.designerTotalRecruitCnt == team.frontendCurrentCnt) return true
    }
    if (positionInitial == 'M') {
      if (team.managerTotalRecruitCnt == team.managerCurrentCnt) return true
    }
    return false
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
        {team.projectName}
      </Text>
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 10,
          paddingBottom: 15,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        {positions?.map((item, index) =>
          item[0] && item[1] ? (
            <PartIcon
              partInitial={item[1].toString()}
              isRecruitDone={IsRecruitDone(item[1].toString())}
              key={index}
            />
          ) : (
            <></>
          ),
        )}
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
export const PartIcon: React.FC<{partInitial: string; isRecruitDone?: boolean; size?: number}> = ({
  partInitial,
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
        backgroundColor: isDone ? theme.colors.primary : '',
      }}>
      {<Text style={{fontWeight: theme.fontWeight.bold, fontSize: 30}}>{partInitial}</Text>}
    </View>
  )
}

export default TeamBanner
