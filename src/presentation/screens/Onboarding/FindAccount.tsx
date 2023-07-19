import { findPassword, findUserName } from '@/data/api/accounts';
import { FilledButton } from '@/presentation/components/Button';
import CustomInput from '@/presentation/components/CustomInput';
import { ModalContext } from '@/presentation/components/modal/context';
import useModal from '@/presentation/components/modal/useModal';
import SymbolModalContent from '@/presentation/components/modalContent/SymbolModalContent';
import { ValidatorState } from '@/presentation/components/props/StateProps';
import useGlobalStyles from '@/presentation/styles';
import { emailRegex, usernameRegex } from '@/presentation/utils/util';
import { Button, Input, Text, useTheme } from '@rneui/themed';
import React, { useState } from 'react';
import { View } from 'react-native';
import { useMutation } from 'react-query';
const FindAccount = () => {
  const [userName, setuserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const modal = useModal();
  const { theme } = useTheme();

  const findUserNameMutation = useMutation(findUserName, {
    onSuccess(data, variables, context) {
      modal?.show({
        title: '',
        content: (
          <SymbolModalContent
            title="아이디 전달 완료!"
            text={`아이디를 이메일로 전달했습니다!\n이메일을 확인해주세요`}
            symbol={<Text style={{ fontSize: theme.emojiSize.md, textAlign: 'center' }}>✉️</Text>}
            yesButton={{ title: '확인', onPress: () => modal.hide() }}
          />
        ),
      });
    },
  });

  const findPasswordMutation = useMutation(findPassword, {
    onSuccess(data, variables, context) {
      modal?.show({
        title: '',
        content: (
          <SymbolModalContent
            title="임시 비밀번호 전달 완료!"
            text={`임시 비밀번호를 이메일로 보냈습니다!\n이메일을 확인해주세요`}
            symbol={<Text style={{ fontSize: theme.emojiSize.md, textAlign: 'center' }}>✉️</Text>}
            yesButton={{ title: '확인', onPress: () => modal.hide() }}
          />
        ),
      });
    },
  });

  const test: (regex: RegExp, text: string) => ValidatorState = (regex: RegExp, text: string) => {
    if (text.length == 0) return 'none';
    return regex.test(text) ? 'valid' : 'invalid';
  };

  const globalStyles = useGlobalStyles();

  return (
    <View style={[globalStyles.container, { padding: 20 }]}>
      <Text h4 style={{ marginBottom: 20, marginTop: 30 }}>
        아이디 찾기
      </Text>

      <CustomInput
        placeholder={'이메일'}
        value={userEmail}
        onChangeText={(text: string) => setUserEmail(text)}
        keyboardType={'email-address'}
        state={test(emailRegex, userEmail)}
      />
      <FilledButton
        title="완료"
        disabled={!emailRegex.test(userEmail)}
        containerStyle={{ paddingVertical: 20 }}
        onPress={() => findUserNameMutation.mutate({ email: userEmail })}
      />

      <Text h4 style={{ marginVertical: 20, marginTop: 30 }}>
        비밀번호 찾기
      </Text>

      <CustomInput
        placeholder={'아이디'}
        value={userName}
        onChangeText={(text: string) => setuserName(text)}
        state={test(usernameRegex, userName)}
        containerStyle={{ marginBottom: 12 }}
      />

      <CustomInput
        placeholder={'이메일'}
        value={userEmail}
        onChangeText={(text: string) => setUserEmail(text)}
        keyboardType={'email-address'}
        state={test(emailRegex, userEmail)}
      />
      <FilledButton
        title="완료"
        disabled={!emailRegex.test(userEmail) || !usernameRegex.test(userName)}
        onPress={() => findPasswordMutation.mutate({ email: userEmail, username: userName })}
        containerStyle={{ paddingVertical: 20 }}
      />
    </View>
  );
};

export default FindAccount;
