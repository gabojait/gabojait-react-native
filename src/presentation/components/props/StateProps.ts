import React, {Ref, useRef, useState} from 'react'
import {View} from 'react-native'
import {RegisterInput} from '../RegisterInput'

export type ValidatorState = 'valid' | 'invalid' | 'none' 

export interface CustomInputProps {
  state?: ValidatorState
  style?: any
  placeholder?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  label?: string
  isForPassword?: boolean
}