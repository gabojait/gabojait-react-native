import styles from '@/styles'
import {theme} from '@/theme'
import {Button, useTheme, ButtonProps} from '@rneui/themed'
import React from 'react'

const sizeToRadius = (size: string) => (size == 'sm' || size == 'md' ? 'sm' : 'lg')
/**
 * FilledButton은 sm 사이즈만 fontWeight가 semibold입니다.
 */
const FilledButton = (props: ButtonProps) => {
  const size = props.size ?? 'md' // Default Size: md
  const fontWeight = size == 'sm' ? theme.fontWeight?.semibold : theme.fontWeight?.bold
  return (
    <Button
      {...props}
      radius={10}
      titleStyle={{
        color: 'black',
        fontWeight: fontWeight,
      }}
      disabledTitleStyle={{
        color: 'black',
      }}
      containerStyle={styles.buttonContainer}
      activeOpacity={1}
    />
  )
}
/**
 * OutlinedButton은.. 
 * 
 * sm 사이즈만 그림자가 들어갑니다.
 * 
 * md/sm 사이즈만 fontWeight가 semibold입니다.
 */
const OutlinedButton = (props: ButtonProps & {shadow?: boolean}) => {
  const {theme} = useTheme()
  const size = props.size ?? 'md' // Default Size: md
  const shadow = props.shadow || size == 'sm'

  return (
    <Button
      {...props}
      buttonStyle={[
        styles.outlinedButton,
        {
          borderRadius: theme.radius[size]
        },
      ]}
      type="outline"
      titleStyle={{
        color: theme.colors.primary,
      }}
      containerStyle={[shadow ? styles.buttonShadow : null, styles.buttonContainer]}
      disabledTitleStyle={{
        color: theme.colors.grey0,
      }}
      activeOpacity={1}
    />
  )
}

export {FilledButton, OutlinedButton}
