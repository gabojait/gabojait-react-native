import { StyleProp, TextInputProps, ViewStyle } from 'react-native';
import React from 'react';

export enum ValidatorState {
  valid = 'valid',
  invalid = 'invalid',
  none = 'none',
}

export type InputShape = 'round' | 'underline' | 'none';

export interface CustomInputProps extends TextInputProps {
  placeholder?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  label?: string;
  shape?: InputShape;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  rightChildren?: React.ReactNode;
  validatorResult?: { state: ValidatorState; message?: string | null };
}
