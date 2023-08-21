import { FilledButton } from '@/presentation/components/Button';
import { Text } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { OnboardingScreenProps } from '@/presentation/navigation/types';
import color from '@/presentation/res/styles/color';
import CustomInput from '@/presentation/components/CustomInput';
import Gabojait from '@/presentation/components/icon/Gabojait';
import { login } from '@/redux/action/login';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import LoginRequestDTO from '@/data/model/LoginRequestDto';
import { ModalContext } from '@/presentation/components/modal/context';
import OkDialogModalContent from '@/presentation/components/modalContent/OkDialogModalContent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useGlobalStyles from '@/presentation/styles';
import useModal from '@/presentation/components/modal/useModal';

const Login = ({ navigation }: OnboardingScreenProps<'Login'>) => {
  const [loginState, setLoginState] = useState({ username: '', password: '' } as LoginRequestDTO);
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(state => state.loginReducer.loginResult);
  const modal = useModal();

  useEffect(() => {
    if (!loading) {
      if (data && !error) {
        navigation.getParent()?.navigate('MainBottomTabNavigation', { screen: 'Home ' });
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
  }, [data]);
  const globalStyles = useGlobalStyles();

  return (
    <View style={[globalStyles.container, { justifyContent: 'space-between' }]}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Gabojait name="gabojait" color={color.primary} size={35} />
      </View>
      <View style={styles.inputView}>
        <CustomInput
          placeholder={'아이디'}
          onChangeText={(text: string) =>
            setLoginState(prevState => ({ ...prevState, username: text }))
          }
          value={loginState.username}
          shape="round"
          containerStyle={{ marginBottom: 28 }}
        />
        <CustomInput
          placeholder={'비밀번호'}
          onChangeText={(text: string) =>
            setLoginState(prevState => ({ ...prevState, password: text }))
          }
          secureTextEntry
          shape="round"
          value={loginState.password}
          containerStyle={{ marginBottom: 28 }}
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
                fcmToken: 'testToken',
              }),
            );
          }}
          containerStyle={{ marginBottom: 10 }}
        />
        <TouchableOpacity onPress={() => navigation.navigate('FindAccount')}>
          <Text style={styles.text}>아이디 찾기/ 비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.text}>아직 가보자잇에 가입하지 않으셨나요?</Text>
        <Text style={styles.highlightText}> 회원가입</Text>
      </TouchableOpacity>
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
    flex: 2,
    justifyContent: 'flex-start',
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
