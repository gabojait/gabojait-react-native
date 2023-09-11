import { BoardStackParamList } from '@/presentation/navigation/types';
import { CompositeNavigationProp, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import HomeHeader from '../screens/Headers/HomeHeader';
import GroupList from '../screens/Main/Home/Group/GroupList';
import { RootStackNavigationProps } from './RootNavigation';
type BoardNavigationProp<T extends keyof BoardStackParamList = 'GroupList'> = StackNavigationProp<
  BoardStackParamList,
  T
>;

export type BoardStackNavigationProps<T extends keyof BoardStackParamList = 'GroupList'> =
  CompositeNavigationProp<BoardNavigationProp<T>, RootStackNavigationProps<'MainNavigation'>>;

const BoardStack = createStackNavigator<BoardStackParamList>();
const Board = () => {
  return (
    <BoardStack.Navigator initialRouteName={'GroupList'}>
      <BoardStack.Screen
        name="GroupList"
        component={GroupList}
        options={{
          header: HomeHeader,
          headerTitle: '팀 찾기',
        }}
      />
      <BoardStack.Screen
        name="TeamMate"
        component={TeamMate}
        options={{
          headerShown: false,
        }}
      />
<<<<<<< HEAD
=======
      <BoardStack.Screen
        options={{
          header: HomeHeader,
          headerTitle: '팀원 찾기',
        }}
        name="TeamMate"
        component={TeammateList}
      />
>>>>>>> d5f5e64cce46ad1d9dd2ec714a6fae0d7e229332
    </BoardStack.Navigator>
  );
};

export default Board;
