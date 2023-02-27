import Education from './Education'
import Portfolio from './Portfolio'
import Skill from './Skill'
import Work from './Work'

export default interface ProfileViewDto {
  completedTeamIds: string[]
  currentTeamId: string
  description: string
  educations: Education[]
  imageUrl: string
  isPublic: boolean
  nickname: string
  portfolios: Portfolio[]
  position: string
  rating: number
  schemaVersion: string
  skills: Skill[]
  userId: string
  works: Work[]
}
