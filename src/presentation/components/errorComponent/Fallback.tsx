import { Text, View } from 'react-native';
import React, { Children, ReactNode } from 'react';
import { FilledButton } from '../Button';
import { useTheme } from '@rneui/themed';
import { WIDTH } from '@/presentation/utils/util';

interface FallbackProps {
  onPressReset: () => void;
}

export const Fallback404 = (props: FallbackProps) => {
  const { theme } = useTheme();
  return (
    <View
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}
    >
      <Text style={{ fontSize: WIDTH / 3, paddingBottom: 20 }}>🫥</Text>
      <Text style={{ fontSize: 22, fontWeight: theme.fontWeight.medium, paddingBottom: 20 }}>
        404 NotFound
      </Text>
      <FilledButton title={'새로고침'} size="sm" onPress={() => props.onPressReset()} />
    </View>
  );
};

export const Fallback500 = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>500 서버에러</Text>
    </View>
  );
};

export const Fallback503 = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>500 서버에러</Text>
    </View>
  );
};
