import BriefOfferDto from '../Offer/BriefOfferDto';
import { Position } from '../type/Position';
import UserProfileDto from './UserProfileDto';

export default interface UserProfileOfferDto extends UserProfileDto {
  offers: BriefOfferDto[];
}
