import client from '@/lib/axiosInstance'
import Reviews from '@/data/model/Review/Reviews'

export const getTeamsToReview = async () => {
  const result = await client.get(`user/reviews`)
  return result
}

export const getTeamToReview = async (teamId: String) => {
  const result = await client.get(`user/team/${teamId}/review`)
  return result
}
export const getReviewQuestions = async () => {
  const result = await client.get(`review/questions`)
  return result
}

export const createReview = async (review: Reviews, teamId: String) => {
  const result = await client.post(`user/team/${teamId}/review`, review)
  return result
}
