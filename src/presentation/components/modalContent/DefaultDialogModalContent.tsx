import { Button, ButtonProps, Text, useTheme } from '@rneui/themed';
import { Alert, Modal, StyleSheet, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { FilledButton } from '../Button';
import React from 'react';

interface DefaultDialogModalContentProps {
  title?: string;
  text: string;
  yesButton?: ButtonProps;
  noButton?: ButtonProps;
}

const DefaultDialogModalContent: React.FC<DefaultDialogModalContentProps> = props => {
  const { theme } = useTheme();
  return (
    <View style={style.container}>
      {props.title && (
        <Text h3 style={{ textAlign: 'center', marginVertical: 10, marginBottom: 20 }}>
          {props.title}
        </Text>
      )}
      <Text style={{ margin: 20, marginTop: 0, fontSize: theme.fontSize.md, textAlign: 'center' }}>
        {props.text}
      </Text>
      {props.yesButton ? <FilledButton {...props.yesButton} /> : null}
      {props.noButton ? <FilledButton {...props.noButton} /> : null}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
  },
});

export default DefaultDialogModalContent;
