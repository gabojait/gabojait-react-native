import BriefProfileDto from '../Profile/BriefProfileDto'

export default interface TeamDetailDto {
  backendTotalRecruitCnt?: number
  backends: Array<BriefProfileDto>
  createdAt: string
  designerTotalRecruitCnt?: number
  designers: Array<BriefProfileDto>
  expectation?: string
  frontendTotalRecruitCnt?: number
  frontends: Array<BriefProfileDto>
  isFavorite: boolean
  leader: BriefProfileDto
  managerTotalRecruitCnt?: number
  managers: Array<BriefProfileDto>
  openChatUrl?: string
  projectDescription?: string
  projectName: string
  teamId: string
  updatedAt: string
}
