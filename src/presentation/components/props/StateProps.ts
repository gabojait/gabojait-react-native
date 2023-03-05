import React, {Ref, useRef, useState} from 'react'
import {StyleProp, View, ViewStyle} from 'react-native'
import {RegisterInput} from '../RegisterInput'

export type ValidatorState = 'valid' | 'invalid' | 'none'

export interface CustomInputProps {
  state?: ValidatorState
  style?: any
  containerStyle?: StyleProp<ViewStyle>
  placeholder?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  label?: string
  isForPassword?: boolean
}
