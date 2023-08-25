import { CustomSwitch } from '@/presentation/components/CustomSwitch';
import { MainStackScreenProps } from '@/presentation/navigation/types';
import { useTheme, Text } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageKey } from '@/lib/asyncStorageKey';
import { useMutation } from 'react-query';
import { userKeys } from '@/reactQuery/key/UserKeys';
import { updateNotification } from '@/data/api/accounts';

const AlarmSetting = ({ navigation }: MainStackScreenProps<'AlarmSetting'>) => {
  const { theme } = useTheme();
  const alertEnabledValue = {
    true: 'true',
    false: 'false',
  };
  const { mutate } = useMutation(
    userKeys.updateNotification,
    (isNotified: boolean) => updateNotification(isNotified),
    {
      onSuccess: () => {
        setIsEnabled(previousState => !previousState);
        AsyncStorage.setItem(AsyncStorageKey.alertEnabled, alertEnabledValue.true);
      },
    },
  );
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    async () => {
      const value = await AsyncStorage.getItem(AsyncStorageKey.alertEnabled);
      setIsEnabled(mapStringToBoolean(value ?? alertEnabledValue.false));
    };
  }, []);

  function mapStringToBoolean(value: string) {
    if (value == alertEnabledValue.true) return true;
    else return false;
  }

  function toggleSwitch() {
    mutate(isEnabled);
  }

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <View
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
          모든 알림
        </Text>
        <CustomSwitch onChange={toggleSwitch} value={isEnabled} />
      </View>
    </View>
  );
};

export default AlarmSetting;
