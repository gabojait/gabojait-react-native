import { makeStyles, Text } from '@rneui/themed';
import React from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import CustomIcon from '@/presentation/components/icon/Gabojait';
import CardWrapper from './CardWrapper';

export const ArrowCard = ({
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
              <View>{children}</View>
            </View>
          </View>
          <CustomIcon
            name="arrow-next"
            size={30}
            style={{
              paddingEnd: 5,
            }}
            color={arrowColor}
          />
        </View>
      </CardWrapper>
    </TouchableOpacity>
  );
};
const useStyles = makeStyles(theme => ({
  card: {
    borderWidth: 1,
    borderColor: theme.colors.disabled,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    borderRadius: 20,
    paddingVertical: 25,
    paddingStart: 25,
    display: 'flex',
  },
  title: {
    justifyContent: 'flex-start',
    fontWeight: theme.fontWeight.bold,
    fontSize: theme.fontSize.md,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
}));
