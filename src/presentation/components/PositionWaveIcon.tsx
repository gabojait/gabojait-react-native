import {makeStyles, useTheme} from '@rneui/themed'
import React, {ReactNode} from 'react'
import {Text, View} from 'react-native'
import Wave from './wave'

export interface waveComponenetProps {
  currentCnt: number
  recruitNumber: number
  textView: ReactNode
}

const PositionIcon = ({
  currentCnt: currentCnt = 0,
  recruitNumber: recruitCnt = 1,
  textView,
}: waveComponenetProps) => {
  const styles = useStyles()
  //80이 Wave가 꽉 차보이는 최대 높이이다
  const waveHeight = (currentCnt / recruitCnt) * 80
  return (
    <View style={styles.container}>
      <Wave
        style={styles.waveBall}
        H={waveHeight}
        waveParams={[
          {A: 10, T: 180, fill: 'rgba(28, 223, 113, 0.4)'},
          {A: 15, T: 140, fill: 'rgba(28, 223, 113, 0.6)'},
          {A: 20, T: 100, fill: '#1CDF71'},
        ]}
        animated={true}
      />
      {textView}
    </View>
  )
}

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
    borderColor: theme.colors.primary,
    position: 'absolute',
    paddingHorizontal: 20,
  },
}))

export default PositionIcon
