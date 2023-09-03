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
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import LoadingSpinner from '@/presentation/screens/Loading';
import { getUser } from '@/redux/action/login';

const AlarmSetting = ({ navigation }: MainStackScreenProps<'AlarmSetting'>) => {
  const { theme } = useTheme();
  const { mutate } = useMutation(
    userKeys.updateNotification,
    (isNotified: boolean) => updateNotification(isNotified),
    {
      onSuccess: async () => {
        dispatch(getUser());
      },
    },
  );

  const { data: user, loading, error } = useAppSelector(state => state.loginReducer.user);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);
  function toggleSwitch() {
    mutate(!user?.isNotified);
  }

  if (loading) return <LoadingSpinner />;
  if (error) return <></>;

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
        <CustomSwitch onChange={toggleSwitch} value={user?.isNotified} />
      </View>
    </View>
  );
};

export default AlarmSetting;
