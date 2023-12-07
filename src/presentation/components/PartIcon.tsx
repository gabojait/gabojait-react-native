import { Position } from '@/data/model/type/Position';
import { Text, useTheme } from '@rneui/themed';
import { PixelRatio, View } from 'react-native';
import { mapToInitial } from '../utils/util';
import React from 'react';
import useGlobalStyles from '@/presentation/styles';
import PositionWaveIcon, { WaveComponentProps } from '@/presentation/components/PositionWaveIcon';

export const PositionIcon: React.FC<
  {
    position: Position;
    isRecruitDone?: boolean;
    radious?: number;
  } & WaveComponentProps
> = ({
  position,
  isRecruitDone: isDone = false,
  radious = 30,
  currentCnt,
  recruitNumber,
  color,
}) => {
  const { theme } = useTheme();

  return (
    // <View
    //   style={{
    //     borderColor: theme.colors.primary,
    //     borderWidth: 1,
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     borderRadius: radious,
    //     width: radious * 2,
    //     height: radious * 2,
    //     marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(2),
    //     backgroundColor: isDone ? theme.colors.primary : 'white',
    //   }}
    // >
    //   <PositionInitialTextView position={position} />
    // </View>
    <View style={{ paddingHorizontal: radious * 0.8 }}>
      {isDone ? (
        <NoneWaveIcon radious={radious} position={position} />
      ) : (
        <PositionWaveIcon
          currentCnt={currentCnt}
          recruitNumber={recruitNumber}
          textView={<PositionInitialTextView position={position} />}
          radious={radious}
        />
      )}
    </View>
  );
};
const PositionInitialTextView = ({ position }: { position: Position }) => {
  const globalStyles = useGlobalStyles();
  return <Text style={globalStyles.itnitialText}>{mapToInitial(position)}</Text>;
};

const NoneWaveIcon = ({ radious, position }: { radious: number; position: Position }) => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        borderColor: theme.colors.primary,
        borderWidth: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: radious,
        width: radious * 2,
        height: radious * 2,
        marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(2),
        backgroundColor: theme.colors.primary,
      }}
    >
      <PositionInitialTextView position={position} />
    </View>
  );
};
