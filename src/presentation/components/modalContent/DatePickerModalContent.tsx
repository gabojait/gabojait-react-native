import { Button, CheckBox, Text, useTheme } from '@rneui/themed';
import { Alert, Modal, StyleSheet, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { FilledButton } from '../Button';
import React, { ReactNode } from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

interface DatePickerModalProps {
  title?: ReactNode;
  doneButtonText: string;
  onModalVisibityChanged: (visibility: boolean) => void;
  date: Date;
  onDatePicked: (date: Date) => void;
  isCurrent?: boolean;
  setIsCurrent?: (isCurrent: boolean) => void;
  isCurrentCheckable?: boolean;
  maximumDate?: Date;
  minimumDate?: Date;
}

const DatePickerModalContent: React.FC<DatePickerModalProps> = ({
  title,
  isCurrent = false,
  setIsCurrent,
  isCurrentCheckable = false,
  ...props
}) => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        margin: 30,
      }}
    >
      <View style={{ margin: 20 }}>
        <Text h3 style={{ textAlign: 'center' }}>
          {title}
        </Text>
      </View>
      <DatePicker
        mode="date"
        date={props.date}
        androidVariant="nativeAndroid"
        onDateChange={props.onDatePicked}
        maximumDate={props.maximumDate}
        minimumDate={props.minimumDate}
      />

      <View style={{ flexDirection: 'row', display: 'flex' }}>
        <FilledButton
          title={props.doneButtonText}
          containerStyle={style.buttonContainerStyle}
          titleStyle={{ color: '#FFFFFF' }}
          buttonStyle={style.buttonStyle}
          onPress={() => {
            props.onModalVisibityChanged(false);
          }}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  buttonStyle: {
    borderRadius: 20,
    borderTopStartRadius: 0,
    borderTopEndRadius: 0,
    paddingVertical: 25,
  },
  buttonContainerStyle: {
    padding: 0,
    width: '100%',
    borderTopStartRadius: 0,
    borderTopEndRadius: 0,
  },
});

export default DatePickerModalContent;
