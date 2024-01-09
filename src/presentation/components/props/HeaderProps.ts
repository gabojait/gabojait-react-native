import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export type TitleTextAlign = 'left' | 'right' | 'top' | 'bottom' | 'center';

export default class HeaderProps {
  constructor(
    public readonly title: String,
    public readonly canGoBack: Boolean,
    public readonly leftChildren?: ReactNode,
    public readonly rightChildren?: ReactNode | any,
    public readonly align?: TitleTextAlign,
    public readonly headerstyle?: StyleProp<ViewStyle>,
  ) {}
}
