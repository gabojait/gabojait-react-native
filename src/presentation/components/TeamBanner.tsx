import { CardProps } from '@rneui/base';
import { Card, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import color from '../res/styles/color';
import CustomIcon from '@/presentation/components/icon/Gabojait';
import PositionRecruiting from '../model/PositionRecruitng';
import { PositionIcon } from './PartIcon';
import { ArrowCard } from '@/presentation/components/BaseCard';

const TeamBanner: React.FC<
  CardProps & { teamMembersCnt: PositionRecruiting[]; teamName: string, onArrowPress:()=>void }
> = ({ teamMembersCnt: teamMembers, teamName,onArrowPress }) => {
  const { theme } = useTheme();

  const IsRecruitDone = (item: PositionRecruiting) => {
    return item.currentCnt == item.recruitCnt;
  };

  return (
    <View style={{ paddingTop: 16 }}>
      <ArrowCard title={teamName} arrowColor={theme.colors.primary} onArrowPress={onArrowPress}>
        <View style={{ paddingTop: 10, flexDirection: 'row', justifyContent: 'flex-start' }}>
          {teamMembers?.map((item, index) => (
            <PositionIcon
              position={item.position}
              isRecruitDone={IsRecruitDone(item)}
              key={index}
            />
          ))}
        </View>
      </ArrowCard>
    </View>
  );
};

export default TeamBanner;
