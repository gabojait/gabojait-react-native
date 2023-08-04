import { useTheme } from '@rneui/themed';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import TeammateList from '@/presentation/screens/Main/Home/TeamMate/TeammateList';
import { BoardStackParamListProps } from '@/presentation/navigation/types';
import ProfilePreview from '../screens/Main/Home/TeamMate/ProfilePreview';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const TeamMate = ({ navigation, route }: BoardStackParamListProps<'TeamMate'>) => {
  const TeamateStack = createStackNavigator();

  return (
    <TeamateStack.Navigator initialRouteName="">
      <TeamateStack.Screen name="TeammateList" component={TeammateList} />
      <TeamateStack.Screen name="ProfilePreview" component={ProfilePreview} />
    </TeamateStack.Navigator>
  );
};

export default TeamMate;
