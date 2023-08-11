import { Position } from '../type/Position';
import { TeamMemberStatus } from '../type/TeamMemberStatus';

export default interface BriefOfferDto {
  createdAt: string;
  isAccepted: boolean;
  offerId: number;
  offeredBy: TeamMemberStatus;
  position: Position;
  updatedAt: string;
}
