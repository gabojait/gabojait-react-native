import TeamBriefDto from '../Team/TeamBriefDto';
import BriefOfferDto from './BriefOfferDto';
import UserProfileDto from '@/data/model/User/UserProfileDto';

export default interface OffersFromOtherDto extends BriefOfferDto {
  team: TeamBriefDto;
  user: UserProfileDto;
}
