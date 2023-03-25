import client from '@/lib/axiosInstance'

export const getProfile = async () => {
  const result = await client.get('user/profile')
  console.log(result)
  return result
}
export const setProfileVisibility = async (isPublic: boolean) => {
  const result = await client.patch('user/profile/visibility', {isPublic})
  console.log(result)
  return result
}
