import client from "@/lib/axiosInstance"

export const getProfile = async() => {
    const result = await client.get(`user/profile`)
    return result
}