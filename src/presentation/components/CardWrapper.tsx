import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '@/presentation/res/styles/color';
import { makeStyles, useTheme } from '@rneui/themed';

const CardWrapper = ({ children, style }: any) => {
  const { theme } = useTheme();
  const styles = useStyles();
  return <View style={[styles.card, style]}>{children}</View>;
};

export default CardWrapper;

const useStyles = makeStyles(theme => ({
  card: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 20,
    elevation: 5,
    borderColor: theme.colors.grey2,
    borderWidth: 1,
  },
}));
