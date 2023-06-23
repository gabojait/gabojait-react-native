import client from '@/lib/axiosInstance'
import {ResponseWrapper} from '@/model/ResponseWrapper'
import TeamBriefResponseDto from '@/model/Team/TeamBriefResponseDto'
import TeamRequestDto from '@/model/Team/TeamRequestDto'
import {Position} from '@/model/type/Position'
import {TeamOrder} from '@/model/type/TeamOrder'

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

export const getTeams = async (pageFrom: number, pageSize: number) => {
  const params = {pageFrom: pageFrom, pageSize: pageSize}
  const result = await client.get('team/find', {params: params})
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
  return (await client.get('team/recruiting', {params})) as TeamBriefResponseDto[]
}

export const getTeam = async (teamId: string) => {
  return await client.get(`team/1`)
}

export const applyToTeam = async (position: string, teamId: string) => {
  const body = {position: position}
  const result = await client.post(`user/team/${teamId}/offer`, body)
  return result
}

export const findIndividuals = async (pageFrom: number, pageNum: number, position: string) => {
  const params = {pageFrom: pageFrom, pageNum: pageNum}
  const result = await client.get(`user/profile/${position}`, {params: params})
  return result
}
