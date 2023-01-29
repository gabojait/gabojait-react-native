import React, {useRef, useState} from 'react'

export type ValidatorState = 'valid' | 'invalid' | 'none'
export interface CustomInputProps {
  state: ValidatorState
  inputChange?: any
  style?: any
  placeholder?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  label?: string
  isForPassword?: boolean
}
