import {createStackNavigator} from '@react-navigation/stack'
import EditMain, {EditMainHeader} from '../screens/Main/MyPage/Profile/EditMain'
import {ProfileStackParamList} from './types'
import React from 'react'
import ProfileView from '@/presentation/screens/Main/MyPage/Profile'
import CloseHeader from '../screens/Headers/CloseHeader'
import TitleWithCloseHeader from '../screens/Headers/TitleWithCloseHeader'
import EditPortfolio from '../screens/Main/MyPage/Profile/EditPortfolio'

const Profile = createStackNavigator<ProfileStackParamList>()

const ProfileNavigation = () => {
  return (
    <Profile.Navigator initialRouteName="View">
      <Profile.Group>
        <Profile.Screen name="View" options={{header: CloseHeader}} component={ProfileView} />
        <Profile.Screen
          name="EditMain"
          options={{header: EditMainHeader, headerTitle: '프로필'}}
          component={EditMain}
        />
        <Profile.Screen
          name="EditPortfolio"
          options={{header: TitleWithCloseHeader, headerTitle: '포트폴리오'}}
          component={EditPortfolio}
        />
      </Profile.Group>
    </Profile.Navigator>
  )
}

export default ProfileNavigation
