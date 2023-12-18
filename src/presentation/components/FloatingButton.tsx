import { Text, useTheme } from '@rneui/themed';
import React from 'react';
import { PixelRatio, TouchableOpacity } from 'react-native';
import CustomIcon from '@/presentation/components/icon/Gabojait';
import { ScreenWidth } from '@rneui/base';
import { WIDTH } from '@/presentation/utils/util';

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
        width: WIDTH * 0.264,
        height: WIDTH * 0.264,
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
