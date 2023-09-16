import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Board from '@/presentation/navigation/BoardNavigation';
import MyPage from '@/presentation/screens/Main/MyPage/Main';
import { MainBottomTabParamList } from './types';
import CustomIcon from '@/presentation/components/icon/Gabojait';
import { useTheme } from '@rneui/themed';
import { TeamPage } from '../screens/Main/Team/TeamPage';
import useGlobalStyles from '../styles';

const MainBottomTab = createBottomTabNavigator<MainBottomTabParamList>();

// 바텀네비게이션
const MainBottomTabNavigation = () => {
  const { theme } = useTheme();
  const globalStyles = useGlobalStyles();

  return (
    <MainBottomTab.Navigator
      backBehavior="none"
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.black,
        tabBarLabelStyle: globalStyles.tabBarLabel,
        tabBarStyle: globalStyles.tabBar,
      }}
    >
      <MainBottomTab.Group screenOptions={{ headerShown: false }}>
        <MainBottomTab.Screen
          name="Home"
          component={Board}
          options={{
            tabBarIcon: ({ size, color }) => <CustomIcon name="home" size={size} color={color} />,
          }}
        />
        <MainBottomTab.Screen
          name="Team"
          component={TeamPage}
          options={{
            tabBarIcon: ({ size, color }) => <CustomIcon name="people" size={size} color={color} />,
          }}
        />
        <MainBottomTab.Screen
          name="MyPage"
          component={MyPage}
          options={{
            tabBarIcon: ({ size, color }) => <CustomIcon name="person" size={size} color={color} />,
          }}
        />
      </MainBottomTab.Group>
    </MainBottomTab.Navigator>
  );
};

export default MainBottomTabNavigation;
