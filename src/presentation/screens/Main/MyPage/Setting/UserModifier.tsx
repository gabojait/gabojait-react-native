import {FilledButton} from '@/presentation/components/Button';
import CustomInput from '@/presentation/components/CustomInput';
import {CustomSwitch} from '@/presentation/components/CustomSwitch';
import {MainStackScreenProps} from '@/presentation/navigation/types';
import {nicknameRegex, passwordRegex} from '@/presentation/utils/util';
import {Text, useTheme} from '@rneui/themed';
import React, {useState} from 'react';
import {View} from 'react-native';
import {changeNickname, changePassword, checkNicknameDuplicate, checkUsernameDuplicate} from "@/data/api/accounts";
import {useMutation} from "react-query";
import {useMutationDialog} from "@/reactQuery/util/useMutationDialog";
import {useTranslation} from "react-i18next";

const UserModifier = ({navigation}: MainStackScreenProps<'UserModifier'>) => {
    const {theme} = useTheme();

    const [nickname, setNickname] = useState('');
    const [passwords, setPasswords] = useState<string[]>([]);
    const [dupChecked, setDupChecked] = useState(false);
    const {mutation: checkNicknameDuplicateMutation} = useMutationDialog(['checkNicknameDuplicate', nickname], checkNicknameDuplicate, {
        onSuccessClick: () => {
            setDupChecked(true);
        },
        resultToMessage: () => t("nicknameDupOk")
    })
    const {mutation: changeNicknameMutation} = useMutationDialog(['changeNickName', nickname], changeNickname, {
        onSuccessClick: () => {
            setDupChecked(true);
        },
        resultToMessage: () => t("result_nicknameChangeOk")
    })

    const {mutation: changePwMutation} = useMutationDialog(['changePassword', passwords], changePassword)
    const {t} = useTranslation();
    return (
        <View style={{backgroundColor: 'white', flex: 1, padding: 20}}>
            <Text h4 style={{marginBottom: theme.spacing.md}}>
                {t("changeNickNm")}
            </Text>
            <CustomInput
                containerStyle={{marginBottom: theme.spacing.md}}
                shape="round"
                value={nickname}
                disabled={dupChecked}
                onChangeText={value => setNickname(value)}
            />
            <FilledButton
                style={{marginBottom: theme.spacing.md}}
                title={dupChecked ? t("action_confirm") : t("action_checkDup")}
                disabled={!nicknameRegex.test(nickname)}
                onPress={() => {
                    if (!dupChecked)
                        checkNicknameDuplicateMutation.mutate(nickname)
                    else
                        changeNicknameMutation.mutate({nickname})
                }}
            />
            <Text h4 style={{marginBottom: theme.spacing.md}}>
                비밀번호 변경
            </Text>
            <CustomInput
                containerStyle={{marginBottom: theme.spacing.md}}
                shape="round"
                secureTextEntry
                value={passwords[0]}
                onChangeText={value => setPasswords(prevState => [value, prevState[1]])}
            />
            <CustomInput
                containerStyle={{marginBottom: theme.spacing.md}}
                shape="round"
                secureTextEntry
                value={passwords[1]}
                onChangeText={value => setPasswords(prevState => [prevState[0], value])}
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
                        passwordReEntered: passwords[1]
                    })
                }}
            />
        </View>
    );
};

export default UserModifier;

