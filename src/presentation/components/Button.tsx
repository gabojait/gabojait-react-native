import { Button, useTheme, ButtonProps } from '@rneui/themed';
import React from 'react';
import { FontWeight, theme } from '../theme';
import useGlobalStyles from '../styles';

const sizeToRadius = (size: string) => (size == 'sm' || size == 'md' ? 'sm' : 'lg');

interface CustomButtomProps extends Omit<ButtonProps, 'size'> {
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

interface FilledButtonProps extends CustomButtomProps {
  fontWeight?: FontWeight;
}

interface OutlinedButtonProps extends CustomButtomProps {
  shadow?: boolean;
  highlighted?: boolean;
}

/**
 * FilledButton은 sm 사이즈만 fontWeight가 semibold입니다.
 */
const FilledButton: React.FC<FilledButtonProps> = ({
  size = 'md',
  fontWeight = size == 'sm' ? theme.fontWeight?.semibold : theme.fontWeight?.bold,
  ...props
}) => {
  const { theme } = useTheme();
  const styles = useGlobalStyles();
  return (
    <Button
      {...props}
      radius={10}
      titleStyle={[
        {
          color: 'black',
          fontWeight: fontWeight,
          fontSize: theme.fontSize[size],
        },
        props.titleStyle,
      ]}
      disabledTitleStyle={[
        {
          color: 'black',
        },
        props.disabledTitleStyle,
      ]}
      containerStyle={[styles.buttonContainer, props.containerStyle]}
      activeOpacity={1}
    />
  );
};

/**
 * OutlinedButton은..
 *
 * xs 사이즈만 그림자가 안들어갑니다.
 *
 * md/sm 사이즈만 fontWeight가 semibold입니다.
 */
const OutlinedButton: React.FC<OutlinedButtonProps> = ({
  size = 'md',
  shadow = size != 'xs',
  highlighted = false,
  ...props
}) => {
  const { theme } = useTheme();
  const styles = useGlobalStyles();
  return (
    <Button
      {...props}
      buttonStyle={[
        styles.outlinedButton,
        {
          borderRadius: theme.radius[size],
          padding: theme.spacing[size],
          paddingHorizontal: theme.spacing[size],
        },
        props.style,
      ]}
      type="outline"
      titleStyle={[
        {
          color: theme.colors.primary,
          fontSize: theme.fontSize[size],
          margin: 0,
        },
        props.titleStyle,
      ]}
      containerStyle={[shadow ? styles.buttonShadow : null, styles.buttonContainer, props.style]}
      disabledTitleStyle={{
        color: theme.colors.grey1,
      }}
      activeOpacity={1}
    />
  );
};

export { FilledButton, OutlinedButton };
