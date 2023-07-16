import client from '@/lib/axiosInstance';
import { Position } from '../model/type/Position';
import { ProfileOrder } from '../model/type/ProfileOrder';
import UserProfileBriefDto from '../model/User/UserProfileBriefDto';
import Education from '../model/Profile/Education';
import Portfolio from '../model/Profile/Portfolio';
import Skill from '../model/Profile/Skill';
import Work from '../model/Profile/Work';

export type GetProfileProps = {
  pageFrom: number;
  pageSize: number;
  position: Position;
  profileOrder: ProfileOrder;
};

export const getProfile = async () => {
  const result = await client.get('user/profile');
  console.log(result);
  return result;
};

export const getUserSeekingTeam = async (props: GetProfileProps) => {
  let params = {
    'page-from': props.pageFrom,
    'page-size': props.pageSize,
    position: props.position,
    'profile-order': props.profileOrder,
  };
  const result = (await client.get('user/seeking-team', { params })) as UserProfileBriefDto[];
  return result;
};

export const setProfileVisibility = async (isPublic: boolean) => {
  const result = await client.patch('user/profile/visibility', { isPublic });
  console.log(result);
  return result;
};

export const updateProfileInfo = async (updateDto: {
  educations: Education[];
  portfolios: Portfolio[];
  position: Position;
  skills: Skill[];
  works: Work[];
}) => {
  const result = await client.post('user/profile', updateDto);
  console.log(result);
  return result;
};
