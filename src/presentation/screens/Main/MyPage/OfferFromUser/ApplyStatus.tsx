import { MainStackScreenProps, PositionTabParamList } from '@/presentation/navigation/types';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Text, useTheme } from '@rneui/themed';
import React from 'react';
import { Dimensions } from 'react-native';
import { getMyTeam } from '@/data/api/team';
import TeamDetailDto from '@/data/model/Team/TeamDetailDto';
import { teamKeys } from '@/reactQuery/key/TeamKeys';
import { useQuery, UseQueryResult } from 'react-query';
import { Position } from '@/data/model/type/Position';
import ApplyList from '@/presentation/screens/Main/MyPage/OfferFromUser/ApplyList';
import { t } from 'i18next';

const ApplyStatus = ({ navigation, route }: MainStackScreenProps<'ApplyStatus'>) => {
  const Tab = createMaterialTopTabNavigator<PositionTabParamList>();
  const { theme } = useTheme();
  const { data, isLoading, error }: UseQueryResult<TeamDetailDto> = useQuery(
    [teamKeys.myTeam],
    () => getMyTeam(),
    {
      useErrorBoundary: true,
    },
  );
  return (
    <>
      <Text
        style={{
          fontSize: 30,
          fontWeight: theme.fontWeight?.bold,
          color: 'black',
          backgroundColor: 'white',
          paddingTop: 28,
          paddingLeft: 20,
        }}
      >
        {data?.projectName}
      </Text>
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
          component={ApplyList}
          initialParams={{ position: Position.Frontend }}
        />
        <Tab.Screen
          name={t('position_backend')}
          component={ApplyList}
          initialParams={{ position: Position.Backend }}
        />
        <Tab.Screen
          name={t('position_designer')}
          component={ApplyList}
          initialParams={{ position: Position.Designer }}
        />
        <Tab.Screen
          name={t('position_manager')}
          component={ApplyList}
          initialParams={{ position: Position.Manager }}
        />
      </Tab.Navigator>
    </>
  );
};

export default ApplyStatus;
