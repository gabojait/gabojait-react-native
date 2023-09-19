import { makeStyles, useTheme, Text } from '@rneui/themed';
import React, { ReactNode, useEffect, useState } from 'react';
import { View } from 'react-native';
import Wave from './wave';
import { theme } from '../theme';

export interface waveComponenetProps {
  currentCnt: number;
  recruitNumber: number;
  textView: ReactNode;
  color?: string;
}

const PositionWaveIcon = ({
  currentCnt: currentCnt = 0,
  recruitNumber: recruitCnt = 1,
  textView,
  color = theme.lightColors?.primary,
}: waveComponenetProps) => {
  const styles = useStyles();
  const { theme } = useTheme();
  //80이 Wave가 꽉 차보이는 최대 높이이다
  const waveHeight = (currentCnt / recruitCnt) * 80;

  function handleColor() {
    if (color == '#D9D9D9') {
      console.log('D9--------------------------');
      console.log(color);
      return [
        { A: 10, T: 180, fill: 'rgba(217, 217, 217, 0.4)' },
        { A: 15, T: 140, fill: 'rgba(217, 217, 217, 0.6)' },
        { A: 20, T: 100, fill: color },
      ];
    } else {
      console.log('1C--------------------------');
      console.log(color);
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
        style={[styles.waveBall, { borderColor: color }]}
        H={waveHeight}
        waveParams={[
          { A: 10, T: 180, fill: 'rgba(28, 223, 113, 0.4)' },
          { A: 15, T: 140, fill: 'rgba(28, 223, 113, 0.4)' },
          { A: 20, T: 100, fill: '#1CDF71' },
        ]}
        animated={true}
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
    width: 70,
    aspectRatio: 1,
    borderRadius: 35,
    overflow: 'hidden',
    borderWidth: 1,
    position: 'absolute',
  },
}));

export default PositionWaveIcon;
