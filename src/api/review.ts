import client from "@/lib/axiosInstance"

export const getTeamsToReview = async () => {
    const result = await client.get(`user/reviews`)
    return result
}

export const getTeamToReview = async (teamId:String) => {
    const result = await client.get(`user/team/${teamId}/review`)
    return result
}
export const getReviewQuestions = async () => {
    const result = await client.get(`review/questions`)
    return result
}
