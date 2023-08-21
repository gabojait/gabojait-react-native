import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import TeammateList from '@/presentation/screens/Main/Home/TeamMate/TeammateList';
import { BoardStackParamListProps } from '@/presentation/navigation/types';
import ProfilePreview from '../screens/Main/Home/TeamMate/ProfilePreview';
import HomeHeader from '../screens/Headers/HomeHeader';

const TeamMate = ({ navigation, route }: BoardStackParamListProps<'TeamMate'>) => {
  const TeamateStack = createStackNavigator();

  return (
    <TeamateStack.Navigator initialRouteName="">
      <TeamateStack.Screen
        options={{
          header: HomeHeader,
          headerTitle: '팀원 찾기',
        }}
        name="TeammateList"
        component={TeammateList}
      />
      <TeamateStack.Screen
        name="ProfilePreview"
        options={{ headerShown: false }}
        component={ProfilePreview}
      />
    </TeamateStack.Navigator>
  );
};

export default TeamMate;
