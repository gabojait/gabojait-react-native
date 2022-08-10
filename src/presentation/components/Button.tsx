import styles from '@/styles'
import {ButtonProps, Theme} from '@rneui/base'
import {Button, useTheme} from '@rneui/themed'
import React from 'react'

export const FilledButton = (
  props: JSX.IntrinsicAttributes &
    ButtonProps & {
      theme?: Theme | undefined
      children?: React.ReactNode
      rounded?: boolean
    },
) => (
  <Button
    {...props}
    buttonStyle={{
      borderRadius: 10,
    }}
    titleStyle={{
      color: 'black',
      marginVertical: 5,
    }}
    disabledTitleStyle={{
      color: 'black',
    }}
  />
)
export const OutlinedButton = (
  props: JSX.IntrinsicAttributes &
    ButtonProps & {
      theme?: Theme | undefined
      children?: React.ReactNode
      radius?: number
      highlighted?: boolean
    },
) => {
  const {theme} = useTheme()
  return (
    <Button
      {...props}
      buttonStyle={[styles.outlinedButton]}
      radius={props.radius}
      type="outline"
      titleStyle={{
        color: props.highlighted ? theme.colors.primary : 'black',
        margin: 12,
      }}
      disabledTitleStyle={{
        color: props.highlighted ? theme.colors.disabled : 'black',
      }}
    />
  )
}