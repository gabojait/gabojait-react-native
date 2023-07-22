import { FilledButton } from '@/presentation/components/Button';
import { useTheme } from '@rneui/themed';
import { Text, View } from 'react-native';
import React from 'react';
import useGlobalStyles from '@/presentation/styles';
import { MainStackScreenProps } from '@/presentation/navigation/types';

export const CompleteSuccess = ({ navigation }: MainStackScreenProps<'CompleteSuccess'>) => {
  const globalStyles = useGlobalStyles();
  const { theme } = useTheme();

  return (
    <View style={[globalStyles.container]}>
      <Text
        style={{
          fontWeight: theme.fontWeight.semibold,
          fontSize: 15,
          color: 'black',
          textAlign: 'center',
          paddingBottom: 15,
          lineHeight: 25,
        }}
      >
        {'감사합니다! 프로젝트 완료 심사까지\n 조금만 기다려주세요'}
      </Text>
      <Text
        style={{
          fontWeight: theme.fontWeight.semibold,
          fontSize: theme.fontSize.sm,
          color: theme.colors.disabled,
          textAlign: 'center',
          lineHeight: 30,
          paddingBottom: 20,
        }}
      >
        {'완료 심사까진 약 일주일 정도 소요됩니다\n 완료 심사 후 리뷰를 남길 수 있습니다'}
      </Text>
      <FilledButton
        title={'완료하기'}
        containerStyle={{ paddingTop: 10 }}
        onPress={() => {
          //TODO:queryClient이용으로 refetch하기
          navigation.navigate('Team', { refetchKey: 'TEAM_COMPLETE' });
        }}
      />
    </View>
  );
};
