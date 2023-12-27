import { createStackNavigator } from '@react-navigation/stack';
import EditMain, { EditMainHeader } from '../screens/Main/MyPage/Profile/EditMain';
import { ProfileStackParamList } from './types';
import React from 'react';
import ProfileView from '@/presentation/screens/Main/MyPage/Profile';
import CloseHeader from '../screens/Headers/CloseHeader';
import TitleWithCloseHeader from '../screens/Headers/TitleWithCloseHeader';
import EditPortfolio from '../screens/Main/MyPage/Profile/EditPortfolio';
import EditEducationAndWork from '../screens/Main/MyPage/Profile/EditEducationAndWork';
import EditSkill from '../screens/Main/MyPage/Profile/EditSkill';
import { EditPosition } from '../screens/Main/MyPage/Profile/EditPosition';

const Profile = createStackNavigator<ProfileStackParamList>();

const ProfileNavigation = () => {
  return (
    <Profile.Navigator initialRouteName="View">
      <Profile.Group>
        <Profile.Screen name="View" options={{ header: CloseHeader }} component={ProfileView} />
        <Profile.Screen
          name="EditMain"
          options={{ header: EditMainHeader, headerTitle: '프로필' }}
          component={EditMain}
        />
        <Profile.Screen
          name="EditPortfolio"
          options={{ header: TitleWithCloseHeader, headerTitle: '포트폴리오' }}
          component={EditPortfolio}
        />
        <Profile.Screen
          name="EditSchoolAndWork"
          options={{ header: TitleWithCloseHeader, headerTitle: '학력/경력' }}
          component={EditEducationAndWork}
        />
        <Profile.Screen
          name="EditSkill"
          options={{ header: TitleWithCloseHeader, headerTitle: '기술스택' }}
          component={EditSkill}
        />
        <Profile.Screen
          name="EditPosition"
          options={{ header: TitleWithCloseHeader, headerTitle: '희망 포지션' }}
          component={EditPosition}
        />
      </Profile.Group>
    </Profile.Navigator>
  );
};

export default ProfileNavigation;
