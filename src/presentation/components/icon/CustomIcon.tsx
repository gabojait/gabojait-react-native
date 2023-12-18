import { IconProps } from 'react-native-vector-icons/Icon';
import { useTheme } from '@rneui/themed';
import CustomIcon from '@/presentation/components/icon/Gabojait';
import React from 'react';
import { View } from 'react-native';

export const SquareIcon = ({ ...props }: IconProps) => {
  const { theme } = useTheme();

  return <CustomIcon name="plus-square" size={props.size} color={theme.colors.grey1} />;
};
export const DeleteIcon = ({ ...props }: IconProps) => {
  const { theme } = useTheme();
  return (
    <View style={{ position: 'relative' }}>
      <CustomIcon
        style={{ position: 'absolute' }}
        name="close-square"
        size={props.size}
        color={theme.colors.grey1}
      />
      <CustomIcon name="empty-square" size={props.size} color={theme.colors.grey1} />
    </View>
  );
};

export const ProjectIcon = ({ ...props }: IconProps) => {
  const { theme } = useTheme();
  return <CustomIcon name="project" size={props.size} color={'black'} />;
};
