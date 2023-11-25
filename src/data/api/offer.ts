import client from '@/lib/axiosInstance';
import { Position } from '@/data/model/type/Position';
import { PageModel, PageRequest } from '@/reactQuery/util/useModelList';
import BriefOfferDto from '@/data/model/Offer/BriefOfferDto';
import OffersFromOtherDto from '../model/Offer/OffersFromUserDto';

export type GetOfferFromOthersProps = {
  pageSize: number;
  pageFrom?: number;
  position: Position;
};

export const applyToTeam = async (position: string, teamId: string) => {
  const body = { offerPosition: position };
  const result = await client.post(`user/team/${teamId}/offer`, body);
  return result;
};

export const getOffersFromTeam = async (body: PageRequest) => {
  const result = await client.get('user/offer/received', {
    params: {
      'page-from': body.pageFrom,
      'page-size': body.pageSize,
    },
  });
  return result as PageModel<OffersFromOtherDto>;
};

export const getOffersFromUser = async (params: GetOfferFromOthersProps) => {
  const result = await client.get('team/offer/received', {
    params: {
      'page-from': params.pageFrom,
      'page-size': params.pageSize,
      position: params.position,
    },
  });
  return result as PageModel<OffersFromOtherDto>;
};

export const sendOfferToUser = async (userId: string, position: Position) => {
  return await client.post(`team/user/${userId}/offer`, { offerPosition: position });
};

export const cancelOfferToUser = async (offerId: number) => {
  return await client.delete(`team/offer/${offerId}`);
};

export const decideOfferFromTeam = async (offerId: number, isAccepted: boolean) => {
  return await client.patch(`user/offer/${offerId}`, { isAccepted: isAccepted });
};

export const getOffersSentToTeam = async (body: PageRequest) => {
  const result = await client.get('user/offer/sent', {
    params: {
      'page-from': body.pageFrom,
      'page-size': body.pageSize,
    },
  });
  return result as PageModel<OffersFromOtherDto>;
};

export const getOfferSentToUser = async (params: GetOfferFromOthersProps) => {
  const result = await client.get(`team/offer/sent`, {
    params: {
      'page-from': params.pageFrom,
      'page-size': params.pageSize,
      position: params.position,
    },
  });
  return result as any as PageModel<OffersFromOtherDto>;
};

export const rejectOfferFromUser = async (offerId: number) => {
  return await client.delete(`team/offer/${offerId}`);
};

export const acceptOfferFromUser = async (offerId: number, isAccepted: boolean) => {
  return await client.patch(`team/offer/${offerId}`, { isAccepted: isAccepted });
};
