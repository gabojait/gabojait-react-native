import Gabojait from '@/presentation/components/icon/Gabojait'
import {MainStackScreenProps, RootStackParamList} from '@/presentation/navigation/types'
import {useNavigation} from '@react-navigation/native'
import {useTheme} from '@rneui/themed'
import React, {useState, useTransition} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {signOut} from "@/redux/action/login";
import {RootNavigation, RootStackNavigationProps} from "@/presentation/navigation/RootNavigation";
import useModal from "@/presentation/components/modal/useModal";
import BottomModalContent from "@/presentation/components/modalContent/BottomModalContent";
import {useTranslation} from "react-i18next";
import CustomInput from "@/presentation/components/CustomInput";
import {verifyPassword} from "@/data/api/accounts";
import OkDialogModalContent from "@/presentation/components/modalContent/OkDialogModalContent";

const MenuItem = ({title, text, onClick}: { title: string; text?: string; onClick?: () => void }) => {
    const {theme} = useTheme()
    return (
        <TouchableOpacity
            onPress={onClick}
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 25,
                paddingHorizontal: 20,
                borderTopWidth: 1,
                borderTopColor: theme.colors.disabled,
            }}>
            <Text
                style={{
                    fontSize: theme.fontSize.md,
                    fontWeight: theme.fontWeight.semibold,
                    color: 'black',
                    textAlignVertical: 'center',
                }}>
                {title}
            </Text>
            {text && !onClick ? (
                <Text>{text}</Text>
            ) : (
                <Gabojait name="arrow-next" size={30} color={theme.colors.primary}/>
            )}
        </TouchableOpacity>
    )
}

const Setting = ({navigation}: MainStackScreenProps<'Setting'>) => {
    const {theme} = useTheme()

    const modal = useModal();
    const {t} = useTranslation();

    const [currentPassword, setCurrentPassword] = useState("");

    return (
        <View style={{backgroundColor: 'white', flex: 1}}>
            <MenuItem title="회원 정보 수정" onClick={() =>
                modal?.show({
                    content: <BottomModalContent
                        title={t("order_enterCurrentPassword")}
                        yesButton={{
                            title: t("action_confirm"),
                            onPress: async () => {
                                // Todo: Password Check
                                try {
                                    if (await verifyPassword({password: currentPassword})) {
                                        navigation.navigate("UserModifier")
                                        modal.hide()
                                    }
                                } catch (e) {
                                    modal.hide();
                                    modal.show({
                                        content: <OkDialogModalContent
                                            text={t("result_passwordNotVerified")}
                                            onOkClick={() => modal.hide()}
                                        />
                                    })
                                }
                            }
                        }
                        }
                        noButton={{
                            title: t("action_goBack"),
                            onPress: () => modal.hide()
                        }}
                    >
                        <CustomInput
                            onChangeText={(v) => {
                                setCurrentPassword(v)
                            }}
                            secureTextEntry
                        />
                    </BottomModalContent>
                })
            }/>
            <MenuItem title="알림 설정" onClick={() => navigation.navigate('AlarmSetting')}/>
            <MenuItem title="기타" onClick={() => navigation.navigate('Etc')}/>
            <MenuItem title="로그아웃" onClick={() => {
                signOut()
                navigation.getParent<RootStackNavigationProps>()?.navigate('OnboardingNavigation', {screen: 'Login'})
            }}/>
            <MenuItem title="버전" text="1.0.0."/>
        </View>
    )
}

export default Setting
