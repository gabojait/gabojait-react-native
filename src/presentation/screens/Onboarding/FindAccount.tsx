import { findPassword, findUserName } from '@/data/api/accounts';
import useModal from '@/presentation/components/modal/useModal';
import { useTheme } from '@rneui/themed';
import React, { useState } from 'react';
import { useMutationDialog } from '@/reactQuery/util/useMutationDialog';
import CustomInput from '@/presentation/components/CustomInput';
import { ValidatorState } from '@/presentation/components/props/StateProps';
import useGlobalStyles from '@/presentation/styles';
import { Text, View } from 'react-native';
import { emailRegex, usernameRegex } from '@/presentation/utils/util';
import { FilledButton } from '@/presentation/components/Button';

const FindAccount = () => {
  const [userName, setuserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const modal = useModal();
  const { theme } = useTheme();

  const { mutation: findUserNameMutation } = useMutationDialog(
    'findUserName',
    findUserName,
    'CENTER',
    {
      resultModalContent: {
        title: '아이디 전달 완료!',
        content: '아이디를 이메일로 전달했습니다!\n이메일을 확인해주세요',
      },
    },
  );

  const { mutation: findPasswordMutation } = useMutationDialog(
    'findPassword',
    findPassword,
    'CENTER',
    {
      resultModalContent: {
        title: '임시 비밀번호 전달 완료!',
        content: '임시 비밀번호를 이메일로 보냈습니다!\n이메일을 확인해주세요',
      },
    },
  );

  const test: (regex: RegExp, text: string) => ValidatorState = (regex: RegExp, text: string) => {
    if (text.length == 0) {
      return 'none';
    }
    return regex.test(text) ? 'valid' : 'invalid';
  };

  const globalStyles = useGlobalStyles();

  return (
    <View style={[globalStyles.container, { padding: 20 }]}>
      <Text style={[{ marginBottom: 20, marginTop: 30 }, globalStyles.contentTitle]}>
        아이디 찾기
      </Text>

      <CustomInput
        placeholder={'이메일'}
        value={userEmail}
        onChangeText={(text: string) => setUserEmail(text)}
        keyboardType={'email-address'}
        state={test(emailRegex, userEmail)}
        shape={'round'}
        inputContainerStyle={{ height: theme.boxComponentHeight.xl }}
      />
      <FilledButton
        title="완료"
        disabled={!emailRegex.test(userEmail)}
        buttonStyle={{ marginVertical: -5 }}
        containerStyle={{ height: theme.boxComponentHeight.xl }}
        onPress={() => findUserNameMutation.mutateAsync({ email: userEmail })}
      />

      <Text style={[{ marginBottom: 20, marginTop: 30 }, globalStyles.contentTitle]}>
        비밀번호 찾기
      </Text>

      <CustomInput
        placeholder={'아이디'}
        value={userName}
        onChangeText={(text: string) => setuserName(text)}
        state={test(usernameRegex, userName)}
        shape={'round'}
        inputContainerStyle={{ height: theme.boxComponentHeight.xl }}
      />

      <CustomInput
        placeholder={'이메일'}
        value={userEmail}
        onChangeText={(text: string) => setUserEmail(text)}
        keyboardType={'email-address'}
        shape={'round'}
        inputContainerStyle={{ height: theme.boxComponentHeight.xl }}
        state={test(emailRegex, userEmail)}
      />
      <FilledButton
        title="완료"
        buttonStyle={{ marginVertical: -5 }}
        containerStyle={{ height: theme.boxComponentHeight.xl }}
        disabled={!emailRegex.test(userEmail) || !usernameRegex.test(userName)}
        onPress={() => findPasswordMutation.mutate({ email: userEmail, username: userName })}
      />
    </View>
  );
};

export default FindAccount;
