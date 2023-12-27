import { View } from 'react-native';
import { ToggleButton } from '@/presentation/components/ToggleButton';
import { ScreenWidth } from '@rneui/base';
import { setPosition } from '@/redux/action/profileActions';
import { Position } from '@/data/model/type/Position';
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  mapKoreanToPosition,
  mapPositionToKorean,
} from '@/presentation/utils/PositionDropdownUtils';
import { Text, useTheme } from '@rneui/themed';
import useGlobalStyles from '@/presentation/styles';

export const EditPosition = () => {
  const positions = [Position.Manager, Position.Backend, Position.Designer, Position.Frontend].map(
    it => {
      return mapPositionToKorean(it);
    },
  );
  const globalStyles = useGlobalStyles();
  const { theme } = useTheme();
  const { data, loading, error } = useAppSelector(state => state.profileReducer.userProfile);
  const currentPosition = data?.position ?? Position.None;
  const dispatch = useAppDispatch();
  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
      <Text style={{ marginBottom: 10, fontSize: 20, fontWeight: '600' }}>희망 포지션</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 25 }}>
        {positions.map(item => {
          return (
            <View style={{ marginEnd: 15 }}>
              <ToggleButton
                title={item}
                titleStyle={{
                  fontSize: theme.fontSize.md,
                  fontWeight: '300',
                  textAlign: 'center',
                  flex: 1,
                }}
                style={{
                  borderRadius: theme.radius.smd,
                  padding: -10,
                  width: ScreenWidth * 0.3,
                  marginBottom: 10,
                  backgroundColor:
                    currentPosition == mapKoreanToPosition(item) ? theme.colors.primary : 'white',
                  height: theme.boxComponentHeight.md,
                }}
                onClick={() => {
                  dispatch(setPosition(mapKoreanToPosition(item) as Position));
                }}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};
