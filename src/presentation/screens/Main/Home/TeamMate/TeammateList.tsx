import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FrontendList from './FrontendList';
import BackendList from './BackendList';
import DesignerList from './Designer';
import PMList from './PMList';
import { useTheme } from '@rneui/themed';
import { Dimensions, View } from 'react-native';
import {
  BoardStackParamListProps,
  PositionTabParamList,
  TeammateStackParamListProps,
} from '@/presentation/navigation/types';

const Tab = createMaterialTopTabNavigator();

const TeammateList = ({ navigation, route }: TeammateStackParamListProps<'TeammateList'>) => {
  const { theme } = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Frontend"
      ß
      initialLayout={{ width: Dimensions.get('window').width }}
      screenOptions={{
        tabBarInactiveTintColor: theme.colors.black,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarIndicatorStyle: {
          backgroundColor: theme.colors.primary,
          width: 65,
          left: (Dimensions.get('window').width / 4 - 65) / 2,
        },
        tabBarLabelStyle: {
          fontSize: theme.fontSize.sm,
          fontWeight: theme.fontWeight.medium,
          textTransform: 'none',
        },
        tabBarPressColor: 'white',
        tabBarItemStyle: {},
        tabBarContentContainerStyle: {},
        tabBarIndicatorContainerStyle: {
          width: Dimensions.get('screen').width,
        },
      }}
    >
      <Tab.Screen name="Frontend" component={FrontendList} />
      <Tab.Screen name="Backend" component={BackendList} />
      <Tab.Screen name="Designer" component={DesignerList} />
      <Tab.Screen name="PM" component={PMList} />
    </Tab.Navigator>
  );
};

export default TeammateList;
