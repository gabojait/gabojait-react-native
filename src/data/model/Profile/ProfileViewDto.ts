import BriefOfferDto from '../Offer/BriefOfferDto'
import TeamBriefDto from '../Team/TeamBriefDto'
import {Position} from '../type/Position'
import Education from './Education'
import PortfolioResponse from './PortfolioResponse'
import ReviewResponse from './ReviewResponse'
import SkillResponse from './SkillResponse'
import WorkResponse from './WorkResponse'

export default interface ProfileViewDto {
  createdAt: string
  completedTeams: TeamBriefDto[]
  currentTeam: TeamBriefDto
  educations: Education[]
  imageUrl: string
  isFavorite: boolean
  isLeader: boolean
  isSeekingTeam: boolean
  nickname: string
  offers: BriefOfferDto[]
  portfolios: PortfolioResponse[]
  position: Position
  profileDescription: string
  rating: number
  reviewCnt: number
  reviews: ReviewResponse[]
  skills: SkillResponse[]
  userId: number
  works: WorkResponse[]
}

export type Identifier = number
