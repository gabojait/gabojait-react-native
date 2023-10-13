import useGlobalStyles from '@/presentation/styles';
import { Text, makeStyles, useTheme } from '@rneui/themed';
import { BottomSlideModalContentProps } from './BottomModalContent';
import { HEIGHT, WIDTH } from '@/presentation/utils/util';
import { TouchableOpacity, KeyboardAvoidingView, View, TextInput } from 'react-native';
import { FilledButton } from '../Button';
import React, { useState } from 'react';
import CardWrapper from '../CardWrapper';
import styles from '@/presentation/styles';

export interface BottomInputModalContentProps extends BottomSlideModalContentProps {
  content?: string;
  onInputValueChange: (text: string) => void | undefined;
}

export const BottomInputModalContent: React.FC<BottomInputModalContentProps> = ({
  header: title,
  children,
  neverSeeAgainShow,
  yesButton,
  noButton,
  onNeverSeeAgainPress,
  onBackgroundPress,
  content,
  onInputValueChange,
}) => {
  const { theme } = useTheme();
  const globalStyles = useGlobalStyles();
  const style = useStyles(theme);
  const [reportState, setReportState] = useState({ text: '' });

  return (
    <>
      <TouchableOpacity
        style={{
          flex: 1.1,
          width: '100%',
          justifyContent: 'flex-end',
        }}
        onPress={() => {
          console.log('onBackgroundPress');
          onBackgroundPress?.();
        }}
      />
      <KeyboardAvoidingView
        behavior="position"
        style={{
          flex: 1,
          width: '100%',
          justifyContent: 'flex-end',
        }}
      >
        <View style={[style.modal, { paddingHorizontal: 20 }]}>
          <Text style={style.title}>{title}</Text>
          <View style={[style.children, { width: '100%' }]}>
            <View style={{ justifyContent: 'center', alignContent: 'center', width: '100%' }}>
              <Text style={[globalStyles.textLight13, { textAlign: 'center', paddingBottom: 29 }]}>
                {content}
              </Text>
              <CardWrapper style={{ height: HEIGHT / 8, maxWidth: WIDTH - 40 }}>
                <TextInput
                  value={reportState.text}
                  style={{ width: '100%', padding: 24 }}
                  onChangeText={(text: string) => {
                    setReportState({ text: text });
                    onInputValueChange(text);
                  }}
                  multiline={true}
                  maxLength={500}
                />
              </CardWrapper>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 10,
                }}
              >
                <FilledButton
                  style={{ paddingVertical: 7 }}
                  buttonStyle={{ backgroundColor: theme.colors.primary, width: WIDTH / 2 - 27 }}
                  title={noButton?.title}
                  titleStyle={style.buttonTitle}
                  onPress={() => noButton?.onPress()}
                  size="xs"
                />
                <FilledButton
                  style={{ paddingVertical: 7 }}
                  buttonStyle={{ backgroundColor: theme.colors.disabled, width: WIDTH / 2 - 27 }}
                  title={yesButton?.title}
                  titleStyle={style.buttonTitle}
                  onPress={() => {
                    yesButton?.onPress();
                  }}
                  size="xs"
                />
              </View>
            </View>
          </View>
          <View style={{ width: '100%' }}>
            {neverSeeAgainShow ? (
              <TouchableOpacity
                style={{ paddingVertical: 7 }}
                onPress={() => {
                  onNeverSeeAgainPress?.();
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
    buttonTitle: {
      fontSize: theme.fontSize.md,
      fontWeight: theme.fontWeight.bold,
      color: theme.colors.black,
    },
    children: {
      paddingTop: 20,
      paddingBottom: 70,
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
