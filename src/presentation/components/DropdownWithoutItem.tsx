import {StyleProp, TouchableOpacity, View, ViewProps, ViewStyle} from 'react-native';
import React from 'react';
import { makeStyles, Text } from '@rneui/themed';
import Icon from 'react-native-vector-icons/Ionicons';

interface DateDropdownProps {
  text: string;
  style?: StyleProp<ViewStyle>;
  onClick: () => void;
}

const DateDropdown: React.FC<DateDropdownProps> = ({ text, style, onClick }) => {
  const styles = useStyles();
  return (
    <TouchableOpacity onPress={onClick}>
      <View style={[styles.dateDropdown, style]}>
        <Text style={{ alignSelf: 'baseline' }}>{text}</Text>
        <Icon name="chevron-down-outline" size={18} />
      </View>
    </TouchableOpacity>
  );
};

const useStyles = makeStyles((theme, props: DateDropdownProps) => ({
  dateDropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: theme.colors.grey1,
    padding: 12,
    borderRadius: 10,
  },
}));
export default DateDropdown;
