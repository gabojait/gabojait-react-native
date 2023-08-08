import {CardProps} from '@rneui/base';
import {Card, Text, useTheme} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';
import color from '../res/styles/color';
import CustomIcon from '@/presentation/components/icon/Gabojait';
import PositionRecruiting from '../model/PositionRecruitng';
import {PositionIcon} from './PartIcon';
import {ArrowCard} from "@/presentation/components/BaseCard";

const TeamBanner: React.FC<
    CardProps & { teamMembersCnt: PositionRecruiting[]; teamName: string }
> = ({teamMembersCnt: teamMembers, teamName}) => {
    const {theme} = useTheme();

    const IsRecruitDone = (item: PositionRecruiting) => {
        return item.currentCnt == item.recruitCnt;
    };

    return (
        //
        // <Card
        //   containerStyle={{
        //     borderWidth: 1,
        //     borderColor: theme.colors.disabled,
        //     shadowColor: 'black',
        //     shadowOpacity: 0.2,
        //     shadowOffset: {
        //       width: 2,
        //       height: 2,
        //     },
        //     borderRadius: 20,
        //     flex: 1,
        //   }}
        // >
        //   <Text
        //     style={{
        //       justifyContent: 'flex-end',
        //       fontWeight: theme.fontWeight.bold,
        //       fontSize: theme.fontSize.md,
        //     }}
        //   >
        //     {teamName}
        //   </Text>
        //   <View
        //     style={{
        //       paddingHorizontal: 10,
        //       paddingVertical: 10,
        //       paddingBottom: 15,
        //       flexDirection: 'row',
        //       justifyContent: 'space-around',
        //     }}
        //   >
        //     {teamMembers?.map((item, index) => (
        //       <PositionIcon position={item.position} isRecruitDone={IsRecruitDone(item)} key={index} />
        //     ))}
        //     <View
        //       style={{
        //         height: '100%',
        //         justifyContent: 'center',
        //         paddingHorizontal: 10,
        //       }}
        //     >
        //       <CustomIcon name="arrow-next" size={30} style={{ margin: -10 }} color={color.primary} />
        //     </View>
        //   </View>
        // </Card>
        <ArrowCard title={teamName} arrowColor={theme.colors.primary}>
            <View style={{paddingTop: 20, flexDirection: 'row', justifyContent: 'center'}}>
            {teamMembers?.map((item, index) => (
                <PositionIcon position={item.position} isRecruitDone={IsRecruitDone(item)} key={index}/>
            ))}

            </View>
        </ArrowCard>
    );
};

export default TeamBanner;
