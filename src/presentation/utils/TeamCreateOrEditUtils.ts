import TeamRequestDto from '@/data/model/Team/TeamRequestDto';
import { t } from 'i18next';
import { Position } from '@/data/model/type/Position';

export function isRecruitCntValidate(teamData: TeamRequestDto) {
  const totalTeamMemberCnt =
    teamData.managerMaxCnt +
    teamData.designerMaxCnt +
    teamData.backendMaxCnt +
    teamData.frontendMaxCnt;
  if (totalTeamMemberCnt == 0) {
    throw Error('팀원이 존재하지 않습니다');
  } else {
    return true;
  }
}

export function isEmptyInputExisted(teamData: TeamRequestDto) {
  //공백제거하기
  const projectName = teamData.projectName.replace(/ /gi, '');
  const projectDescription = teamData.projectDescription.replace(/ /gi, '');
  const expectation = teamData.expectation.replace(/ /gi, '');
  const openChatUrl = teamData.openChatUrl.replace(/ /gi, '');

  if (
    projectName.length != 0 &&
    projectDescription.length != 0 &&
    expectation.length != 0 &&
    openChatUrl.length != 0
  ) {
    return true;
  } else {
    throw Error(t('warn_input_empty'));
  }
}

export function isOpenChatUrlValidate(teamData: TeamRequestDto) {
  const pattern = /^https\:\/\/open\.kakao\.com\/.+$/;
  const result = pattern.test(teamData.openChatUrl);

  if (result) {
    return true;
  } else {
    throw Error(t('warn_openchatlink_invalid_format'));
  }
}

export function isLeaderPositionExist(teamData: TeamRequestDto) {
  if (teamData.leaderPosition == Position.None) {
    return false;
  }
  return true;
}
