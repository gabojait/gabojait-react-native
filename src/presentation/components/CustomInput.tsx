import { Icon, Input, makeStyles, Text, useTheme } from '@rneui/themed';
import React, { forwardRef, useMemo, useState } from 'react';
import { View } from 'react-native';
import color from '../res/styles/color';
import { CustomInputProps, ValidatorState } from '@/presentation/components/props/StateProps';

const CustomInput = forwardRef(
  (
    {
      size = 'sm',
      shape = 'underline',
      placeholder,
      inputContainerStyle,
      rightChildren,
      validatorResult = { state: ValidatorState.none },
      ...props
    }: CustomInputProps,
    ref: React.ForwardedRef<any>,
  ) => {
    const [secure, setSecure] = useState(true);
    const styles = useStyles({ size, shape, value: props.value, validatorResult });
    const iconColors = {
      none: color.transparent,
      valid: color.primary,
      invalid: color.transparent,
    };

    const inputIcon = props.secureTextEntry ? (
      <Icon
        name={secure ? 'eye-off-outline' : 'eye-outline'}
        onPress={() => {
          setSecure(prevState => !prevState);
        }}
        type="ionicon"
        color={color.darkGrey}
      />
    ) : (
      <Icon
        name="checkmark-circle-outline"
        type="ionicon"
        size={18}
        color={iconColors[validatorResult.state]}
      />
    );
    const { theme } = useTheme();

    return (
      <View style={[{ marginBottom: theme.spacing.xs }, props.containerStyle]}>
        <View
          style={{
            width: '100%',
            justifyContent: 'flex-end',
            flexDirection: 'row',
          }}
        >
          <View style={{ flex: 5 }}>
            <Input
              {...props}
              ref={ref}
              disabled={props.disabled}
              containerStyle={[styles.container, { marginBottom: 0 }]}
              inputContainerStyle={[
                shape === 'underline'
                  ? styles.underlineInputContainer
                  : shape === 'round'
                  ? styles.roundInputContainer
                  : { borderBottomWidth: 0 },
                inputContainerStyle,
              ]}
              style={[
                shape === 'underline'
                  ? styles.underlineInput
                  : shape === 'round'
                  ? styles.roundInput
                  : { borderBottomWidth: 0 },
                props.style,
              ]}
              placeholderTextColor={color.grey}
              placeholder={placeholder}
              rightIcon={inputIcon}
              secureTextEntry={props.secureTextEntry ? secure : false}
              labelStyle={styles.label}
              renderErrorMessage={false}
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect={false}
            />
          </View>
          <View
            id={'rightChildren'}
            style={{
              flexDirection: 'column',
              alignContent: 'stretch',
              alignItems: 'stretch',
              marginStart: theme.spacing.xs,
            }}
          >
            {rightChildren && rightChildren}
          </View>
        </View>
        {
          <Text
            style={{
              color: theme.colors.error,
              marginTop: theme.spacing.xs,
              marginStart: theme.spacing.sm,
            }}
          >
            {validatorResult.message && validatorResult.message}
          </Text>
        }
      </View>
    );
  },
);

export default CustomInput;

const useStyles = makeStyles(
  (
    theme,
    {
      shape = 'underline',
      size = 'md',
      validatorResult = { state: ValidatorState.none },
      value,
    }: CustomInputProps,
  ) => {
    const shapeToColors = {
      underline: {
        none: color.lightGrey,
        valid: color.primary,
        invalid: color.error,
      },
      round: {
        none: color.grey,
        valid: color.primary,
        invalid: color.error,
      },
      none: {
        none: color.grey,
        valid: color.primary,
        invalid: color.error,
      },
    };

    const state = validatorResult.state;
    return {
      roundInputContainer: {
        borderWidth: 1.3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: shapeToColors[shape][state],
        borderRadius: theme.radius[size],
        padding: 3,
        // paddingStart: 0,
        paddingEnd: 10,
      },
      roundInput: {
        padding: 12,
        flex: 1,
      },
      container: { paddingHorizontal: 0, marginBottom: 0 },
      underlineInputContainer: {
        borderBottomWidth: 1.3,
        borderBottomColor: shapeToColors[shape][state],
        marginEnd: 10,
      },
      underlineInput: {
        flex: 10,
        fontSize: theme.fontSize.xs,
      },
      icon: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: theme.spacing.sm,
      },
      label: {
        fontSize: theme.fontSize.md,
        color: color.grey2,
      },
    };
  },
);
