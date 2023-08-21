/**
 * 프로필에 관련된 비즈니스 로직을
 */
import ProfileViewDto from '@/data/model/Profile/ProfileViewDto';
import { Position } from '@/data/model/type/Position';

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
