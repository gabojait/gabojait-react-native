import { Position } from '@/data/model/type/Position';
import {Text, useTheme} from '@rneui/themed';
import { PixelRatio, View } from 'react-native';
import { mapToInitial } from '../utils/util';
import React from 'react';
export const PositionIcon: React.FC<{
  position: Position;
  isRecruitDone?: boolean;
  size?: number;
}> = ({ position, isRecruitDone: isDone = false, size = 20 }) => {
  const { theme } = useTheme();
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
      }}
    >
      {
        <Text style={{ fontWeight: theme.fontWeight.bold, fontSize: 30 }}>
          {mapToInitial(position)}
        </Text>
      }
    </View>
  );
};
