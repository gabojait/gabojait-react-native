import { MainStackScreenProps } from '@/presentation/navigation/types';
import { useQuery, useQueryErrorResetBoundary, UseQueryResult } from 'react-query';
import React, { Suspense } from 'react';
import { Loading } from '@/presentation/screens/Loading';
import Error404Boundary from '@/presentation/components/errorComponent/Error404Boundary';
import { useTheme } from '@rneui/themed';
import { FlatList } from 'react-native';
import ProfileViewResponse from '@/data/model/Profile/ProfileViewResponse';
import { profileKeys } from '@/reactQuery/key/ProfileKeys';
import { getProfile } from '@/data/api/profile';
import { ReviewItem } from '@/presentation/components/ReviewItem';

export const MoreReview = ({ navigation, route }: MainStackScreenProps<'MoreReview'>) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <Suspense fallback={Loading()}>
      <Error404Boundary onReset={reset} message="리뷰가 존재하지 않습니다">
        <MoreReviewComponent navigation={navigation} route={route} />
      </Error404Boundary>
    </Suspense>
  );
};

const MoreReviewComponent = ({ navigation, route }: MainStackScreenProps<'MoreReview'>) => {
  const { theme } = useTheme();
  const userId = route.params.userId;
  const {
    data: profile,
    isLoading,
    error,
  }: UseQueryResult<ProfileViewResponse> = useQuery(
    profileKeys.profileUserId(userId),
    ({ queryKey: [_, _userId] }) => getProfile(_userId),
  );

  return (
    <FlatList
      style={{ paddingHorizontal: 20, paddingTop: 10, backgroundColor: 'white' }}
      showsHorizontalScrollIndicator={false}
      data={profile?.reviews}
      renderItem={({ item }) => (
        <ReviewItem name={item.reviewer} score={item.rating} content={item.post} />
      )}
    />
  );
};
