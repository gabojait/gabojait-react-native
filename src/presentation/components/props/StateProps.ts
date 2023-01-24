import React, {useRef, useState} from 'react'

export interface StateProp{
    state?: 'valid'|'invalid'|'none'
}
export interface CustomInputProps extends StateProp{ 
    inputChange?: any
    style?: any
    placeholder?: string
    size?: 'xs' | 'sm' | 'md' | 'lg'
}