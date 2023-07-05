import client from '@/lib/axiosInstance'
import FavoriteUpdateDto from '@/model/Favorite/favoriteUpdateDto'

export const postFavoriteTeam = async (teamId: number, dto: FavoriteUpdateDto) => {
  return await client.post(`user/favorite/team/${teamId}`, dto)
}
