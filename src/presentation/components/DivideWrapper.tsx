import React from 'react';
import { View, StyleSheet, StyleProp, ViewProps } from 'react-native';
import colors from '@/presentation/res/styles/color';
import { makeStyles, useTheme } from '@rneui/themed';

interface DivideWrapperProps {
  children: any;
  style?: any;
  color?: any;
}

const DivideWrapper = ({ children, style }: DivideWrapperProps) => {
  const { theme } = useTheme();
  const styles = useStyles();
  return (
    <View style={[styles.card, style]}>
      {React.Children.map(children, (child, index) =>
        index != children.length - 1 ? (
          <View style={[styles.element]}>{child}</View>
        ) : (
          <View style={[styles.last_element]}>{child}</View>
        ),
      )}
    </View>
  );
};

const useStyles = makeStyles(theme => ({
  card: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: theme.colors.grey2,
    width: '100%',
    height: 100,
    borderRadius: 14,
    borderWidth: 1,
    elevation: 5,
    marginVertical: 5,
  },
  element: {
    flex: 1,
    height: '100%',
    borderWidth: 1,
    borderTopColor: colors.transparent,
    borderBottomColor: colors.transparent,
    borderLeftColor: colors.transparent,
    borderRightColor: colors.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  last_element: {
    flex: 1,
    height: '100%',
    borderWidth: 1,
    borderColor: colors.transparent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
}));

export default DivideWrapper;
