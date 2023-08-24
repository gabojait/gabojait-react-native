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
  usernameRegex,
} from '@/presentation/utils/util';
import { Gender } from '@/data/model/Gender';
import DatePickerModalContent from '@/presentation/components/modalContent/DatePickerModalContent';
import { ValidatorState } from '@/presentation/components/props/StateProps';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AgreementItem, { AgreementState } from '@/presentation/components/Agreement';
import DropdownButton from '@/presentation/components/DropdownWithoutItem';
import { useAppDispatch } from '@/redux/hooks';
import useModal from '@/presentation/components/modal/useModal';
import { signOut } from '@/redux/action/login';
import {
  checkNicknameDuplicate,
  checkUsernameDuplicate,
  register,
  sendAuthCode,
  verifyAuthCode,
} from '@/data/api/accounts';
import { useMutationDialog } from '@/reactQuery/util/useMutationDialog';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import '@/lib/date';

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

const QueryKey = {
  nickNmDupCheck: (nickname?: string) => ['nickNmDupCheck', nickname],
  userIdDupCheck: (userId?: string) => ['userIdDupCheck', userId],
  emailDupCheck: (email?: string) => ['emailDupCheck', email],
  emailVerification: (email?: string, verificationCode?: string) => [
    'emailVerification',
    { email, verificationCode },
  ],
  register: (registerDto: RegisterRequestDto) => ['register', registerDto],
} as const;

const Register = ({ navigation, route }: OnboardingScreenProps<'Register'>) => {
  const [registerState, setRegisterState] = useState<RegisterRequestDto>({
    gender: Gender.Female,
    birthdate: new Date().toISOString(),
    fcmToken: 'testToken!',
  });
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const modal = useModal();

  const { t } = useTranslation();
  // Todo: 결과로 다이얼로그를 띄우는 (조건 커스텀 가능, 동작 따로 정의 가능) mutation 훅을 정의하자.
  const { mutation: nickNmDupCheckMutation } = useMutationDialog(
    QueryKey.nickNmDupCheck(registerState.nickname),
    checkNicknameDuplicate,
    { resultToMessage: _ => t('nicknameDupOk') },
  );
  const { mutation: userIdDupCheckMutation } = useMutationDialog(
    QueryKey.userIdDupCheck(registerState.username),
    checkUsernameDuplicate,
    { resultToMessage: _ => t('usernameDupOk') },
  );
  const { mutation: emailDupCheckMutation } = useMutationDialog(
    QueryKey.emailDupCheck(registerState.email),
    sendAuthCode,
    {
      resultToMessage: _ => t('emailOk'),
      onSuccessClick(result) {
        setLastEmailVerified(registerState.email!);
        console.log(result);
      },
    },
  );
  const { mutation: emailVerificationMutation } = useMutationDialog(
    QueryKey.emailVerification(registerState.email, registerState.authCode),
    verifyAuthCode,
    {
      resultToMessage: _ => t('authCodeVerifyOk'),
      onSuccessClick(result) {
        console.log(result);
      },
    },
  );
  const { mutation: registerMutation } = useMutationDialog(
    QueryKey.register(registerState),
    register,
    {
      resultToMessage: _ => t('registerOk'),
      onSuccessClick(result) {
        navigation.navigate('RegisterCompleted');
      },
    },
  );

  const [agreementState, setAgreementState] = useState<AgreementState>({
    checkedAll: false,
    items: agreementItems,
  });

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

  const checkAllFieldsValidate = () => {
    //FIXME: 개똥코드. 고쳐야해요
    return (
      usernameRegex.test(registerState.username ?? '') &&
      nicknameRegex.test(registerState.nickname ?? '') &&
      userIdDupCheckMutation.isSuccess &&
      nickNmDupCheckMutation.isSuccess &&
      passwordRegex.test(registerState.password ?? '') &&
      emailRegex.test(registerState.email ?? '') &&
      agreementState.checkedAll &&
      emailDupCheckMutation.isSuccess &&
      emailVerificationMutation.isSuccess &&
      lastEmailVerified === registerState.email
    );
  };

  const [lastEmailVerified, setLastEmailVerified] = useState('');

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
              additionalValidator={_ => {
                console.log(userIdDupCheckMutation.isSuccess ? 'valid' : 'invalid');
                return userIdDupCheckMutation.isSuccess ? 'valid' : 'none';
              }}
            />
          </View>
          <OutlinedButton
            title="중복확인"
            size="sm"
            onPress={() => {
              if (usernameRegex.test(registerState.username ?? '')) {
                dispatch(signOut());
                userIdDupCheckMutation?.mutate(registerState.username!);
              }
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
              additionalValidator={_ => {
                return nickNmDupCheckMutation.isSuccess ? 'valid' : 'none';
              }}
            />
          </View>
          <OutlinedButton
            title="중복확인"
            size="sm"
            onPress={() => {
              if (nicknameRegex.test(registerState.nickname ?? '')) {
                dispatch(signOut());
                nickNmDupCheckMutation.mutate(registerState.nickname!);
              }
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
              (registerState.passwordReEntered?.length ?? 0) != 0
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
              if (registerState.email && emailRegex.test(registerState.email)) {
                dispatch(signOut());
                emailDupCheckMutation.mutate(registerState.email!);
              }
            }}
          />
        </View>
        {emailDupCheckMutation.isSuccess && lastEmailVerified === registerState.email && (
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
                if (registerState.authCode && authCodeRegex.test(registerState.authCode)) {
                  console.log(AsyncStorage.getItem('accessToken'));
                  emailVerificationMutation.mutate({
                    email: registerState.email ?? '',
                    verificationCode: registerState.authCode ?? '',
                  });
                }
              }}
            />
          </View>
        )}

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
                content: (
                  <DatePickerModalContent
                    title="생년월일 입력"
                    doneButtonText="다음"
                    onModalVisibityChanged={visibility => {
                      if (!visibility) {
                        modal.hide();
                      }
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
            <View style={{ width: 22 }} />
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
            if (checkAllFieldsValidate()) {
              registerMutation.mutate({
                ...registerState,
                birthdate: new Date(registerState.birthdate!).format('yyyy-MM-dd'),
              });
            }
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
