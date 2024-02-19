import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MainBottomTabNavigation from '@/presentation/navigation/MainBottomTabNavigation';
import OnboardingNavigation from '@/presentation/navigation/OnboardingNavigation';
import { RootStackParamList } from './types';
import WebViewPage from '../components/WebView';
import SplashScreen from '../screens/Onboarding/SplashScreen';
import MainNavigation from './MainNavigation';
import AxiosWrapper from '../utils/AxiosWrapper';
import { linking } from '@/presentation/schemeLink/linkInitializer';

export type RootStackNavigationProps<T extends keyof RootStackParamList = 'default'> =
  StackNavigationProp<RootStackParamList, T>;

const RootStack = createStackNavigator<RootStackParamList>();

export const RootNavigation = () => {
  return (
    <NavigationContainer linking={linking}>
      <AxiosWrapper>
        <RootStack.Navigator initialRouteName={'SplashScreen'}>
          <RootStack.Screen
            name="WebView"
            component={WebViewPage}
            options={{ headerBackTitleVisible: false }}
          />
          <RootStack.Group screenOptions={{ headerShown: false }}>
            <RootStack.Screen
              name="OnboardingNavigation"
              component={OnboardingNavigation}
              options={{ gestureEnabled: false }}
            />
            <RootStack.Screen name="SplashScreen" component={SplashScreen} />
            <RootStack.Screen name="MainNavigation" component={MainNavigation} />
            <RootStack.Screen
              name="MainBottomTabNavigation"
              component={MainBottomTabNavigation}
              options={{ gestureEnabled: false, headerMode: 'screen' }}
            />
          </RootStack.Group>
        </RootStack.Navigator>
      </AxiosWrapper>
    </NavigationContainer>
  );
};
