import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer, useNavigation} from '@react-navigation/native'
import MainNavigation from '@/presentation/navigation/MainNavigation'

export const RootNavigation = () => {
    const RootStack = createStackNavigator()
    return (
    <NavigationContainer>
        <RootStack.Navigator initialRouteName="MainNavigation">
        <RootStack.Group screenOptions={{headerShown: false}}>
            <RootStack.Screen name="Onboarding"component={MainNavigation} />
            <RootStack.Screen name="Main" component={MainNavigation} />
        </RootStack.Group>
        </RootStack.Navigator>
    </NavigationContainer>
    )
}