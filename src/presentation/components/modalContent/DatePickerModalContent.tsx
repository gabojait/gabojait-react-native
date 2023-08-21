import { Button, CheckBox, Text, useTheme } from '@rneui/themed';
import { Alert, Modal, StyleSheet, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { FilledButton } from '../Button';
import React, { ReactNode, useState } from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useAppSelector } from '@/redux/hooks';
import { profileReducer } from '@/redux/reducers/profileReducer';
import useModal from '../modal/useModal';

export interface DatePickerModalProps {
  title?: ReactNode;
  doneButtonText: string;
  onModalVisibityChanged: (visibility: boolean, isCurrent: boolean) => void;
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
  isCurrent: initialIsCurrent = false,
  setIsCurrent: osIsCurrentChange,
  isCurrentCheckable = false,
  ...props
}) => {
  const { theme } = useTheme();
  const [isCurrent, setIsCurrent] = useState(initialIsCurrent);

  const handleIsCurrentChange = (newValue: boolean) => {
    setIsCurrent(newValue);
    osIsCurrentChange?.(newValue);
  };

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
      {isCurrentCheckable && (
        <CheckBox
          checked={isCurrent}
          onPress={() => {
            handleIsCurrentChange(!isCurrent);
          }}
          checkedIcon={<MaterialIcon name="check-box" size={18} color={theme.colors.primary} />}
          uncheckedIcon={
            <MaterialIcon name="check-box-outline-blank" size={18} color={theme.colors.grey2} />
          }
          title="현재 진행중"
        />
      )}
      <View style={{ flexDirection: 'row', display: 'flex' }}>
        <FilledButton
          title={props.doneButtonText}
          containerStyle={style.buttonContainerStyle}
          titleStyle={{ color: '#FFFFFF' }}
          buttonStyle={style.buttonStyle}
          onPress={() => {
            props.onModalVisibityChanged(false, isCurrent);
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
