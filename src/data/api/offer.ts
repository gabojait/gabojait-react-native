import client from '@/lib/axiosInstance'
import {Position} from '@/data/model/type/Position'

export const applyToTeam = async (position: string, teamId: number) => {
  const body = {position: position}
  const result = await client.post(`user/team/${teamId}/offer`, body)
  return result
}
