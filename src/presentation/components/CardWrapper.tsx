import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, ViewProps } from 'react-native';
import colors from '@/presentation/res/styles/color';
import { makeStyles, useTheme } from '@rneui/themed';

const CardWrapper = ({
  children,
  style,
  onPress,
  ...props
}: ViewProps & { onPress?: () => void }) => {
  const { theme } = useTheme();
  const styles = useStyles();
  return onPress ? (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.card, style]} {...props}>
        {children}
      </View>
    </TouchableWithoutFeedback>
  ) : (
    <View style={[styles.card, style]} {...props}>
      {children}
    </View>
  );
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
