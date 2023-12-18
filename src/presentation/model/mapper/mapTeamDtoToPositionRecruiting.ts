import TeamDto from '@/data/model/Team/TeamDto';
import PositionRecruiting from '@/presentation/model/PositionRecruitng';
import { Position } from '@/data/model/type/Position';
import TeamBriefDto from '@/data/model/Team/TeamBriefDto';
import TeamDetailDto from '@/data/model/Team/TeamDetailDto';

export function mapTeamDtoToPositionRecruiting(
  teamData: TeamDto | undefined | TeamBriefDto | TeamDetailDto,
): PositionRecruiting[] {
  const result: PositionRecruiting[] = [];
  if (!teamData) {
    return result;
  }

  if (teamData.backendMaxCnt != 0) {
    result.push({
      currentCnt: teamData.backendCurrentCnt,
      position: Position.Backend,
      recruitCnt: teamData.backendMaxCnt,
    });
  }
  if (teamData.frontendMaxCnt != 0) {
    result.push({
      currentCnt: teamData.frontendCurrentCnt,
      position: Position.Frontend,
      recruitCnt: teamData.frontendMaxCnt,
    });
  }
  if (teamData.designerMaxCnt != 0) {
    result.push({
      currentCnt: teamData.designerCurrentCnt,
      position: Position.Designer,
      recruitCnt: teamData.designerMaxCnt,
    });
  }
  if (teamData.managerMaxCnt != 0) {
    result.push({
      currentCnt: teamData.managerCurrentCnt,
      position: Position.Manager,
      recruitCnt: teamData.managerMaxCnt,
    });
  }
  return result;
}
