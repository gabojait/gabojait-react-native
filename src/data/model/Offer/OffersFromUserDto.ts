import TeamBriefDto from '../Team/TeamBriefDto';
import UserProfileBriefDto from '../User/UserProfileBriefDto';
import BriefOfferDto from './BriefOfferDto';

export default interface OffersFromUserDto extends BriefOfferDto {
  team: TeamBriefDto;
  user: UserProfileBriefDto;
}
