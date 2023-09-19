import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme } from '@rneui/themed';
import { Dimensions } from 'react-native';
import MateList from '@/presentation/screens/Main/Home/TeamMate/MateList';
import { Position } from '@/data/model/type/Position';
import { BoardStackParamListProps, PositionTabParamList } from '@/presentation/navigation/types';
import { t } from 'i18next';

const TeammateList = ({ navigation, route }: BoardStackParamListProps<'TeamMate'>) => {
  const { theme } = useTheme();
  const Tab = createMaterialTopTabNavigator<PositionTabParamList>();
  return (
    <Tab.Navigator
      initialRouteName={t('position_frontend')}
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
      <Tab.Screen
        name={t('position_frontend')}
        component={MateList}
        initialParams={{ position: Position.Frontend }}
      />
      <Tab.Screen
        name={t('position_backend')}
        component={MateList}
        initialParams={{ position: Position.Backend }}
      />
      <Tab.Screen
        name={t('position_designer')}
        component={MateList}
        initialParams={{ position: Position.Designer }}
      />
      <Tab.Screen
        name={t('position_manager')}
        component={MateList}
        initialParams={{ position: Position.Manager }}
      />
    </Tab.Navigator>
  );
};

export default TeammateList;
