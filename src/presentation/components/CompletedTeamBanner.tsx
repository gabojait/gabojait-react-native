import {CardProps} from '@rneui/base'
import {Card, Text, useTheme} from '@rneui/themed'
import React from 'react'
import {View} from 'react-native'
import color from '../res/styles/color'
import CustomIcon from '@/presentation/components/icon/Gabojait'
import TeamBriefDto from '@/data/model/Team/TeamBriefDto'
import {Position} from "@/data/model/type/Position";
import {PositionIcon} from "@/presentation/components/PartIcon";
//TODO: 수정
const CompletedTeamBanner: React.FC<CardProps & { team: TeamBriefDto }> = ({team}) => {
    const {theme} = useTheme()
    const positions = [
        [team.teamMemberCnts.filter(cnt => cnt.position == Position.Backend).length, Position.Backend],
        [team.teamMemberCnts.filter(cnt => cnt.position == Position.Frontend).length, Position.Frontend],
        [team.teamMemberCnts.filter(cnt => cnt.position == Position.Designer).length, Position.Designer],
        [team.teamMemberCnts.filter(cnt => cnt.position == Position.Manager).length, Position.Manager],
    ]

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
                {positions.map((item, index) =>
                    item[0] > 0 ? (
                        <PositionIcon isRecruitDone={true} key={index} position={item[1] as Position}/>
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
                    <CustomIcon name="arrow-next" size={30} style={{margin: -10}} color={color.primary}/>
                </View>
            </View>
        </Card>
    )
}

export default CompletedTeamBanner
