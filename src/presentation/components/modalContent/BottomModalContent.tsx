import { ButtonProps, KeyboardAvoidingView, TouchableOpacity, View } from 'react-native';
import { FilledButton } from '../Button';
import React, { ReactNode } from 'react';
import { makeStyles, Text, useTheme } from '@rneui/themed';
import useGlobalStyles from '@/presentation/styles';
import useModal from '../modal/useModal';
import { HEIGHT } from '@/presentation/utils/util';

export interface BottomSlideModalContentProps {
  header?: string | ReactNode;
  children?: ReactNode;
  neverSeeAgainShow?: boolean;
  yesButton?: ButtonProps;
  noButton?: ButtonProps;
  onNeverSeeAgainPress?: () => void;
  onBackgroundPress?: () => void;
  visible?: boolean;
}

const BottomModalContent: React.FC<BottomSlideModalContentProps> = props => {
  const { theme } = useTheme();
  const globalStyles = useGlobalStyles();
  const style = useStyles(theme);

  return (
    <>
      <TouchableOpacity
        style={{
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          position: 'absolute',
          zIndex: 50,
          justifyContent: 'flex-end',
        }}
        onPress={() => {
          console.log('onBackgroundPress');
          props.onBackgroundPress?.();
        }}
      />
      <KeyboardAvoidingView
        behavior="position"
        style={{
          width: '100%',
          justifyContent: 'flex-end',
          zIndex: 51,
          position: 'absolute',
          bottom: 0,
        }}
      >
        <View style={[style.modal, { paddingHorizontal: 20, paddingBottom: 70 }]}>
          {props.header}
          <View style={[style.children, { width: '100%' }]}>{props.children}</View>
          <View style={{ width: '100%', paddingTop: 20 }}>
            {props.yesButton ? (
              <FilledButton
                style={style.button}
                buttonStyle={{ backgroundColor: theme.colors.primary, width: '100%' }}
                titleStyle={style.title}
                title={props.yesButton?.title}
                onPress={props.yesButton?.onPress}
                size="xs"
              />
            ) : (
              <></>
            )}
            {props.noButton ? (
              <FilledButton
                style={[style.button, { paddingBottom: 10 }]}
                buttonStyle={{ backgroundColor: theme.colors.disabled, width: '100%' }}
                titleStyle={style.title}
                title={props.noButton?.title}
                onPress={props.noButton?.onPress}
                size="xs"
              />
            ) : (
              <></>
            )}
            {props.neverSeeAgainShow ? (
              <TouchableOpacity
                style={{ paddingVertical: 7 }}
                onPress={() => {
                  props.onNeverSeeAgainPress?.();
                }}
              >
                <Text style={style.neverSeeText}>다시보지 않기</Text>
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

const useStyles = makeStyles(theme => {
  return {
    modal: {
      width: '100%',
      backgroundColor: 'white',
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      paddingTop: 46,
    },
    button: {
      paddingVertical: 7,
    },
    children: {
      paddingTop: 10,
      alignItems: 'center',
    },
    title: {
      fontSize: theme.fontSize.md,
      fontWeight: theme.fontWeight.bold,
      color: theme.colors.black,
    },
    neverSeeText: {
      color: theme.colors.black,
      paddingBottom: 7,
      textAlign: 'center',
    },
  };
});

export default BottomModalContent;
