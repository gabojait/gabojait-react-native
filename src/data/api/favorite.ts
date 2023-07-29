import client from '@/lib/axiosInstance'
import FavoriteUpdateDto from '@/data/model/Favorite/FavoriteUpdateDto'
import {PageModel, PageRequest} from "@/reactQuery/util/useModelList";
import TeamBriefDto from "@/data/model/Team/TeamBriefDto";

export const postFavoriteTeam = async (teamId: number, dto: FavoriteUpdateDto) => {
    return await client.post(`user/favorite/team/${teamId}`, dto)
}


export const getFavoriteTeams = async (pageRequest: PageRequest) => {
    return await client.get('user/favorite/team', {
        params: {
            'page-size': pageRequest.pageSize,
            'page-from': pageRequest.pageFrom
        }
    }) as PageModel<TeamBriefDto>
}