import { CardProps } from '@rneui/base';
import { useTheme } from '@rneui/themed';
import React from 'react';
import { Text, View } from 'react-native';
import PositionRecruiting from '../model/PositionRecruitng';
import { BaseCard } from '@/presentation/components/BaseCard';
import { Position } from '@/data/model/type/Position';
import { mapToInitial } from '@/presentation/utils/util';
import PositionWaveIcon from '@/presentation/components/PositionWaveIcon';
import useGlobalStyles from '@/presentation/styles';

const TeamBanner: React.FC<
  CardProps & {
    teamMembersCnt: PositionRecruiting[];
    teamName: string;
    onArrowPress: () => void;
  }
> = ({ teamMembersCnt: teamMembers, teamName, onArrowPress, containerStyle, wrapperStyle }) => {
  const { theme } = useTheme();
  const IsRecruitDone = (item: PositionRecruiting) => {
    return item.currentCnt === item.recruitCnt;
  };
  const globalStyles = useGlobalStyles();

  return (
    <View style={[containerStyle, { paddingTop: 16 }]}>
      <BaseCard title={teamName} arrowColor={theme.colors.primary} onPress={onArrowPress}>
        <View
          style={{
            paddingTop: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            flex: 1,
          }}
        >
          {teamMembers
            ?.filter(item => item.position !== Position.None)
            .map((item, index) => (
              <PositionWaveIcon
                currentCnt={item.currentCnt}
                recruitNumber={item.recruitCnt}
                textView={
                  <Text style={globalStyles.itnitialText}>{mapToInitial(item.position)}</Text>
                }
                key={item.position}
                radious={theme.positionIconRadious.md}
              />
            ))}
        </View>
      </BaseCard>
    </View>
  );
};

export default TeamBanner;
