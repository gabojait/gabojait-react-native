import client from '@/lib/axiosInstance'
import {ResponseWrapper} from '@/data/model/ResponseWrapper'
import TeamBriefResponseDto from '@/data/model/Team/TeamBriefResponseDto'
import TeamListDto from '@/data/model/Team/TeamListDto'
import TeamRequestDto from '@/data/model/Team/TeamRequestDto'
import {Position} from '@/data/model/type/Position'
import {TeamOrder} from '@/data/model/type/TeamOrder'

export type GetRecruitingProps = {
  pageFrom: number
  pageSize: number
  position: Position
  teamOrder: TeamOrder
}

export const createTeam = async (dto: TeamRequestDto) => {
  const result = await client.post('team', dto)
  return result
}
export async function getRecruiting(props: GetRecruitingProps) {
  const {pageFrom, pageSize, position, teamOrder} = props
  let params = {
    'page-from': pageFrom.toString(),
    'page-size': pageSize.toString(),
    position: position,
    'team-order': teamOrder,
  }
  return (await client.get('team/recruiting', {params})) as TeamListDto[]
}

export const getTeam = async (teamId: number) => {
  return await client.get(`team/${teamId}`)
}

export const getMyTeam = async () => {
  return await client.get(`user/team`)
}
