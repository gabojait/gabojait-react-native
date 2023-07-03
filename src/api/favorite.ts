import client from '@/lib/axiosInstance'

export const postFavoriteTeam = async (teamId: number) => {
  return await client.post(`user/favorite.team/${teamId}`)
}
