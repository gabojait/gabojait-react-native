import UserProfileBriefDto from "../User/UserProfileBriefDto"

export default interface Team {
    backendTotalRecruitCnt?: number
    backends: Array<UserProfileBriefDto>
    designerTotalRecruitCnt?: number
    designers: Array<UserProfileBriefDto>
    expectation?: string
    frontendTotalRecruitCnt?: number
    frontends: Array<UserProfileBriefDto>
    leaderUserId?: string
    openChatUrl?: string
    projectDescription?: string
    projectManagerTotalRecruitCnt?: number
    projectManagers: Array<UserProfileBriefDto>
    projectName: string
    teamId: string
}