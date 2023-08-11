import client from '@/lib/axiosInstance';
import { Position } from '@/data/model/type/Position';
import { PageModel, PageRequest } from '@/reactQuery/util/useModelList';
import BriefOfferDto from '@/data/model/Offer/BriefOfferDto';
import OffersFromUserDto from '../model/Offer/OffersFromUserDto';

export type GetOfferFromUsersProps = {
  pageSize: number;
  pageFrom?: number;
  position: Position;
};

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

export const getOffersFromUser = async (params: GetOfferFromUsersProps) => {
  const result = await client.get('team/offer', {
    params: {
      'page-from': params.pageFrom,
      'page-size': params.pageSize,
      position: params.position,
    },
  });
  return result as PageModel<OffersFromUserDto>;
};

export const sendOfferToUser = async (userId: string, position: Position) => {
  return await client.post(`team/user/${userId}/offer`, { position: position });
};

export const rejectOfferFromUser = async (offerId: number) => {
  return await client.delete(`team/offer/${offerId}`);
};

export const acceptOfferFromUser = async (offerId: number, isAccepted: boolean) => {
  return await client.patch(`team/offer/${offerId}`, { isAccepted: isAccepted });
};
