import { MainStackScreenProps, PositionTabParamList } from '@/presentation/navigation/types';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme } from '@rneui/themed';
import { Dimensions } from 'react-native';
import FrontendList from './FrontendList';
import BackendList from './BackendList';
import DesignerList from './DesignerList';
import PMList from './PMList';
import React from 'react';
const OfferSentUser = ({ navigation, route }: MainStackScreenProps<'OfferSentUser'>) => {
  const Tab = createMaterialTopTabNavigator<PositionTabParamList>();
  const { theme } = useTheme();

  return (
    <>
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

export default OfferSentUser;
