import UserProfileBriefDto from "../User/UserProfileBriefDto"

export default interface TeamBriefDto {
    backends: Array<UserProfileBriefDto>
    designers: Array<UserProfileBriefDto>
    frontends: Array<UserProfileBriefDto>
    projectManagers: Array<UserProfileBriefDto>
    projectName: string
    teamId: string
}