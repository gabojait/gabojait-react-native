import { FilledButton } from '@/presentation/components/Button';
import { Text, useTheme } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { OnboardingScreenProps } from '@/presentation/navigation/types';
import color from '@/presentation/res/styles/color';
import CustomInput from '@/presentation/components/CustomInput';
import Gabojait from '@/presentation/components/icon/Gabojait';
import { login } from '@/redux/action/login';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import LoginRequestDTO from '@/data/model/LoginRequestDto';
import OkDialogModalContent from '@/presentation/components/modalContent/OkDialogModalContent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useGlobalStyles from '@/presentation/styles';
import useModal from '@/presentation/components/modal/useModal';
import { DialogLoading } from '@rneui/base/dist/Dialog/Dialog.Loading';
import messaging from '@react-native-firebase/messaging';
import { RootStackNavigationProps } from '@/presentation/navigation/RootNavigation';

const Login = ({ navigation }: OnboardingScreenProps<'Login'>) => {
  const [loginState, setLoginState] = useState({ username: '', password: '' } as LoginRequestDTO);
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(state => state.loginReducer.loginResult);
  const modal = useModal();
  const { theme } = useTheme();
  useEffect(() => {
    modal?.hide();
    if (loading) {
      modal?.show({ content: <DialogLoading /> });
      return;
    }
    if (!loading) {
      if (data && !error) {
        navigation
          .getParent<RootStackNavigationProps>()
          ?.replace('MainBottomTabNavigation', { screen: 'Home' });
      } else if (error) {
        modal?.show({
          content: (
            <OkDialogModalContent
              title="로그인"
              text={error?.message ?? '알 수 없는 오류로 로그인에 실패했습니다.'}
              onOkClick={function (): void {
                modal.hide();
              }}
            />
          ),
        });
      }
    }
  }, [data, loading, error]);

  const globalStyles = useGlobalStyles();

  return (
    <View style={[globalStyles.container, { backgroundColor: 'white', paddingBottom: 54 }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1.1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <View
              style={{
                flex: 0.77,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Gabojait name="gabojait" color={color.primary} size={35} />
            </View>
            <CustomInput
              placeholder={'아이디를 입력하세요'}
              onChangeText={(text: string) =>
                setLoginState(prevState => ({ ...prevState, username: text }))
              }
              value={loginState.username}
              shape="round"
              inputContainerStyle={{
                borderColor: theme.colors.grey3,
                height: theme.boxComponentHeight.xl,
              }}
            />
            <CustomInput
              placeholder={'비밀번호를 입력하세요'}
              onChangeText={(text: string) =>
                setLoginState(prevState => ({ ...prevState, password: text }))
              }
              secureTextEntry
              shape="round"
              value={loginState.password}
              containerStyle={{
                marginBottom: 35,
              }}
              inputContainerStyle={{
                borderColor: theme.colors.grey3,
                height: theme.boxComponentHeight.xl,
              }}
            />
            <FilledButton
              size="sm"
              title="로그인"
              onPress={async () => {
                console.log(loginState.username, loginState.password);
                await AsyncStorage.setItem('accessToken', '');
                await AsyncStorage.setItem('refreshToken', '');
                dispatch(
                  login({
                    username: loginState.username,
                    password: loginState.password,
                    fcmToken: await messaging().getToken(),
                  }),
                );
              }}
              containerStyle={{ marginBottom: 10, height: theme.boxComponentHeight.xxl }}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <View style={{ justifyContent: 'space-between', flex: 0.3 }}>
        <TouchableOpacity onPress={() => navigation.push('FindAccount')}>
          <Text style={styles.text}>아이디 찾기/ 비밀번호 찾기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.registerLink]} onPress={() => navigation.push('Register')}>
          <Text style={styles.text}>아직 가보자잇에 가입하지 않으셨나요?</Text>
          <Text style={styles.highlightText}> 회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'blue',
  },
  linkTextView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 11,
  },
  registerLink: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  highlightText: {
    color: color.primary,
  },
  text: {
    color: color.grey,
    textAlign: 'center',
  },
});
export default Login;
