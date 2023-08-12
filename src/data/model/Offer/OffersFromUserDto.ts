import TeamBriefDto from '../Team/TeamBriefDto';
import UserProfileOfferDto from '../User/UserProfileBriefDto';
import BriefOfferDto from './BriefOfferDto';

export default interface OffersFromOtherDto extends BriefOfferDto {
  team: TeamBriefDto;
  user: UserProfileOfferDto;
}
