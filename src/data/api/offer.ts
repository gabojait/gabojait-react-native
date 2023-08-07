import client from '@/lib/axiosInstance';
import { Position } from '@/data/model/type/Position';
import { PageModel, PageRequest } from '@/reactQuery/util/useModelList';
import BriefOfferDto from '@/data/model/Offer/BriefOfferDto';

export const applyToTeam = async (position: string, teamId: string) => {
  const body = { position: position };
  const result = await client.post(`user/team/${teamId}/offer`, body);
  return result;
};

export const getOffersFromTeam = async (body: PageRequest) => {
  const result = await client.get('user/offer', {
    params: {
      'page-from': body.pageFrom,
      'page-size': body.pageSize,
    },
  });
  return result as PageModel<BriefOfferDto>;
};

export const sendOfferToUser = async (userId: string, position: Position) => {
  return await client.post(`team/user/${userId}/offer`, { position: position });
};
