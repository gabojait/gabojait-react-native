import Gabojait from '@/presentation/components/icon/Gabojait';
import { MainStackScreenProps } from '@/presentation/navigation/types';
import { Text, useTheme } from '@rneui/themed';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Platform, View } from 'react-native';
import { signOut } from '@/redux/action/login';
import { RootStackNavigationProps } from '@/presentation/navigation/RootNavigation';
import useModal from '@/presentation/components/modal/useModal';
import { useTranslation } from 'react-i18next';
import { verifyPassword } from '@/data/api/accounts';
import OkDialogModalContent from '@/presentation/components/modalContent/OkDialogModalContent';
import { useAppDispatch } from '@/redux/hooks';
import { useNotificationRepository } from '@/data/localdb/notificationProvider';
import { Input } from '@rneui/base';
import { InputModalContent } from '@/presentation/components/modalContent/InputModalContent';
import CodePush, { LocalPackage } from 'react-native-code-push';
import {
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

const MenuItem = ({
  title,
  text,
  onClick,
}: {
  title: string;
  text?: string;
  onClick?: () => void;
}) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      disabled={!onClick}
      onPress={onClick}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 25,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: theme.colors.disabled,
      }}
    >
      <Text
        style={{
          fontSize: theme.fontSize.md,
          fontWeight: theme.fontWeight.semibold,
          color: 'black',
          textAlignVertical: 'center',
        }}
      >
        {title}
      </Text>
      {text && !onClick ? (
        <Text>{text}</Text>
      ) : (
        <Gabojait name="arrow-next" size={30} color={theme.colors.primary} />
      )}
    </TouchableOpacity>
  );
};

const Setting = ({ navigation }: MainStackScreenProps<'Setting'>) => {
  const { theme } = useTheme();

  const modal = useModal();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const notificationRepository = useNotificationRepository();
  const modalInputRef = useRef<Input>(null);
  const openFooConfirmDialog = () => {
    modal?.show({
      content: (
        <InputModalContent
          ref={modalInputRef} // Assign the ref to the BottomModal
          visible={modal?.modal}
          onBackgroundPress={modal?.hide}
          inputProcessor={text => {
            return text.replace(/[가-힣ㄱ-ㅎㅏ-ㅣ]/, '');
          }}
          inputProps={{
            secureTextEntry: true,
          }}
          yesButton={{
            title: t('action_confirm'),
            onPress: async () => {
              // Todo: Password Check
              try {
                const value = modalInputRef.current?.props?.value;
                if (value) {
                  if (await verifyPassword({ password: value })) {
                    navigation.navigate('UserModifier');
                    modal?.hide();
                  }
                }
              } catch (e) {
                modal?.hide();
                modal?.show({
                  content: (
                    <OkDialogModalContent
                      text={t('result_passwordNotVerified')}
                      onOkClick={modal?.hide}
                    />
                  ),
                });
              }
            },
          }}
          noButton={{
            title: t('action_goBack'),
            onPress: modal?.hide,
          }}
        />
      ),
    });
  };

  const [clickCnt, setClickCnt] = useState(0);
  const [lastClick, setLastClick] = useState(0);
  const [latestVersionPackage, setLatestVersionPackage] = useState<LocalPackage | null>(null);

  useEffect(() => {
    CodePush.getUpdateMetadata().then(r => {
      setLatestVersionPackage(r);
    });
  }, []);

  const isDev = useMemo(
    () =>
      latestVersionPackage?.deploymentKey ===
        process.env[`CODEPUSH_DEPLOYMENT_KEY_STAGING_${Platform.OS.toUpperCase()}`] || __DEV__,
    [latestVersionPackage],
  );
  const repository = useNotificationRepository();
  const onVersionClick = async () => {
    if (!isDev) {
      return;
    }
    const currTime = new Date().getTime();
    console.log(currTime, lastClick);
    if (currTime - lastClick > 2000) {
      setClickCnt(0);
    } else {
      if (clickCnt >= 4) {
        Alert.alert(
          '개발자 히든메뉴',
          `OS: ${Platform.OS} ${Platform.Version}
          ${
            latestVersionPackage != null
              ? '코드푸시 버전: ' +
                latestVersionPackage?.appVersion +
                '/' +
                latestVersionPackage?.label
              : ''
          }`,
          [
            {
              text: '알림 저장용 로컬 DB 초기화',
              onPress: () => {
                repository?.clear();
              },
            },
            {
              text: '닫기',
            },
          ],
        );
        setClickCnt(0);
      } else {
        setClickCnt(prev => prev + 1);
      }
    }
    setLastClick(new Date().getTime());
  };

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <MenuItem title="회원 정보 수정" onClick={() => openFooConfirmDialog()} />
      <MenuItem title="알림 설정" onClick={() => navigation.navigate('AlarmSetting')} />
      <MenuItem title="기타" onClick={() => navigation.navigate('Etc')} />
      <MenuItem
        title="로그아웃"
        onClick={async () => {
          await notificationRepository?.clear();
          dispatch(signOut());
          navigation.goBack();
          navigation
            .getParent<RootStackNavigationProps>()
            ?.replace('OnboardingNavigation', { screen: 'Login' });
        }}
      />
      <TouchableOpacity onPress={onVersionClick}>
        <MenuItem title="버전" text="1.0.0." />
      </TouchableOpacity>
      {clickCnt > 0 && (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            bottom: '7%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <View style={{ backgroundColor: theme.colors.grey5, padding: 10, borderRadius: 38 }}>
            <Text>{5 - clickCnt} 번 더 누르면 개발자 모드가 활성화됩니다.</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default Setting;
