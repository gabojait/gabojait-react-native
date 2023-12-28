import { makeStyles, useTheme } from '@rneui/themed';
import React, { ReactNode } from 'react';
import { View } from 'react-native';
import Wave from './wave';
import { theme } from '../theme';

export interface WaveComponentProps {
  currentCnt?: number;
  recruitNumber?: number;
  textView?: ReactNode;
  color?: string;
  radious: number;
}

const PositionWaveIcon = ({
  currentCnt: currentCnt = 0,
  recruitNumber: recruitCnt = 1,
  textView,
  color = theme.lightColors?.primary,
  radious,
}: WaveComponentProps) => {
  const styles = useStyles();
  const { theme } = useTheme();
  //80이 Wave가 꽉 차보이는 최대 높이이다
  const waveHeight = recruitCnt !== 0 ? (currentCnt / recruitCnt) * 80 : 0;

  function handleColor() {
    if (color == '#D9D9D9') {
      return [
        { A: 10, T: 180, fill: 'rgba(217, 217, 217, 0.4)' },
        { A: 15, T: 140, fill: 'rgba(217, 217, 217, 0.6)' },
        { A: 20, T: 100, fill: color },
      ];
    } else {
      return [
        { A: 10, T: 180, fill: 'rgba(28, 223, 113, 0.4)' },
        { A: 15, T: 140, fill: 'rgba(28, 223, 113, 0.6)' },
        { A: 20, T: 100, fill: '#1CDF71' },
      ];
    }
  }

  return (
    <View style={styles.container}>
      <Wave
        style={[styles.waveBall, { borderColor: color, width: radious * 2 }]}
        H={waveHeight}
        waveParams={[
          { A: 10, T: 180, fill: 'rgba(28, 223, 113, 0.4)' },
          { A: 15, T: 140, fill: 'rgba(28, 223, 113, 0.4)' },
          { A: 20, T: 100, fill: '#1CDF71' },
        ]}
        animated={true}
        theme={theme}
      />
      {textView}
    </View>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  waveBall: {
    aspectRatio: 1,
    borderRadius: 35,
    overflow: 'hidden',
    borderWidth: 1,
    position: 'absolute',
  },
}));

export default PositionWaveIcon;
