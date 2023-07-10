import BriefOfferDto from '../Offer/BriefOfferDto'
import TeamBriefDto from '../Team/TeamBriefDto'
import {Position} from '../type/Position'
import Education from './Education'
import Portfolio from './Portfolio'
import Review from './Review'
import Skill from './Skill'
import Work from './Work'

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
  portfolios: Portfolio[]
  position: Position
  profileDescription: string
  rating: number
  reviewCnt: number
  reviews: Review[]
  skills: Skill[]
  userId: number
  works: Work[]
}

export type Identifier = number
