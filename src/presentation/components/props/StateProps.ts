import { StyleProp, TextInputProps, ViewStyle } from 'react-native';

export type ValidatorState = 'valid' | 'invalid' | 'none';

export type InputShape = 'round' | 'underline';

export interface CustomInputProps extends TextInputProps {
  state?: ValidatorState;
  placeholder?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  label?: string;
  shape?: InputShape;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  additionalValidator?: (value?: string) => ValidatorState;
}
