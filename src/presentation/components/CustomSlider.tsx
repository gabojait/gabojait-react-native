import { Text, useTheme } from '@rneui/themed';
import { View } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import React from 'react';

export const CustomSlider = ({
  text,
  value,
  onChangeValue,
  minimumTrackTintColor,
  enabled = false,
  size = 'md',
}: {
  text?: string;
  value: number;
  onChangeValue?: (value: number | number[]) => void;
  minimumTrackTintColor: string;
  enabled?: boolean;
  size?: 'md' | 'lg';
}) => {
  const { theme } = useTheme();
  return (
    <View style={{ width: '100%' }}>
      <Slider
        containerStyle={{
          width: '100%',
          overflow: 'hidden',
          height: theme.sliderSize[size],
          borderWidth: 1,
          borderColor: 'black',
          borderRadius: 7,
        }}
        trackClickable={enabled}
        step={1}
        maximumValue={3}
        trackStyle={{
          height: theme.sliderSize[size],
          borderRadius: 7,
          backgroundColor: 'white',
        }}
        trackMarks={[1, 2]}
        renderTrackMarkComponent={() => (
          <View style={{ width: 1, height: theme.sliderSize.md, backgroundColor: 'black' }} />
        )}
        value={value}
        onValueChange={onChangeValue}
        thumbStyle={{ backgroundColor: 'transparent', width: 0, borderWidth: 0 }}
        minimumTrackTintColor={minimumTrackTintColor}
      />
      <View
        style={{
          height: '100%',
          position: 'absolute',
          left: 5,
          top: 0,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Text>{text}</Text>
      </View>
    </View>
  );
};
