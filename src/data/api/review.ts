import client from '@/lib/axiosInstance';
import Reviews from '@/data/model/Review/Reviews';
import { PageModel } from '@/reactQuery/util/useModelList';
import ReviewResponse from '@/data/model/Profile/ReviewResponse';

export type GetReviewProps = {
  pageFrom: number;
  pageSize: number;
  userId: number;
};

export const getTeamsToReview = async () => {
  const result = await client.get('user/team/review');
  return result;
};

export const getTeamToReview = async (teamId: string) => {
  const result = await client.get(`user/team/${teamId}/review`);
  return result;
};

export const createReview = async (review: Reviews, teamId: String) => {
  const result = await client.post(`user/team/${teamId}/review`, review);
  return result;
};

export const getUserReview = async (params: GetReviewProps) => {
  const result = await client.get(`user/${params.userId}/review`, {
    params: {
      'page-from': params.pageFrom,
      'page-size': params.pageSize,
      userId: params.userId,
    },
  });
  return result as PageModel<ReviewResponse>;
};
