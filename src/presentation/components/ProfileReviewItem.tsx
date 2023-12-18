import Review from '@/data/model/Profile/ReviewResponse';
import { makeStyles, Text, useTheme } from '@rneui/themed';
import { View } from 'react-native';
import { RatingBar } from '@/presentation/components/RatingBar';
import React from 'react';

export const ProfileReviewItem = ({ review }: { review: Review }) => {
  const { theme } = useTheme();
  const styles = useStyles();
  return (
    <View
      style={{
        marginBottom: 20,
        width: '100%',
      }}
    >
      <View
        style={{
          marginBottom: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View style={{ flexDirection: 'column', width: '100%' }}>
          <Text
            style={[
              styles.profileText1,
              {
                paddingEnd: 7,
                paddingTop: 4,
                marginBottom: 4,
              },
            ]}
          >
            {review.reviewer}
          </Text>
          <RatingBar ratingScore={review.rating} size={20} />
        </View>
      </View>
      <Text
        style={{ fontWeight: theme.fontWeight.light, color: theme.colors.grey1, lineHeight: 25 }}
        numberOfLines={3}
        ellipsizeMode="tail"
      >
        {review.post}
      </Text>
      <Text
        style={{ fontWeight: theme.fontWeight.light, color: theme.colors.grey1, lineHeight: 25 }}
      >
        {new Date(review.createdAt).format('yyyy-MM-dd')}
      </Text>
    </View>
  );
};

const useStyles = makeStyles(theme => ({
  profileText1: {
    fontWeight: theme.fontWeight.bold,
    fontSize: theme.fontSize.md,
  },
  profileText2: {
    fontSize: theme.fontSize.sm,
  },
  profileText3: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.light,
  },
  textStyle: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    textAlign: 'center',
  },
}));
