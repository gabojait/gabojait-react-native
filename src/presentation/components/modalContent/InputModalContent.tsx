import BottomModalContent, {
  BottomSlideModalContentProps,
} from '@/presentation/components/modalContent/BottomModalContent';
import { CustomInputProps } from '@/presentation/components/props/StateProps';
import React, { forwardRef, useState } from 'react';
import { Input } from '@rneui/base';
import CustomInput from '@/presentation/components/CustomInput';

export type InputModalProps = BottomSlideModalContentProps & {
  inputProps?: CustomInputProps;
  inputProcessor?: (text: string) => string;
};
export const InputModalContent = forwardRef(
  (
    {
      inputWrapper,
      ...props
    }: InputModalProps & { inputWrapper?: (children: React.ReactNode) => React.ReactNode },
    ref: React.ForwardedRef<Input>,
  ) => {
    const [input, setInput] = useState('');
    const inputComponent = () => (
      <CustomInput
        ref={ref}
        value={input}
        onChangeText={value => {
          setInput(props.inputProcessor ? props.inputProcessor(value) : value);
        }}
        {...props.inputProps}
      />
    );
    return (
      <BottomModalContent {...props}>
        {inputWrapper ? inputWrapper(inputComponent()) : inputComponent()}
      </BottomModalContent>
    );
  },
);
