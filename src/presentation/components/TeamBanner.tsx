import {CardProps} from '@rneui/base'
import {Card, Text, useTheme} from '@rneui/themed'
import React from 'react'
import {PixelRatio, View} from 'react-native'
import color from '../res/styles/color'
import CustomIcon from '@/presentation/components/icon/Gabojait'
import Team from '../model/Team'
import TeamListDto from '@/model/Team/TeamListDto'
import {Position} from '@/model/type/Position'

const TeamBanner: React.FC<CardProps & {team: TeamListDto}> = ({team}) => {
  const {theme} = useTheme()
  const teamMemberRecruitCnts = team.teamMemberRecruitCnts

  /**
   * 포지션별 총 모집 인원 배열과 현재 소속된 팀원 배열을 이용해 모집이 완료됐는지 검사합니다.
   * @param positionInitial
   */
  const IsRecruitDone = (positionInitial: Position) => {
    const positionTotalCount =
      teamMemberRecruitCnts.find(position => position.position === positionInitial)
        ?.totalRecruitCnt ?? 0
    const positionCount = team.teamMembers.filter(
      member => member.position === positionInitial,
    ).length
    return positionTotalCount === positionCount
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
        {teamMemberRecruitCnts?.map((item, index) => (
          <PartIcon
            partInitial={item.position.charAt(0).toUpperCase()}
            isRecruitDone={IsRecruitDone(item.position)}
            key={index}
          />
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
        backgroundColor: isDone ? theme.colors.primary : 'white',
      }}>
      {<Text style={{fontWeight: theme.fontWeight.bold, fontSize: 30}}>{partInitial}</Text>}
    </View>
  )
}

export default TeamBanner
