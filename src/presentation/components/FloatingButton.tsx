import { Text, useTheme } from '@rneui/themed';
import React from 'react';
import { PixelRatio, TouchableOpacity, View } from 'react-native';
import CustomIcon from '@/presentation/components/icon/Gabojait';
import { getOwnPropertyDescriptors } from 'immer/dist/internal';
import { ScreenWidth } from '@rneui/base';

interface FloatingButtonProps {
  title?: string;
  onPress?: any;
}
const FloatingButton = ({ title, onPress }: FloatingButtonProps) => {
  const { theme } = useTheme();
  console.log(ScreenWidth);
  return (
    <TouchableOpacity
      style={{
        borderColor: theme.colors.primary,
        borderWidth: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        display: 'flex',
        position: 'absolute',
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(38),
        width:
          ScreenWidth > 350
            ? PixelRatio.getPixelSizeForLayoutSize(38)
            : PixelRatio.getPixelSizeForLayoutSize(50),
        height:
          ScreenWidth > 350
            ? PixelRatio.getPixelSizeForLayoutSize(38)
            : PixelRatio.getPixelSizeForLayoutSize(50),
        marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(2),
        backgroundColor: theme.colors.primary,
      }}
      onPress={() => onPress()}
    >
      <CustomIcon style={{ paddingRight: 5 }} name="pencil" color={theme.colors.white} size={20} />
      <Text style={{ color: theme.colors.white, fontWeight: theme.fontWeight.bold, fontSize: 16 }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default FloatingButton;
