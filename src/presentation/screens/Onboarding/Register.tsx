import { CheckBox, makeStyles, Text, useTheme } from '@rneui/themed';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import useValidator, {
  FormField,
  ValidationLevel,
} from '@/presentation/screens/Onboarding/useValidator';
import useFormField from '@/presentation/screens/Onboarding/useFormField';
import messaging from '@react-native-firebase/messaging';

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
    url: 'https://gabojait-dev.nogamsung.com/docs/service',
  },
  {
    text: '개인정보 수집 및 이용에 동의합니다.(필수)',
    value: 'privacyPolicy',
    checked: false,
    url: 'https://gabojait-dev.nogamsung.com/docs/privacy',
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
export const ValidatorInput = (props: CustomInputProps & { validator: FormField<string> }) => {
  const { theme } = useTheme();
  return (
    <CustomInput
      {...props}
      value={props.validator.value}
      onChangeText={props.validator.setValue}
      validatorResult={props.validator.state}
      inputContainerStyle={{ height: theme.boxComponentHeight.xl }}
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
    'CENTER',
    {
      resultModalContent: {
        content: t('nicknameDupOk'),
      },
    },
  );
  const { mutation: userIdDupCheckMutation } = useMutationDialog(
    QueryKey.userIdDupCheck(registerState.username),
    checkUsernameDuplicate,
    'CENTER',
    {
      resultModalContent: {
        content: t('usernameDupOk'),
      },
    },
  );
  const { mutation: emailDupCheckMutation } = useMutationDialog(
    QueryKey.emailDupCheck(registerState.email),
    sendAuthCode,
    'CENTER',
    {
      resultModalContent: {
        content: t('emailOk'),
      },
      onSuccessClick(result) {
        setLastEmailVerified(stateSeperatedForm.email?.value!);
        stateSeperatedForm.verificationCode?.setValue('');
        console.log(result);
      },
    },
  );
  const { mutation: emailVerificationMutation } = useMutationDialog(
    QueryKey.emailVerification(registerState.email, registerState.verificationCode),
    verifyAuthCode,
    'CENTER',
    {
      resultModalContent: {
        content: t('authCodeVerifyOk'),
      },
      onSuccessClick(result) {
        console.log(result);
      },
    },
  );
  const { mutation: registerMutation } = useMutationDialog(
    QueryKey.register(registerState),
    register,
    'CENTER',
    {
      resultModalContent: {
        content: t('registerOk'),
      },
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
  const [authCodeDisable, setAuthCodeDisable] = useState(false);
  const [lastEmailVerified, setLastEmailVerified] = useState('');

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
    verificationCode: useValidator<string>(
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
            });
            return { state: ValidatorState.valid };
          } catch (e) {
            return { state: ValidatorState.invalid, message: (e as Error)?.message };
          }
        },
        [emailVerificationMutation],
      ),
      ValidationLevel.Format,
    ),
    gender: useFormField(Gender.Female),
  };
  const authCodeCollapsed = useMemo(() => {
    return !(
      emailDupCheckMutation.isSuccess && lastEmailVerified === stateSeperatedForm.email?.value
    );
  }, [emailDupCheckMutation.status, lastEmailVerified, emailDupCheckMutation]);

  return (
    <View>
      <ScrollView style={styles.view} showsVerticalScrollIndicator={false}>
        <View>
          <ValidatorInput
            validator={stateSeperatedForm.username!}
            shape={'round'}
            placeholder="아이디 입력"
            rightChildren={
              <OutlinedButton
                style={{ flex: 1, height: theme.boxComponentHeight.xl }}
                title="중복확인"
                size="sm"
                buttonStyle={{ marginVertical: -5 }}
                containerStyle={{ height: theme.boxComponentHeight.xl }}
                onPress={() => {
                  dispatch(signOut());
                  stateSeperatedForm.username?.validate();
                }}
              />
            }
          />
        </View>
        <View style={{ paddingTop: 7 }}>
          <ValidatorInput
            validator={stateSeperatedForm.nickname!}
            placeholder="닉네임 입력"
            shape={'round'}
            rightChildren={
              <OutlinedButton
                style={{ flex: 1, height: theme.boxComponentHeight.xl }}
                title="중복확인"
                size="sm"
                buttonStyle={{ marginVertical: -5 }}
                containerStyle={{ height: theme.boxComponentHeight.xl }}
                onPress={async () => {
                  dispatch(signOut());
                  await stateSeperatedForm.nickname?.validate();
                }}
              />
            }
          />
        </View>
        <View style={[styles.item, { paddingBottom: 20, paddingTop: 7 }]}>
          <ValidatorInput
            shape={'round'}
            placeholder="비밀번호 입력"
            secureTextEntry
            validator={stateSeperatedForm.password!}
          />
        </View>
        <View style={[styles.item, { paddingBottom: 20, marginTop: -13 }]}>
          <ValidatorInput
            shape={'round'}
            validator={stateSeperatedForm.passwordReEntered!}
            placeholder="비밀번호 재입력"
            secureTextEntry
          />
        </View>

        <View style={{ marginTop: -13 }}>
          <ValidatorInput
            placeholder="이메일 입력"
            shape="round"
            keyboardType="email-address"
            validator={stateSeperatedForm.email!}
            rightChildren={
              <OutlinedButton
                title="인증하기"
                size="sm"
                style={{ flex: 1, height: theme.boxComponentHeight.xl }}
                onPress={() => {
                  dispatch(signOut());
                  stateSeperatedForm.email?.validate();
                  setAuthCodeDisable(false);
                  // if (registerState.email && emailRegex.test(registerState.email)) {
                  //   emailDupCheckMutation.mutate(registerState.email!);
                  // }
                }}
              />
            }
          />
        </View>
        {!authCodeCollapsed && (
          <View style={[styles.item, { marginTop: 0 }]}>
            <CustomInput
              shape="round"
              placeholder="인증번호 입력"
              inputContainerStyle={{ height: theme.boxComponentHeight.xl }}
              rightChildren={
                <OutlinedButton
                  title="인증확인"
                  size="sm"
                  style={{ flex: 1, height: theme.boxComponentHeight.xl }}
                  disabled={authCodeDisable}
                  onPress={() => {
                    if (lastEmailVerified === stateSeperatedForm.email?.value) {
                      stateSeperatedForm.verificationCode?.validate();
                      setAuthCodeDisable(true);
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
              value={stateSeperatedForm.verificationCode?.value}
              onChangeText={stateSeperatedForm.verificationCode?.setValue}
              validatorResult={stateSeperatedForm.verificationCode?.state}
            />
          </View>
        )}

        <View style={{ marginTop: 7 }}>
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
                { height: theme.boxComponentHeight.xl },
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
                { height: theme.boxComponentHeight.xl },
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
          onPress={async () => {
            if (checkAllFieldsValidate()) {
              const req: RegisterRequestDto = {};
              Object.entries(stateSeperatedForm).forEach(([k, v]) => {
                const key = k as keyof RegisterRequestDto;
                req[key] = v.value;
              });
              console.log(req);
              const fcmToken = await messaging().getToken();
              registerMutation.mutate({
                ...req,
                birthdate: new Date(registerState.birthdate!).format('yyyy-MM-dd'),
                fcmToken,
              });
            }
          }}
          containerStyle={{ marginBottom: 40, paddingTop: 20 }}
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
