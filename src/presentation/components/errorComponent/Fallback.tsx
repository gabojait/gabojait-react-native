import { BackHandler, View } from 'react-native';
import React, { Children, ReactNode } from 'react';
import { FilledButton } from '../Button';
import { Text, useTheme } from '@rneui/themed';
import { WIDTH } from '@/presentation/utils/util';

interface FallbackProps {
  message?: string;
  onPressReset: () => void;
}

export const Fallback404 = (props: FallbackProps) => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}
    >
      <Text style={{ fontSize: 120, paddingBottom: 20, width: 140 }}>🫥</Text>
      <Text style={{ fontSize: 22, fontWeight: theme.fontWeight.medium, paddingBottom: 20 }}>
        {props.message ?? '404 NotFound'}
      </Text>
      <FilledButton
        title={'새로고침'}
        size="sm"
        onPress={() => props.onPressReset()}
        buttonStyle={{ width: WIDTH / 3 }}
      />
    </View>
  );
};

export const Fallback500 = (props: FallbackProps) => {
  const { theme } = useTheme();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: WIDTH / 3, paddingBottom: 20 }}>🧐</Text>
      <Text style={{ fontSize: 22, fontWeight: theme.fontWeight.medium, paddingBottom: 20 }}>
        서버 에러
      </Text>
      <Text style={{ fontSize: 14, fontWeight: theme.fontWeight.medium, paddingBottom: 20 }}>
        이용에 불편을 드려 죄송합니다
      </Text>
      <FilledButton title={'새로고침'} size="sm" onPress={() => props.onPressReset()} />
    </View>
  );
};

export const Fallback503 = () => {
  const { theme } = useTheme();
  return (
    <View
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}
    >
      <Text style={{ fontSize: WIDTH / 3, paddingBottom: 20 }}>🛠</Text>
      <Text style={{ fontSize: 22, fontWeight: theme.fontWeight.medium, paddingBottom: 20 }}>
        현재는 점검시간입니다!
      </Text>
      <Text style={{ fontSize: 14, fontWeight: theme.fontWeight.medium, paddingBottom: 20 }}>
        점검이 끝날 때까지 잠시만 기다려주세요
      </Text>
      <FilledButton
        title={'새로고침'}
        size="lg"
        onPress={() => BackHandler.exitApp()}
        buttonStyle={{ width: WIDTH * 0.9 }}
      />
    </View>
  );
};
