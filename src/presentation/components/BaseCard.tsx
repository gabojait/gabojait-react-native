import { makeStyles, Text } from '@rneui/themed';
import React from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import CardWrapper from './CardWrapper';

export const BaseCard = ({
  title,
  arrowColor = 'black',
  children,
  onPress,
  style,
}: {
  title: string;
  arrowColor?: string;
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}) => {
  const styles = useStyles();
  return (
    <TouchableOpacity onPress={onPress}>
      <CardWrapper style={[styles.card, style]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            paddingTop: 21,
            paddingHorizontal: 24,
            paddingBottom: 32,
          }}
        >
          <View style={{ flex: 9 }}>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              {title}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View style={{ flex: 1 }}>{children}</View>
            </View>
          </View>
        </View>
      </CardWrapper>
    </TouchableOpacity>
  );
};
const useStyles = makeStyles(theme => ({
  card: {
    borderWidth: 1,
    borderColor: theme.colors.grey2,
    backgroundColor: 'white',
    borderRadius: 20,
    display: 'flex',
  },
  title: {
    justifyContent: 'flex-start',
    fontWeight: theme.fontWeight.bold,
    fontSize: theme.fontSize.md,
    paddingBottom: 16,
  },
}));
