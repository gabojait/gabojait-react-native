import { FilledButton } from '@/presentation/components/Button';
import CustomInput from '@/presentation/components/CustomInput';
import { MainStackScreenProps } from '@/presentation/navigation/types';
import { nicknameRegex, passwordRegex } from '@/presentation/utils/util';
import { Text, useTheme } from '@rneui/themed';
import React, { useState } from 'react';
import { View } from 'react-native';
import { changeNickname, changePassword, checkNicknameDuplicate } from '@/data/api/accounts';
import { useMutationDialog } from '@/reactQuery/util/useMutationDialog';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/redux/hooks';
import { signOut } from '@/redux/action/login';

const UserModifier = ({ navigation }: MainStackScreenProps<'UserModifier'>) => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const [nickname, setNickname] = useState('');
  const [passwords, setPasswords] = useState<string[]>([]);
  const [dupChecked, setDupChecked] = useState(false);
  const { t } = useTranslation();
  const { mutation: checkNicknameDuplicateMutation } = useMutationDialog(
    ['checkNicknameDuplicate', nickname],
    checkNicknameDuplicate,
    'CENTER',
    {
      onSuccessClick: () => {
        setDupChecked(true);
      },
      resultModalContent: {
        icon: '',
        title: '',
        content: t('nicknameDupOk'),
      },
    },
  );
  const { mutation: changeNicknameMutation } = useMutationDialog(
    ['changeNickName', nickname],
    changeNickname,
    'CENTER',
    {
      onSuccessClick: () => {
        setDupChecked(true);
      },
      resultModalContent: {
        icon: '',
        title: '',
        content: t('result_nicknameChangeOk'),
      },
    },
  );
  const { mutation: changePwMutation } = useMutationDialog(
    ['changePassword', passwords],
    changePassword,
    'CENTER',
    {
      onSuccessClick: async () => {
        dispatch(signOut());
        navigation.getParent()?.navigate('OnboardingNavigation', { screen: 'Login' });
      },
      resultModalContent: {
        icon: '',
        title: '',
        content: t('result_passwordChangeOk'),
      },
    },
  );

  return (
    <View style={{ backgroundColor: 'white', flex: 1, padding: 20 }}>
      <Text
        style={{
          marginBottom: theme.spacing.md,
          fontSize: theme.fontSize.md,
          fontWeight: theme.fontWeight.semibold,
        }}
      >
        {t('changeNickNm')}
      </Text>
      <CustomInput
        containerStyle={{ marginBottom: theme.spacing.md }}
        shape="round"
        value={nickname}
        disabled={dupChecked}
        onChangeText={value => setNickname(value)}
        placeholder="새로운 닉네임을 입력하세요"
      />
      <FilledButton
        style={{ marginBottom: theme.spacing.md }}
        title={dupChecked ? t('action_confirm') : t('action_checkDup')}
        disabled={!nicknameRegex.test(nickname)}
        onPress={() => {
          if (!dupChecked) {
            checkNicknameDuplicateMutation.mutate(nickname);
          } else {
            changeNicknameMutation.mutate({ nickname });
          }
        }}
      />
      <Text
        style={{
          marginBottom: theme.spacing.md,
          fontSize: theme.fontSize.md,
          fontWeight: theme.fontWeight.semibold,
        }}
      >
        비밀번호 변경
      </Text>
      <CustomInput
        containerStyle={{ marginBottom: theme.spacing.md }}
        shape="round"
        secureTextEntry
        value={passwords[0]}
        onChangeText={value => setPasswords(prevState => [value, prevState[1]])}
        placeholder="새로운 비밀번호를 입력하세요"
      />
      <CustomInput
        containerStyle={{ marginBottom: theme.spacing.md }}
        shape="round"
        secureTextEntry
        value={passwords[1]}
        onChangeText={value => setPasswords(prevState => [prevState[0], value])}
        placeholder="다시 한번 입력하세요"
      />
      <FilledButton
        title="완료"
        disabled={
          !(passwords[0] == passwords[1]) ||
          !passwordRegex.test(passwords[0]) ||
          !passwordRegex.test(passwords[1])
        }
        onPress={() => {
          changePwMutation.mutate({
            password: passwords[0],
            passwordReEntered: passwords[1],
          });
        }}
      />
    </View>
  );
};

export default UserModifier;
