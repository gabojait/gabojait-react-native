import { ButtonProps, Text, useTheme } from '@rneui/themed';
import { StyleSheet, View } from 'react-native';
import { FilledButton } from '../Button';
import React from 'react';
import useGlobalStyles from '@/presentation/styles';
import { WIDTH } from '@/presentation/utils/util';

export interface SymbolModalContentProps {
  title?: string;
  text: string;
  symbol: React.ReactNode;
  yesButton?: ButtonProps;
}

const SymbolModalContent: React.FC<SymbolModalContentProps> = props => {
  const globalStyles = useGlobalStyles();
  const { theme } = useTheme();

  return (
    <View
      style={{
        backgroundColor: 'white',
        paddingHorizontal: 17,
        paddingVertical: 39,
        borderRadius: 20,
        width: WIDTH / 1.7,
      }}
    >
      {props.symbol}
      <Text
        style={{
          fontSize: 14,
          fontWeight: theme.fontWeight.bold,
          textAlign: 'center',
          marginBottom: 18,
        }}
      >
        {props.title}
      </Text>
      <Text style={{ textAlign: 'center', marginBottom: 20, fontSize: theme.fontSize.xs }}>
        {props.text}
      </Text>
      {props.yesButton ? <FilledButton style={{ width: '100%' }} {...props.yesButton} /> : null}
    </View>
  );
};

const style = StyleSheet.create({
  modalContainer: {
    padding: 20,
    backgroundColor: 'white',
  },
});

export default SymbolModalContent;
