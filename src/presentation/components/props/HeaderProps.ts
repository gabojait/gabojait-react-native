import React, {ReactNode} from 'react'

export default class HeaderProps {
  constructor(
    public readonly title: String,
    public readonly canGoBack: Boolean,
    public readonly leftChildren?: ReactNode,
    public readonly rightChildren?: ReactNode,
  ) {}
}
