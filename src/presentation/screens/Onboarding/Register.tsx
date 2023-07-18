import { CheckBox, makeStyles, Text, useTheme } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { FilledButton, OutlinedButton } from '@/presentation/components/Button';
import { OnboardingScreenProps } from '@/presentation/navigation/types';
import CustomInput from '@/presentation/components/CustomInput';
import color from '@/presentation/res/styles/color';
import RegisterRequestDto from '@/data/model/RegisterRequestDto';
import {
  authCodeRegex,
  emailRegex,
  nicknameRegex,
  passwordRegex,
  realnameRegex,
  usernameRegex,
} from '@/presentation/utils/util';
import { Gender } from '@/data/model/Gender';
import DatePickerModalContent from '@/presentation/components/modalContent/DatePickerModalContent';
import { ValidatorState } from '@/presentation/components/props/StateProps';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AgreementItem, { AgreementState } from '@/presentation/components/Agreement';
import DropdownButton from '@/presentation/components/DropdownWithoutItem';
import {
  checkNicknameDuplicate,
  checkUsernameDuplicate,
  register,
  sendAuthCode,
  verifyAuthCode,
} from '@/redux/reducers/registerReducer';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { ModalContext } from '@/presentation/components/modal/context';
import OkDialogModalContent from '@/presentation/components/modalContent/OkDialogModalContent';
import ErrorCode from '@/data/api/ErrorCode';
import useModal from '@/presentation/components/modal/useModal';

const agreementItems = [
  {
    text: '이용약관에 동의합니다.(필수)',
    value: 'term',
    checked: false,
    url: 'https://gs97ahninu.notion.site/ab7a6fd5262340e09eb657c569f59454',
  },
  {
    text: '개인정보 수집 및 이용에 동의합니다.(필수)',
    value: 'privacyPolicy',
    checked: false,
    url: 'https://gs97ahninu.notion.site/29a9af66564b47c0ac758a882adf0b52',
  },
];

