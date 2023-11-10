import client from '@/lib/axiosInstance';
import FavoriteUpdateDto from '@/data/model/Favorite/FavoriteUpdateDto';
import { PageModel, PageRequest } from '@/reactQuery/util/useModelList';
import TeamBriefDto from '@/data/model/Team/TeamBriefDto';
import UserProfileOfferDto from '../model/User/UserProfileBriefDto';
import UserProfileDto from '../model/User/UserProfileDto';

export const postFavoriteTeam = async (teamId: string, dto: FavoriteUpdateDto) => {
  return await client.post(`user/favorite/team/${teamId}`, dto);
};

export const postFavoriteUser = async (userId: string, dto: FavoriteUpdateDto) => {
  return await client.post(`favorite/user/${userId}`, dto);
};

export const getFavoriteTeams = async (pageRequest: PageRequest) => {
  return (await client.get('user/favorite/team', {
    params: {
      'page-size': pageRequest.pageSize,
      'page-from': pageRequest.pageFrom,
    },
  })) as PageModel<TeamBriefDto>;
};

export const getFavoriteUsers = async (pageRequest: PageRequest) => {
  return (await client.get('favorite/user', {
    params: {
      'page-size': pageRequest.pageSize,
      'page-from': pageRequest.pageFrom,
    },
  })) as PageModel<UserProfileDto>;
};
