import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { MainStackParamList } from './types';
import PositionSelector from '../screens/Main/Home/Group/PositionSelector';
import GroupDetail from '../screens/Main/Home/Group/GroupDetail';
import ApplyStatus from '../screens/Main/MyPage/OfferFromUser/ApplyStatus';
import TeamHistory from '../screens/Main/MyPage/TeamHistory';
import TitleWithCloseHeader from '../screens/Headers/TitleWithCloseHeader';
import TeamReview from '../screens/Main/MyPage/TeamReview';
import BookMark from '../screens/Main/MyPage/BookMark';
import OfferFromTeamPage from '../screens/Main/MyPage/OfferFromTeam/OfferFromTeamPage';
import OfferToTeamHistory from '../screens/Main/MyPage/OfferToTeamHistory';
import Setting from '../screens/Main/MyPage/Setting/Setting';
import AlarmSetting from '../screens/Main/MyPage/Setting/AlarmSetting';
import UserModifier from '../screens/Main/MyPage/Setting/UserModifier';
import Etc from '../screens/Main/MyPage/Setting/Etc';
import ProfileNavigation from './ProfileNavigation';
import { TeamComplete } from '../screens/Main/Team/TeamComplete';
import { CompleteSuccess } from '../screens/Main/Team/CompleteSuccess';
import OpenSourceLicense from '../screens/Main/MyPage/Setting/OpenSourceLicense';
import GroupCreator from '../screens/Main/Home/Group/GroupCreator';
import Header from '../screens/Headers/CloseHeader';
import { OpenChatingPage } from '../screens/Main/Team/OpenChatingPage';
import { TeamEditor } from '../screens/Main/Team/TeamEditor';
import { ManageTeammate } from '../screens/Main/Team/ManageTeammate';
import ProfilePreview from '../screens/Main/Home/TeamMate/ProfilePreview';
import TeamDetail from '../screens/Main/MyPage/OfferFromTeam/TeamDetail';
import JoinTeam from '../screens/Main/MyPage/OfferFromTeam/JoinTeam';
import OfferSentUser from '../screens/Main/MyPage/OfferSentToUser/OfferSentUser';
import AlertPage from '../screens/Main/AlertPage';
const Main = createStackNavigator<MainStackParamList>();

const MainNavigation = () => {
  return (
    <Main.Navigator initialRouteName="GroupDetail" id="Main">
      <Main.Group>
        <Main.Screen
          name="Profile"
          options={{ headerShown: false }}
          component={ProfileNavigation}
        />
        <Main.Screen
          name="OfferSentUser"
          component={OfferSentUser}
          options={{
            header: TitleWithCloseHeader,
            headerTitle: '보낸제안',
          }}
        />
        <Main.Screen
          name="ApplyStatus"
          component={ApplyStatus}
          options={{
            header: TitleWithCloseHeader,
            headerTitle: '지원현황',
          }}
        />
        <Main.Screen
          name="ProfilePreview"
          options={{ headerShown: false }}
          component={ProfilePreview}
        />
        <Main.Screen
          name="TeamHistory"
          component={TeamHistory}
          options={{
            header: TitleWithCloseHeader,
            headerTitle: '팀 히스토리',
          }}
        />
        <Main.Screen
          name="TeamReview"
          component={TeamReview}
          options={{
            headerShown: false,
          }}
        />
        <Main.Screen
          name="BookMark"
          component={BookMark}
          options={{
            header: TitleWithCloseHeader,
            headerTitle: '찜목록',
          }}
        />
        <Main.Screen
          name="OfferFromTeamPage"
          component={OfferFromTeamPage}
          options={{
            header: TitleWithCloseHeader,
            headerTitle: '제안서',
          }}
        />
        <Main.Screen
          name="TeamDetail"
          component={TeamDetail}
          options={{
            header: TitleWithCloseHeader,
            headerTitle: '',
          }}
        />
        <Main.Screen
          name="JoinTeam"
          component={JoinTeam}
          options={{
            header: TitleWithCloseHeader,
            headerTitle: '팀에 합류하기',
          }}
        />
        <Main.Screen
          name="OfferToTeamHistory"
          component={OfferToTeamHistory}
          options={{
            header: TitleWithCloseHeader,
            headerTitle: '지원한 팀',
          }}
        />
      </Main.Group>
      <Main.Group>
        <Main.Screen
          name="GroupDetail"
          component={GroupDetail}
          options={{
            headerShown: false,
          }}
        />
        <Main.Screen
          name="PositionSelector"
          component={PositionSelector}
          options={{
            header: TitleWithCloseHeader,
            headerTitle: '포지션 선택',
          }}
        />
        <Main.Screen
          name="GroupCreator"
          component={GroupCreator}
          options={{
            header: TitleWithCloseHeader,
            headerTitle: '',
          }}
        />
        <Main.Screen
          name="AlertPage"
          component={AlertPage}
          options={{
            header: TitleWithCloseHeader,
            headerTitle: '알람',
          }}
        />
      </Main.Group>
      <Main.Group>
        <Main.Screen
          name="Setting"
          component={Setting}
          options={{
            header: TitleWithCloseHeader,
            headerTitle: '설정',
          }}
        />
        <Main.Screen
          name="AlarmSetting"
          component={AlarmSetting}
          options={{
            header: TitleWithCloseHeader,
            headerTitle: '알림 설정',
          }}
        />
        <Main.Screen
          name="UserModifier"
          component={UserModifier}
          options={{
            header: TitleWithCloseHeader,
            headerTitle: '회원 정보 수정',
          }}
        />
        <Main.Screen
          name="Etc"
          component={Etc}
          options={{
            header: TitleWithCloseHeader,
            headerTitle: '기타',
          }}
        />
        <Main.Screen
          name="OpenSourcePage"
          component={OpenSourceLicense}
          options={{
            header: TitleWithCloseHeader,
            headerTitle: '오픈소스',
          }}
        />
      </Main.Group>
      <Main.Group>
        <Main.Screen
          name="TeamEditor"
          options={{
            headerShown: false,
          }}
          component={TeamEditor}
        />
        <Main.Screen
          name="OpenChatingPage"
          component={OpenChatingPage}
          options={{
            header: Header,
          }}
        />
        <Main.Screen
          name="TeamComplete"
          options={{
            header: TitleWithCloseHeader,
            headerTitle: '팀관리',
          }}
          component={TeamComplete}
        />
        <Main.Screen
          name="CompleteSuccess"
          options={{
            header: TitleWithCloseHeader,
            headerTitle: '팀관리',
          }}
          component={CompleteSuccess}
        />
        <Main.Screen
          name="ManageTeammate"
          options={{
            header: TitleWithCloseHeader,
            headerTitle: '팀원 관리',
          }}
          component={ManageTeammate}
        />
      </Main.Group>
    </Main.Navigator>
  );
};

export default MainNavigation;
