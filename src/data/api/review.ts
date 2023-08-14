import client from '@/lib/axiosInstance';
import Reviews from '@/data/model/Review/Reviews';
import { PageRequest } from '@/reactQuery/util/useModelList';

export type GetReviewProps = {
  pageFrom: number;
  pageSize: number;
  userId: number;
};

export const getTeamsToReview = async () => {
  const result = await client.get(`user/team/review`);
  return result;
};

export const getTeamToReview = async (teamId: string) => {
  const result = await client.get(`user/team/${teamId}/review`);
  return result;
};
export const getReviewQuestions = async () => {
  const result = await client.get(`review/questions`);
  return result;
};

export const createReview = async (review: Reviews, teamId: String) => {
  const result = await client.post(`user/team/${teamId}/review`, review);
  return result;
};
