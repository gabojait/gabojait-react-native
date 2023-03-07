import client from "@/lib/axiosInstance";
import TeamRequestDto from "@/model/Team/TeamRequestDto";
export const createTeam = async (dto: TeamRequestDto) => {
    const result = await client.post('team', dto)
    return result
}

export const getTeams = async (pageFrom: number, pageNum: number) => {
    const params = {pageFrom: pageFrom, pageNum: pageNum}
    const result = await client.get('team/find', { params: params })
    return result
}

export const getTeamDetail = async (teamId: string) => {
    const result = await client.get(`team/${teamId}`)
    return result
}

export const applyToTeam = async (position: string, teamId: string) => {
    const body = { position: position }
    const result = await client.get(`user/team/${teamId}/offer`, body)
    return result
}