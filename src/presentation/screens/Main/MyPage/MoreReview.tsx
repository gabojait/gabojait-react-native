import { MainStackScreenProps } from '@/presentation/navigation/types';
import { useQueryErrorResetBoundary } from 'react-query';
import React, { Suspense } from 'react';
import { Loading } from '@/presentation/screens/Loading';
import Error404Boundary from '@/presentation/components/errorComponent/Error404Boundary';
import { useTheme } from '@rneui/themed';
import { PageRequest, useModelList } from '@/reactQuery/util/useModelList';
import { reviewKeys } from '@/reactQuery/key/ReviewKeys';
import { GetReviewProps, getUserReview } from '@/data/api/review';
import { FlatList } from 'react-native';
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
  const QueryKey = {
    all: reviewKeys.userReviews,
    filtered: (filter: PageRequest) => [
      ...QueryKey.all,
      'filtered',
      { ...filter, pageFrom: undefined },
    ],
  };
  const { userId } = route.params;
  const { data, isLoading, error, fetchNextPage, refetch, isRefreshing } = useModelList({
    initialParam: {
      pageFrom: 1,
      pageSize: 20,
      userId: userId,
    },
    idName: 'reviewId',
    key: reviewKeys.userReviews,
    fetcher: async ({ pageParam, queryKey: [_, params] }) => {
      return await getUserReview({
        ...(params as GetReviewProps),
        pageFrom: pageParam,
      });
    },
  });

  if (!data) {
    return null;
  }

  return (
    <FlatList
      onRefresh={() => {
        refetch();
      }}
      refreshing={isRefreshing}
      onEndReached={() => {
        fetchNextPage();
      }}
      onEndReachedThreshold={0.6}
      keyExtractor={item => item.reviewer}
      style={{ paddingHorizontal: 20, paddingTop: 10, backgroundColor: 'white' }}
      showsHorizontalScrollIndicator={false}
      data={data?.pages?.flatMap(page => page.data)}
      renderItem={({ item }) => (
        <ReviewItem name={item.reviewer} score={item.rating} content={item.post} />
      )}
    />
  );
};
