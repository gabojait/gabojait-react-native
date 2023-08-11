import { MainStackScreenProps, PositionTabParamList } from '@/presentation/navigation/types';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TabActions } from '@react-navigation/native';
import { useTheme } from '@rneui/themed';
import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import BackendList from './BackendList';
import DesignerList from './DesignerList';
import FrontendList from './FrontendList';
import PMList from './PMList';
import { theme } from '@/presentation/theme';

const ApplyStatus = ({ navigation, route }: MainStackScreenProps<'ApplyStatus'>) => {
  const Tab = createMaterialTopTabNavigator<PositionTabParamList>();
  const { theme } = useTheme();

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
        가보자잇
      </Text>
      <Tab.Navigator
        initialRouteName="Frontend"
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
    </>
  );
};

export default ApplyStatus;
