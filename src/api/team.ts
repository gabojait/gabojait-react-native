import client from "@/lib/axiosInstance";
import TeamRequestDto from "@/model/Team/TeamRequestDto";
export const createTeam = async (dto: TeamRequestDto) => {
        const result = await client.post('team', dto)
        console.log(result)
        return result
}

export const getTeams = async (pageFrom: number, pageNum: number) => {
        const params = {pageFrom: pageFrom, pageNum: pageNum}
        const result = await client.get('team/find', { params: params })
        console.log(result)
        return result
}