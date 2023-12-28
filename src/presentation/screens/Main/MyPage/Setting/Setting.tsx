import Gabojait from '@/presentation/components/icon/Gabojait';
import { MainStackScreenProps } from '@/presentation/navigation/types';
import { Text, useTheme } from '@rneui/themed';
import React, { useRef, useState } from 'react';
import { Alert, Platform, View } from 'react-native';
import { signOut } from '@/redux/action/login';
import { RootStackNavigationProps } from '@/presentation/navigation/RootNavigation';
import useModal from '@/presentation/components/modal/useModal';
import { useTranslation } from 'react-i18next';
import { verifyPassword } from '@/data/api/accounts';
import OkDialogModalContent from '@/presentation/components/modalContent/OkDialogModalContent';
import { useAppDispatch } from '@/redux/hooks';
import { Input } from '@rneui/base';
import { InputModalContent } from '@/presentation/components/modalContent/InputModalContent';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useInterval from '@/presentation/utils/useInterval';
import usePlatform from '@/lib/usePlatform';
import useGlobalStyles from '@/presentation/styles';

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
        alignItems: 'center',
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
  const globalStyle = useGlobalStyles();
  const modal = useModal();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const modalInputRef = useRef<Input>(null);
  const openFooConfirmDialog = () => {
    modal?.show({
      content: (
        <InputModalContent
          header={<Text style={globalStyle.modalTitle}>현재 비밀번호를 입력해주세요</Text>}
          ref={modalInputRef}
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
          onInputValueChange={() => {}}
        />
      ),
    });
  };

  const [clickCnt, setClickCnt] = useState(0);
  const [lastClick, setLastClick] = useState(0);
  const [currTime, setCurrTime] = useState(new Date().getTime());
  const interval = useInterval(() => {
    setCurrTime(new Date().getTime());
  }, 1000);

  const platform = usePlatform();

  const onVersionClick = async () => {
    if (!platform.isDev) {
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
            platform.currentPackage != null
              ? '코드푸시 버전: ' +
                platform.currentPackage?.appVersion +
                '/' +
                platform.currentPackage?.label
              : '디버그 모드입니다. 코드푸시가 비활성화 되어 있습니다.'
          }`,
          [
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
