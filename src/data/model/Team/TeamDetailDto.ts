import BriefOfferDto from '../Offer/BriefOfferDto';
import TeamDto from './TeamDto';

export default interface TeamDetailDto extends TeamDto {
  offers: BriefOfferDto[];
  isFavorite: boolean;
}
