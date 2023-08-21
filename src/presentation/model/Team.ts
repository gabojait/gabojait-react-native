import UserProfileOfferDto from '@/data/model/User/UserProfileBriefDto';

export default interface TeamModel {
  backendCurrentCnt: number;
  backendTotalRecruitCnt: number;
  designerCurrentCnt: number;
  designerTotalRecruitCnt: number;
  frontendCurrentCnt: number;
  frontendTotalRecruitCnt: number;
  managerCurrentCnt: number;
  managerTotalRecruitCnt: number;
  projectName: string;
  teamId: string;
  backends: Array<UserProfileOfferDto>;
  designers: Array<UserProfileOfferDto>;
  frontends: Array<UserProfileOfferDto>;
  managers: Array<UserProfileOfferDto>;
}
