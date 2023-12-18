import { Text, useTheme } from '@rneui/themed';
import React, { useEffect } from 'react';
import { WIDTH } from '@/presentation/utils/util';
import CardWrapper from '@/presentation/components/CardWrapper';
import { StyleProp, View } from 'react-native';
import { RatingBar } from '@/presentation/components/RatingBar';

interface ReviewItemProps {
  name: string;
  score: number;
  content: string;
  style?: StyleProp<any>;
}

export const ReviewItem = ({ name, score, content, style }: ReviewItemProps) => {
  const { theme } = useTheme();
  useEffect(() => {
    console.log(WIDTH);
  }, []);
  return (
    <CardWrapper
      style={[
        {
          minHeight: 180,
          padding: 20,
          marginVertical: 10,
          borderWidth: 1,
          borderColor: theme.colors.disabled,
        },
        style,
      ]}
    >
      <View
        style={{
          width: '100%',
        }}
      >
        <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
          <Text
            style={{
              fontSize: theme.fontSize.sm,
              fontWeight: theme.fontWeight.bold,
              paddingRight: 5,
            }}
          >
            {name}
          </Text>
          <RatingBar ratingScore={score} size={theme.ratingBarSize.xs} />
        </View>
        <Text
          numberOfLines={5}
          ellipsizeMode="tail"
          style={{
            color: theme.colors.grey1,
            fontSize: theme.fontSize.xs,
            fontWeight: theme.fontWeight.light,
            lineHeight: 25,
          }}
        >
          {content}
        </Text>
      </View>
    </CardWrapper>
  );
};
