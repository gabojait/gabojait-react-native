import React, { ReactNode } from 'react';

export type TitleTextAlign = 'left' | 'right' | 'top' | 'bottom' | 'center';

export default class HeaderProps {
  constructor(
    public readonly title: String,
    public readonly canGoBack: Boolean,
    public readonly leftChildren?: ReactNode,
    public readonly rightChildren?: ReactNode | any,
    public readonly align?: TitleTextAlign,
  ) {}
}
