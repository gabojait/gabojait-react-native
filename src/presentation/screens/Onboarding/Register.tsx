import { CheckBox, makeStyles, Text, useTheme } from '@rneui/themed';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, ScrollView, View } from 'react-native';
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
import { CustomInputProps, ValidatorState } from '@/presentation/components/props/StateProps';
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
import useForm from '@/presentation/components/useForm';
import useValidator, {
  FormField,
  ValidationLevel,
} from '@/presentation/screens/Onboarding/useValidator';
import Collapsible from 'react-native-collapsible';
import useFormField from '@/presentation/screens/Onboarding/useFormField';
import OkDialogModalContent from '@/presentation/components/modalContent/OkDialogModalContent';

export type RegisterRequestForm = { [key in keyof RegisterRequestDto]: FormField<any> };

export interface ValidatorResult {
  state: ValidatorState;
  message?: string;
}

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
const ValidatorInput = (props: CustomInputProps & { validator: FormField<string> }) => {
  return (
    <CustomInput
      {...props}
      value={props.validator.value}
      onChangeText={props.validator.setValue}
      validatorResult={props.validator.state}
    />
  );
};

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
        setLastEmailVerified(stateSeperatedForm.email?.value!);
        console.log(result);
      },
    },
    {
      onSuccess: token => {
        setEmailAuthToken(token);
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
    {
      onSuccess: async response => {
        await AsyncStorage.setItem('accessToken', response.headers.get('authorization')!);
        await AsyncStorage.setItem('refreshToken', response.headers.get('refresh-token')!);
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
      return ValidatorState.none;
    } else {
      return regex.test(text) ? ValidatorState.valid : ValidatorState.invalid;
    }
  }

  // Todo: 우선 단순 리퀘 구현. 추후 에러 핸들링 등 예정.

  const checkAllFieldsValidate = () => {
    const validatorResults = Object.values(stateSeperatedForm).map(formField =>
      formField?.formatValidate(),
    );
    return !validatorResults.find(result => result.state === ValidatorState.invalid);
  };

  const [lastEmailVerified, setLastEmailVerified] = useState('');
  const [emailAuthToken, setEmailAuthToken] = useState<string | null>(null);

  const stateSeperatedForm: RegisterRequestForm = {
    username: useValidator<string>(
      '',
      (value: string) => {
        if (!usernameRegex.test(value)) {
          return {
            state: ValidatorState.invalid,
            message: t('register_username_invalid_format'),
          };
        } else {
          return { state: ValidatorState.none };
        }
      },
      async value => {
        try {
          const result = await userIdDupCheckMutation.mutateAsync(value);
          console.log('mutationResult: ', result);
          return { state: ValidatorState.valid };
        } catch (e) {
          return { state: ValidatorState.invalid, message: (e as Error)?.message };
        }
      },
      ValidationLevel.Format,
    ),
    nickname: useValidator<string>(
      '',
      (value: string) => {
        if (!nicknameRegex.test(value)) {
          return {
            state: ValidatorState.invalid,
            message: t('register_nickname_invalid_format'),
          };
        } else {
          return { state: ValidatorState.none };
        }
      },
      async value => {
        try {
          const result = await nickNmDupCheckMutation.mutateAsync(value);
          console.log('mutationResult: ', result);
          return { state: ValidatorState.valid };
        } catch (e) {
          return { state: ValidatorState.invalid, message: (e as Error)?.message };
        }
      },
      ValidationLevel.Format,
    ),
    password: useValidator<string>(
      '',
      (value: string) => {
        console.log('valid: ', isValid(passwordRegex, value));
        if (!passwordRegex.test(value)) {
          return {
            state: ValidatorState.invalid,
            message: t('register_password_invalid_format'),
          };
        } else {
          return { state: ValidatorState.none };
        }
      },
      undefined,
      ValidationLevel.Format,
    ),
    passwordReEntered: useValidator<string>(
      '',
      (value: string) => {
        if (!passwordRegex.test(value) || value !== stateSeperatedForm.password?.value) {
          return {
            state: ValidatorState.invalid,
            message: t('register_password_not_match'),
          };
        } else {
          return { state: ValidatorState.none };
        }
      },
      undefined,
      ValidationLevel.Format,
    ),
    email: useValidator<string>(
      '',
      (value: string) => {
        if (!emailRegex.test(value)) {
          return {
            state: ValidatorState.invalid,
            message: t('register_email_invalid_format'),
          };
        } else {
          return { state: ValidatorState.none };
        }
      },
      async value => {
        try {
          const result = await emailDupCheckMutation.mutateAsync(value);

          return { state: ValidatorState.valid };
        } catch (e) {
          return { state: ValidatorState.invalid, message: (e as Error)?.message };
        }
      },
      ValidationLevel.Format,
    ),
    authCode: useValidator<string>(
      '',
      (value: string) => {
        if (!authCodeRegex.test(value)) {
          return {
            state: ValidatorState.invalid,
            message: t('register_authCode_invalid_format'),
          };
        } else {
          return { state: ValidatorState.none };
        }
      },
      useCallback(
        async (value: string) => {
          try {
            const result = await emailVerificationMutation.mutateAsync({
              email: stateSeperatedForm.email?.value,
              verificationCode: value,
              token: emailAuthToken,
            });
            return { state: ValidatorState.valid };
          } catch (e) {
            return { state: ValidatorState.invalid, message: (e as Error)?.message };
          }
        },
        [emailAuthToken],
      ),
      ValidationLevel.Format,
    ),
    gender: useFormField(Gender.Female),
  };
  const authCodeCollapsed = useMemo(
    () =>
      !(
        emailDupCheckMutation.isSuccess &&
        lastEmailVerified === stateSeperatedForm.email?.value &&
        emailAuthToken != null
      ),
    [emailDupCheckMutation.status, lastEmailVerified, emailAuthToken],
  );

  return (
    <View>
      <ScrollView style={styles.view} showsVerticalScrollIndicator={false}>
        <View style={styles.item}>
          <ValidatorInput
            validator={stateSeperatedForm.username!}
            shape={'round'}
            placeholder="아이디 입력"
            rightChildren={
              <OutlinedButton
                style={{ flex: 1 }}
                title="중복확인"
                size="sm"
                onPress={() => {
                  dispatch(signOut());
                  stateSeperatedForm.username?.validate();
                  // if (stateSeperatedForm.username.state) {
                  // dispatch(signOut());
                  //   userIdDupCheckMutation?.mutate(stateSeperatedForm.username.value);
                  // }
                  // stateSeperatedForm.username.validate();
                }}
              />
            }
          />
        </View>
        <View style={styles.item}>
          <ValidatorInput
            validator={stateSeperatedForm.nickname!}
            placeholder="닉네임 입력"
            shape={'round'}
            rightChildren={
              <OutlinedButton
                style={{ flex: 1 }}
                title="중복확인"
                size="sm"
                onPress={async () => {
                  dispatch(signOut());
                  await stateSeperatedForm.nickname?.validate();
                  // if (stateSeperatedForm.nickname.state) {
                  // nickNmDupCheckMutation.mutate(stateSeperatedForm.nickname.value);
                  // }
                  // await stateSeperatedForm.nickname.validate();
                }}
              />
            }
          />
        </View>
        <View style={styles.item}>
          <ValidatorInput
            shape={'round'}
            placeholder="비밀번호 입력"
            secureTextEntry
            validator={stateSeperatedForm.password!}
          />
        </View>
        <View style={styles.item}>
          <ValidatorInput
            shape={'round'}
            validator={stateSeperatedForm.passwordReEntered!}
            placeholder="비밀번호 재입력"
            secureTextEntry
          />
        </View>

        <View style={styles.item}>
          <ValidatorInput
            placeholder="이메일 입력"
            shape="round"
            keyboardType="email-address"
            validator={stateSeperatedForm.email!}
            rightChildren={
              <OutlinedButton
                title="인증하기"
                size="sm"
                style={{ flex: 1 }}
                onPress={() => {
                  dispatch(signOut());
                  stateSeperatedForm.email?.validate();
                  // if (registerState.email && emailRegex.test(registerState.email)) {
                  //   emailDupCheckMutation.mutate(registerState.email!);
                  // }
                }}
              />
            }
          />
        </View>
        {!authCodeCollapsed && (
          <View style={styles.item}>
            <CustomInput
              shape="round"
              placeholder="인증번호 입력"
              rightChildren={
                <OutlinedButton
                  title="인증확인"
                  size="sm"
                  style={{ flex: 1 }}
                  onPress={() => {
                    if (emailAuthToken != null) {
                      stateSeperatedForm.authCode?.validate();
                    }
                    // if (registerState.authCode && authCodeRegex.test(registerState.authCode)) {
                    //   emailVerificationMutation.mutate({
                    //     email: registerState.email ?? '',
                    //     verificationCode: registerState.authCode ?? '',
                    //   });
                    // }
                  }}
                />
              }
              value={stateSeperatedForm.authCode?.value}
              onChangeText={stateSeperatedForm.authCode?.setValue}
              validatorResult={stateSeperatedForm.authCode?.state}
            />
          </View>
        )}

        <View>
          <Text style={styles.label}>생년월일 입력</Text>
          <DropdownButton
            style={{ borderColor: theme.colors.grey3 }}
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
          <Text style={styles.label}>성별 선택</Text>
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
              const req: RegisterRequestDto = {};
              Object.entries(stateSeperatedForm).forEach(([k, v]) => {
                const key = k as keyof RegisterRequestDto;
                req[key] = v.value;
              });
              console.log(req);
              registerMutation.mutate({
                ...req,
                birthdate: new Date(registerState.birthdate!).format('yyyy-MM-dd'),
                emailAuthToken: emailAuthToken,
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
    alignItems: 'flex-start',
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
    paddingBottom: theme.spacing.sm,
  },
}));

export default Register;
