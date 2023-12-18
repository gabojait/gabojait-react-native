import React from 'react';
import { StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { makeStyles, Text, useTheme } from '@rneui/themed';
import useGlobalStyles from '@/presentation/styles';

export const ToggleButton = ({
  title,
  titleStyle,
  icon,
  onClick,
  style,
}: {
  title?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  titleStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
}) => {
  const { theme } = useTheme();
  const styles = useStyles();
  const globalStyles = useGlobalStyles();

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={{ flexDirection: 'row', flex: 0, justifyContent: 'center', alignItems: 'center' }}
        onPress={onClick}
      >
        {icon ? <View style={{ marginEnd: 3 }}>{icon}</View> : null}
        <Text numberOfLines={1} style={[globalStyles.textLight13, titleStyle, { flex: 0 }]}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.sm,
    padding: 6,
    flexDirection: 'row',
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