const Register = ({ navigation, route }: OnboardingScreenProps<'Register'>) => {
  const [registerState, setRegisterState] = useState<RegisterRequestDto>({
    gender: Gender.Female,
    birthdate: new Date().toISOString(),
    fcmToken: 'testToken!',
  });
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const modal = useModal();

  const [agreementState, setAgreementState] = useState<AgreementState>({
    checkedAll: false,
    items: agreementItems,
  });

  const [dupChecked, setDupChecked] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    if (agreementState.items.filter(item => item.checked).length == agreementState.items.length) {
      setAgreementState(prevState => ({ ...prevState, checkedAll: true }));
    } else {
      setAgreementState(prevState => ({ ...prevState, checkedAll: false }));
    }
  }, [agreementState.items]);

  const styles = useStyles({ navigation, route });

  function isValid(regex: RegExp, text?: string): ValidatorState {
    if (text?.length == 0 || !text) {
      return 'none';
    } else {
      return regex.test(text) ? 'valid' : 'invalid';
    }
  }
  // Todo: 우선 단순 리퀘 구현. 추후 에러 핸들링 등 예정.

  const {
    data: registerResult,
    loading: registerLoading,
    error: registerError,
  } = useAppSelector(state => state.registerReducer.registerResult);

  useEffect(() => {
    if (!registerLoading) {
      if (registerResult && !registerError) {
        navigation.navigate('RegisterCompleted');
      } else if (!registerResult && registerError) {
        modal?.show({
          title: '오류',
          content: (
            <OkDialogModalContent
              text={registerError.message ?? '회원가입에 실패했어요.'}
              onOkClick={() => {
                modal.hide();
              }}
            />
          ),
        });
      }
    }
  }, [registerResult, registerLoading, registerError]);

  const {
    data: usernameDup,
    loading: usernameDupLoading,
    error: usernameDupError,
  } = useAppSelector(state => state.registerReducer.usernameDupCheckResult);
  useEffect(() => {
    if (!usernameDupLoading) {
      if ((usernameDup && !usernameDupError) || (!usernameDup && usernameDupError)) {
        modal?.show({
          title: <Text>중복확인</Text>,
          content: (
            <OkDialogModalContent
              text={
                usernameDup && !usernameDupError
                  ? '사용할 수 있는 아이디입니다.'
                  : usernameDupError?.message ?? '알 수 없는 오류입니다.'
              }
              onOkClick={() => {
                modal?.hide();
              }}
            />
          ),
        });
      }
    }
  }, [usernameDup, usernameDupLoading, usernameDupError]);
  const {
    data: nicknameDup,
    loading: nicknameDupLoading,
    error: nicknameDupError,
  } = useAppSelector(state => state.registerReducer.nicknameDupCheckResult);

  useEffect(() => {
    if (!nicknameDupLoading) {
      if ((nicknameDup && !nicknameDupError) || (!nicknameDup && nicknameDupError)) {
        modal?.show({
          title: <Text>중복확인</Text>,
          content: (
            <OkDialogModalContent
              text={
                nicknameDup && !nicknameDupError
                  ? '사용할 수 있는 닉네임입니다.'
                  : nicknameDupError?.message ?? '알 수 없는 오류입니다.'
              }
              onOkClick={() => {
                modal?.hide();
              }}
            />
          ),
        });
      }
    }
  }, [nicknameDup, nicknameDupLoading, nicknameDupError]);

  const {
    data: sendAuthCodeResult,
    loading: sendAuthCodeLoading,
    error: sendAuthCodeError,
  } = useAppSelector(state => state.registerReducer.sendAuthCodeResult);

  useEffect(() => {
    if (sendAuthCodeResult && !sendAuthCodeLoading) {
      modal?.show({
        title: <Text>인증번호 발송</Text>,
        content: (
          <OkDialogModalContent
            text={
              !sendAuthCodeError
                ? '이메일이 발송되었습니다.\n보이지 않을 경우 스팸메일함을 확인해주세요.'
                : '이메일 발송에 실패했습니다.\n존재하는 이메일인지 확인해주세요.'
            }
            onOkClick={() => {
              setRegisterState(state => ({ ...state, authCode: '' }));
              modal?.hide();
            }}
          />
        ),
      });
    }
  }, [sendAuthCodeResult, sendAuthCodeLoading, sendAuthCodeError]);

  const {
    data: verifyAuthCodeResult,
    loading: verifyAuthCodeLoading,
    error: verifyAuthCodeError,
  } = useAppSelector(state => state.registerReducer.verifyAuthCodeResult);

  useEffect(() => {
    if (
      !verifyAuthCodeLoading &&
      ((verifyAuthCodeResult && !verifyAuthCodeError) ||
        (!verifyAuthCodeResult && verifyAuthCodeError))
    ) {
      modal?.show({
        title: <Text>인증번호 확인</Text>,
        content: (
          <OkDialogModalContent
            text={
              !verifyAuthCodeError
                ? '이메일 인증에 성공했습니다.\n가입을 완료해주세요.'
                : '인증번호가 올바르지 않습니다.'
            }
            onOkClick={() => {
              modal?.hide();
            }}
          />
        ),
      });
    }
  }, [verifyAuthCodeResult, verifyAuthCodeLoading, verifyAuthCodeError]);

  const checkAllFieldsValidate = () => {
    //FIXME: 개똥코드. 고쳐야해요
    return (
      usernameRegex.test(registerState.username ?? '') &&
      nicknameRegex.test(registerState.nickname ?? '') &&
      passwordRegex.test(registerState.password ?? '') &&
      emailRegex.test(registerState.email ?? '') &&
      agreementState.checkedAll
    );
  };

  return (
    <View>
      <ScrollView style={styles.view} showsVerticalScrollIndicator={false}>
        <View style={styles.item}>
          <View style={{ flex: 5 }}>
            <CustomInput
              state={isValid(usernameRegex, registerState.username)}
              label="아이디 입력"
              value={registerState.username}
              onChangeText={(text: string) => {
                setRegisterState(prevState => ({ ...prevState, username: text }));
              }}
            />
          </View>
          <OutlinedButton
            title="중복확인"
            size="sm"
            onPress={() => {
              if (usernameRegex.test(registerState.username ?? ''))
                dispatch(checkUsernameDuplicate(registerState.username ?? ''));
            }}
          />
        </View>
        <View style={styles.item}>
          <View style={{ flex: 5 }}>
            <CustomInput
              state={isValid(nicknameRegex, registerState.nickname)}
              label="닉네임 입력"
              value={registerState.nickname}
              onChangeText={(text: string) => {
                setRegisterState(prevState => ({ ...prevState, nickname: text }));
              }}
            />
          </View>
          <OutlinedButton
            title="중복확인"
            size="sm"
            onPress={() => {
              if (nicknameRegex.test(registerState.nickname ?? ''))
                dispatch(checkNicknameDuplicate(registerState.nickname ?? ''));
            }}
          />
        </View>
        <View style={styles.item}>
          <CustomInput
            state={isValid(passwordRegex, registerState.password)}
            label="비밀번호 입력"
            secureTextEntry
            value={registerState.password}
            onChangeText={(text: string) => {
              setRegisterState(prevState => ({ ...prevState, password: text }));
            }}
          />
        </View>
        <View style={styles.item}>
          <CustomInput
            state={
              registerState.passwordReEntered?.length != 0
                ? registerState.password == registerState.passwordReEntered &&
                  passwordRegex.test(registerState.passwordReEntered ?? '')
                  ? 'valid'
                  : 'invalid'
                : 'none'
            }
            label="비밀번호 재입력"
            secureTextEntry
            value={registerState.passwordReEntered}
            onChangeText={(text: string) => {
              setRegisterState(prevState => ({ ...prevState, passwordReEntered: text }));
            }}
          />
        </View>

        <View style={styles.item}>
          <View style={{ flex: 5 }}>
            <CustomInput
              state={isValid(emailRegex, registerState.email)}
              label="이메일 입력"
              value={registerState.email}
              keyboardType="email-address"
              onChangeText={(text: string) => {
                setRegisterState(prevState => ({ ...prevState, email: text }));
              }}
            />
          </View>
          <OutlinedButton
            title="인증하기"
            size="sm"
            onPress={() => {
              if (registerState.email && emailRegex.test(registerState.email))
                dispatch(sendAuthCode(registerState.email));
            }}
          />
        </View>
        {sendAuthCodeResult ? (
          <View style={styles.item}>
            <View style={{ flex: 5 }}>
              <CustomInput
                state={isValid(authCodeRegex, registerState.authCode)}
                label="인증번호 입력"
                value={registerState.authCode}
                onChangeText={(text: string) => {
                  setRegisterState(prevState => ({ ...prevState, authCode: text }));
                }}
              />
            </View>
            <OutlinedButton
              title="인증확인"
              size="sm"
              onPress={() => {
                if (registerState.authCode && authCodeRegex.test(registerState.authCode))
                  dispatch(
                    verifyAuthCode({
                      email: registerState.email ?? '',
                      verificationCode: registerState.authCode ?? '',
                    }),
                  );
              }}
            />
          </View>
        ) : null}

        <View style={styles.item}>
          <CustomInput
            state={isValid(realnameRegex, registerState.legalName)}
            label="이름(실명)"
            value={registerState.legalName}
            onChangeText={(text: string) => {
              setRegisterState(prevState => ({ ...prevState, legalName: text }));
            }}
          />
        </View>

        <View style={styles.itemBox}>
          <Text style={styles.label}>생년월일 입력</Text>
          <DropdownButton
            text={
              !registerState.birthdate
                ? '생년월일 입력'
                : new Date(registerState.birthdate).toLocaleDateString()
            }
            onClick={() =>
              modal?.show({
                title: <Text h3>생년월일 입력</Text>,
                content: (
                  <DatePickerModalContent
                    doneButtonText="다음"
                    onModalVisibityChanged={visibility => {
                      if (!visibility) modal.hide();
                    }}
                    date={new Date(registerState.birthdate ?? new Date().toISOString())}
                    onDatePicked={date => {
                      setRegisterState(prevState => ({
                        ...prevState,
                        birthdate: date.toISOString(),
                      }));
                    }}
                    maximumDate={new Date()}
                  />
                ),
              })
            }
          />
        </View>

        <View style={styles.itemBox}>
          <Text style={styles.label}>성별</Text>
          <View style={styles.genderView}>
            <OutlinedButton
              title="여자"
              size="sm"
              onPress={() =>
                setRegisterState(prevState => ({ ...prevState, gender: Gender.Female }))
              }
              style={[
                styles.toggleButton,
                registerState.gender == Gender.Female ? styles.active : null,
              ]}
              titleStyle={registerState.gender == Gender.Female ? styles.active : styles.disabled}
            />
            <OutlinedButton
              title="남자"
              size="sm"
              onPress={() => setRegisterState(prevState => ({ ...prevState, gender: Gender.Male }))}
              style={[
                styles.toggleButton,
                registerState.gender == Gender.Male ? styles.active : null,
              ]}
              titleStyle={registerState.gender == Gender.Male ? styles.active : styles.disabled}
            />
          </View>
          <View style={styles.agreementContainer}>
            <CheckBox
              checked={agreementState.checkedAll}
              onPress={() =>
                setAgreementState(prevState => {
                  const items = [...prevState.items].map(item => ({
                    ...item,
                    checked: !prevState.checkedAll,
                  }));
                  return { checkedAll: !prevState.checkedAll, items };
                })
              }
              checkedIcon={<MaterialIcon name="check-box" size={18} color={theme.colors.primary} />}
              uncheckedIcon={
                <MaterialIcon name="check-box-outline-blank" size={18} color={theme.colors.grey2} />
              }
              title="약관 전체 동의"
            />
            <View style={{ height: 1, backgroundColor: '#EEEEEE' }} />
            {agreementState.items.map((item, idx) => (
              <AgreementItem
                key={idx}
                text={item.text}
                checked={item.checked}
                onCheckedChange={(checked: boolean) => {
                  setAgreementState(prevState => {
                    const items = [...prevState.items];
                    items[idx].checked = checked;
                    return { ...prevState, items };
                  });
                }}
                value={item.value}
                url={item.url}
                navigation={navigation}
                route={route}
              />
            ))}
          </View>
        </View>
        <FilledButton
          title="가입하기"
          onPress={() => {
            if (checkAllFieldsValidate())
              dispatch(
                register({ ...registerState, birthdate: registerState.birthdate?.split('T')[0] }),
              );
          }}
          containerStyle={{ marginBottom: 40 }}
        />
      </ScrollView>
    </View>
  );
};

const useStyles = makeStyles(theme => ({
  agreementContainer: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.grey0,
    marginTop: 45,
  },
  active: {
    borderColor: theme.colors.primary,
    color: theme.colors.primary,
  },
  disabled: {
    borderColor: theme.colors.disabled,
    color: theme.colors.disabled,
  },
  toggleButton: {
    flex: 1,
    color: theme.colors.disabled,
    borderColor: theme.colors.disabled,
  },
  view: {
    backgroundColor: color.white,
    padding: 20,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemBox: {
    paddingTop: 30,
  },
  genderView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  input: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: color.grey2,
    paddingBottom: 24,
  },
}));

export default Register;
