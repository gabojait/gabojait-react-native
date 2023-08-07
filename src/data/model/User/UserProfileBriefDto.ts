import BriefOfferDto from '../Offer/BriefOfferDto';
import { Position } from '../type/Position';

export default interface UserProfileBriefDto {
  createdAt: string;
  nickname: string;
  offers: BriefOfferDto[];
  position: Position;
  rating: number;
  reviewCnt: number;
  updatedAt: string;
  userId: string;
}
