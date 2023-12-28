import { ButtonProps, Text, useTheme } from '@rneui/themed';
import { StyleSheet, View } from 'react-native';
import { FilledButton } from '../Button';
import React from 'react';
import { WIDTH } from '@/presentation/utils/util';
import useGlobalStyles from '@/presentation/styles';

interface DefaultDialogModalContentProps {
  title?: string;
  text: string;
  yesButton?: ButtonProps;
  noButton?: ButtonProps;
}

const DefaultDialogModalContent: React.FC<DefaultDialogModalContentProps> = props => {
  const { theme } = useTheme();
  const globalstyles = useGlobalStyles();
  return (
    <View style={style.container}>
      {props.title && (
        <Text
          style={[
            { textAlign: 'center', marginVertical: 10, marginBottom: 20 },
            globalstyles.modalTitle,
          ]}
        >
          {props.title}
        </Text>
      )}
      <Text
        style={[
          { margin: 20, marginTop: 0, fontSize: theme.fontSize.md, textAlign: 'center' },
          globalstyles.modalContent,
        ]}
      >
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
    width: WIDTH / 1.7,
  },
});

export default DefaultDialogModalContent;
