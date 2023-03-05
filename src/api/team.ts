import client from "@/lib/axiosInstance";
import TeamRequestDto from "@/model/TeamRequestDto";

export const createTeam = async (dto: TeamRequestDto) => {
        const result = await client.post('team', dto)
        console.log(result)
        return result
}