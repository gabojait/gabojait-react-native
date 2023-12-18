import { CustomInputProps } from '@/presentation/components/props/StateProps';
import React, { forwardRef, useState } from 'react';
import { Input } from '@rneui/base';
import CustomInput from '@/presentation/components/CustomInput';
import {
  BottomInputModalContent,
  BottomInputModalContentProps,
} from '@/presentation/components/modalContent/BottomInputModalContent';

export type InputModalProps = BottomInputModalContentProps & {
  inputProps?: CustomInputProps;
  inputProcessor?: (text: string) => string;
};
export const InputModalContent = forwardRef(
  (
    {
      headerComponent,
      inputWrapper,
      ...props
    }: InputModalProps & {
      headerComponent?: React.ReactNode;
      inputWrapper?: (children: React.ReactNode) => React.ReactNode;
    },
    ref: React.ForwardedRef<Input>,
  ) => {
    const [input, setInput] = useState('');
    const { inputProps, inputProcessor, ...bottomInputModalContentProps } = props;
    const inputComponent = () => (
      <CustomInput
        ref={ref}
        value={input}
        shape="round"
        onChangeText={value => {
          setInput(inputProcessor ? inputProcessor(value) : value);
        }}
        {...props.inputProps}
      />
    );
    return (
      <BottomInputModalContent
        inputContent={inputComponent()}
        header={bottomInputModalContentProps.header}
        yesButton={bottomInputModalContentProps.yesButton}
        noButton={bottomInputModalContentProps.noButton}
        onBackgroundPress={bottomInputModalContentProps.onBackgroundPress}
        content={bottomInputModalContentProps.content}
        onInputValueChange={bottomInputModalContentProps.onInputValueChange}
      />
    );
  },
);
