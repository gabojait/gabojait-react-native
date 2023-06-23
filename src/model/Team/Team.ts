import UserProfileBriefDto from '../User/UserProfileBriefDto'

export default interface Team {
  teamId: string
  projectName: string
  designerTotalRecruitCnt?: number
  backendTotalRecruitCnt?: number
  frontendTotalRecruitCnt?: number
  managerTotalRecruitCnt?: number
  projectDescription?: string
  openChatUrl?: string
  expectation?: string
  leaderUserId?: string
  backends: Array<UserProfileBriefDto>
  designers: Array<UserProfileBriefDto>
  frontends: Array<UserProfileBriefDto>
  managers: Array<UserProfileBriefDto>
}
