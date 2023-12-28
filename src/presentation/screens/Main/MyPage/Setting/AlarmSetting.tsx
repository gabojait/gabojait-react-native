import { CustomSwitch } from '@/presentation/components/CustomSwitch';
import { MainStackScreenProps } from '@/presentation/navigation/types';
import { Text, useTheme } from '@rneui/themed';
import React, { Suspense, useEffect } from 'react';
import { View } from 'react-native';
import { useMutation, useQueryErrorResetBoundary } from 'react-query';
import { userKeys } from '@/reactQuery/key/UserKeys';
import { updateNotification } from '@/data/api/accounts';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import LoadingSpinner, { Loading } from '@/presentation/screens/Loading';
import { getUser } from '@/redux/action/login';
import Error404Boundary from '@/presentation/components/errorComponent/Error404Boundary';

const AlarmSetting = ({ navigation, route }: MainStackScreenProps<'MoreReview'>) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <Suspense fallback={Loading()}>
      <Error404Boundary onReset={reset} message="리뷰가 존재하지 않습니다">
        <AlarmSettingComponent navigation={navigation} route={route} />
      </Error404Boundary>
    </Suspense>
  );
};

const AlarmSettingComponent = ({ navigation, route }: MainStackScreenProps<'AlarmSetting'>) => {
  const { theme } = useTheme();
  const { mutate } = useMutation(
    userKeys.updateNotification,
    (isNotified: boolean) => updateNotification(isNotified),
    {
      useErrorBoundary: true,
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

  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <></>;
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
        <CustomSwitch onChange={toggleSwitch} value={user?.isNotified} />
      </View>
    </View>
  );
};

export default AlarmSetting;
