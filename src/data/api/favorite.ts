import client from '@/lib/axiosInstance'
import FavoriteUpdateDto from '@/data/model/Favorite/FavoriteUpdateDto'

export const postFavoriteTeam = async (teamId: number, dto: FavoriteUpdateDto) => {
  return await client.post(`user/favorite/team/${teamId}`, dto)
}
