import { CardProps } from '@rneui/base';
import { useTheme } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import PositionRecruiting from '../model/PositionRecruitng';
import { PositionIcon } from './PartIcon';
import { BaseCard } from '@/presentation/components/BaseCard';
import { Position } from '@/data/model/type/Position';

const TeamBanner: React.FC<
  CardProps & { teamMembersCnt: PositionRecruiting[]; teamName: string; onArrowPress: () => void }
> = ({ teamMembersCnt: teamMembers, teamName, onArrowPress, containerStyle, wrapperStyle }) => {
  const { theme } = useTheme();

  const IsRecruitDone = (item: PositionRecruiting) => {
    return item.currentCnt === item.recruitCnt;
  };

  return (
    <View style={[containerStyle, { paddingTop: 16 }]}>
      <BaseCard title={teamName} arrowColor={theme.colors.primary} onPress={onArrowPress}>
        <View style={{ paddingTop: 10, flexDirection: 'row', justifyContent: 'flex-start' }}>
          {teamMembers
            ?.filter(item => item.position !== Position.None)
            .map((item, index) => (
              <PositionIcon
                position={item.position}
                isRecruitDone={IsRecruitDone(item)}
                key={index}
              />
            ))}
        </View>
      </BaseCard>
    </View>
  );
};

export default TeamBanner;
