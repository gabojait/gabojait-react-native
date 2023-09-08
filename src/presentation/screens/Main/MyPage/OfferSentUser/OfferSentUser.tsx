import { MainStackScreenProps, PositionTabParamList } from '@/presentation/navigation/types';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme } from '@rneui/themed';
import { Dimensions } from 'react-native';
import React from 'react';
import OfferList from '@/presentation/screens/Main/MyPage/OfferSentUser/OfferList';
import { Position } from '@/data/model/type/Position';

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
        <Tab.Screen
          name="Frontend"
          component={OfferList}
          initialParams={{ position: Position.Frontend }}
        />
        <Tab.Screen
          name="Backend"
          component={OfferList}
          initialParams={{ position: Position.Backend }}
        />
        <Tab.Screen
          name="Designer"
          component={OfferList}
          initialParams={{ position: Position.Designer }}
        />
        <Tab.Screen
          name="PM"
          component={OfferList}
          initialParams={{ position: Position.Manager }}
        />
      </Tab.Navigator>
    </>
  );
};

export default OfferSentUser;
