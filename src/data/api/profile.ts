import client, { axiosConfig, reqInterceptor } from '@/lib/axiosInstance';
import { Position } from '../model/type/Position';
import { ProfileOrder } from '../model/type/ProfileOrder';
import UserProfileOfferDto from '../model/User/UserProfileBriefDto';
import Education from '../model/Profile/Education';
import Portfolio, { PortfolioType } from '../model/Profile/Portfolio';
import Skill from '../model/Profile/Skill';
import Work from '../model/Profile/Work';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PageModel } from '@/reactQuery/util/useModelList';

export type GetProfileProps = {
  pageSize: number;
  pageFrom?: number;
  position: Position;
  profileOrder: ProfileOrder;
};

export const getMyProfile = async () => {
  const result = await client.get('user/profile');
  console.log(result);
  return result;
};

export const getProfile = async (userId: string) => {
  const result = await client.get(`user/${userId}/profile`);
  return result;
};

export const getUserSeekingTeam = async (props: GetProfileProps) => {
  let params = {
    'page-from': props.pageFrom,
    'page-size': props.pageSize,
    position: props.position,
    'profile-order': props.profileOrder,
  };
  return ((await client.get('user/seeking-team', { params })) as any ) as PageModel<UserProfileOfferDto>;
};

export const setUserSeekingTeam = async (isSeekingTeam: boolean) => {
  const result = await client.patch('user/seeking-team', { isSeekingTeam });
  console.log(result);
  return result;
};

export const setProfileImage = async (formData: FormData) => {
  return client.postForm('user/image', formData);
};

export const updateProfileInfo = async (updateDto: {
  educations: Education[];
  portfolios: Portfolio[];
  position: Position;
  skills: Skill[];
  works: Work[];
}) => {
  // Todo: 업로드
  const axiosInstanceWithOutInterceptor = axios.create(axiosConfig);
  axiosInstanceWithOutInterceptor.interceptors.request.use(reqInterceptor);
  const filePromises = updateDto.portfolios.map(async portfolio => {
    if (portfolio.media != PortfolioType.File || portfolio.portfolioId) {
      return portfolio;
    }
    const urlParts = decodeURI(portfolio.portfolioUrl).split('/');
    const fileName = urlParts[urlParts.length - 1];
    const formData = new FormData();
    formData.append('file', {
      name: fileName,
      uri: portfolio.portfolioUrl,
    });
    console.log(portfolio, fileName, formData);
    const fileResult = await axiosInstanceWithOutInterceptor.postForm(
      'user/portfolio/file',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return { ...portfolio, portfolioUrl: fileResult.data.responseData.portfolioUrl };
  });
  // Todo: 파일 업로드 실패에 따른 콜백 필요!

  const portfoliosWithRealUrl = await Promise.all(filePromises);
  const result = await client.post('user/profile', {
    ...updateDto,
    portfolios: portfoliosWithRealUrl,
  });
  console.log(result);
  return result;
};
