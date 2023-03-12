import client from "@/lib/axiosInstance"

export const getTeamToReview = async () => {
    const result = await client.get(`user/reviews`)
    return result
}

export const getReviewQuestions = async () => {
    const result = await client.get(`review/questions`)
    return result
}