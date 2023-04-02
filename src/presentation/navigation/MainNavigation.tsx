import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {MainStackParamList} from './types'
import PositionSelector from '../screens/Main/Home/Group/PositionSelector'
import GroupEditor from '../screens/Main/Home/Group/GroupEditor'
import GroupDetail from '../screens/Main/Home/Group/GroupDetail'
import ApplyStatus from '../screens/Main/MyPage/ApplyStatus/ApplyStatus'
import TeamHistory from '../screens/Main/MyPage/TeamHistory'
import TitleWithCloseHeader from '../screens/Headers/TitleWithCloseHeader'
import TeamReview from '../screens/Main/MyPage/TeamReview'
import BookMark from '../screens/Main/MyPage/BookMark'
import OfferPage from '../screens/Main/MyPage/OfferPage'
import TeamsApplied from '../screens/Main/MyPage/TeamsApplied'
import Setting from '../screens/Main/MyPage/Setting/Setting'
import AlarmSetting from '../screens/Main/MyPage/Setting/AlarmSetting'
import UserModifier from '../screens/Main/MyPage/Setting/UserModifier'
import Etc from '../screens/Main/MyPage/Setting/Etc'
import ProfileNavigation from './ProfileNavigation'
import BookMarkHeader from '../screens/Headers/BookmarkHeader'

const Main = createStackNavigator<MainStackParamList>()

const MainNavigation = () => {
  return (
    <Main.Navigator initialRouteName="GroupDetail">
      <Main.Group>
        <Main.Screen name="Profile" options={{headerShown: false}} component={ProfileNavigation} />
        <Main.Screen
          name="ApplyStatus"
          component={ApplyStatus}
          options={{
            header: TitleWithCloseHeader,
            headerTitle: '지원현황',
          }}
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
          name="OfferPage"
          component={OfferPage}
          options={{
            header: TitleWithCloseHeader,
            headerTitle: '제안서',
          }}
        />
        <Main.Screen
          name="TeamApplied"
          component={TeamsApplied}
          options={{
            header: TitleWithCloseHeader,
            headerTitle: '지원서',
          }}
        />
      </Main.Group>
      <Main.Group>
        <Main.Screen name="GroupDetail" component={GroupDetail} options={{
          header: BookMarkHeader,
          headerTitle: ""
        }}/>
        <Main.Screen name="PositionSelector" component={PositionSelector} options={{
          header: TitleWithCloseHeader,
          headerTitle: "포지션 선택"
        }}/>
        <Main.Screen name="GroupEditor" component={GroupEditor} options={{
          headerShown:false
        }}/>
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
            headerTitle: '알람 설정',
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
      </Main.Group>
    </Main.Navigator>
  )
}

export default MainNavigation
