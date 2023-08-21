import { ButtonProps, Text, useTheme } from '@rneui/themed';
import { StyleSheet, View } from 'react-native';
import { FilledButton } from '../Button';
import React from 'react';
import { SymbolModalContentProps } from './SymbolModalContent';

const SymbolCenteredModalContent: React.FC<SymbolModalContentProps> = props => {
  return (
    <View
      style={[
        { display: 'flex', backgroundColor: 'white', borderRadius: 38 },
        style.modalContainer,
      ]}
    >
      <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center' }}>{props.title}</Text>
      <Text
        style={{
          textAlign: 'center',
          paddingVertical: 16,
          fontSize: 11,
          fontWeight: 'bold',
          lineHeight: 25,
        }}
      >
        {props.text}
      </Text>
      {props.symbol}
      {props.yesButton ? (
        <FilledButton {...props.yesButton} containerStyle={{ marginVertical: 10 }} />
      ) : null}
    </View>
  );
};

const style = StyleSheet.create({
  modalContainer: {
    padding: 20,
  },
});

export default SymbolCenteredModalContent;
