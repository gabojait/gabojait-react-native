import ProfileViewResponse from '@/data/model/Profile/ProfileViewResponse';
import ProfileViewDto from '@/data/model/Profile/ProfileViewDto';
import { Position } from '@/data/model/type/Position';

export function isSkillExists(data: ProfileViewResponse | ProfileViewDto) {
  if (data.skills?.length ?? 0 > 0) {
    return true;
  }
  return false;
}

export function isProfileExist(profile?: ProfileViewDto | null) {
  return (
    profile &&
    ((profile.reviews?.length ?? 0) > 0 ||
      (profile.skills?.length ?? 0) > 0 ||
      (profile.portfolios?.length ?? 0) > 0 ||
      profile.profileDescription ||
      profile.position != Position.None ||
      profile.imageUrl != null ||
      (profile.works?.length ?? 0) > 0)
  );
}
