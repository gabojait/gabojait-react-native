import { getHeaderTitle } from '@react-navigation/elements';
import { StackHeaderProps, StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import CustomIcon from '@/presentation/components/icon/Gabojait';
import { OutlinedButton } from '../../components/Button';
import CustomHeader from '../../components/CustomHeader';
import color from '@/presentation/res/styles/color';
import { store } from '@/redux/store';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { BoardSwitchActionType } from '@/redux/action_types/boardSwitchTypes';
import { Provider, useDispatch } from 'react-redux';
import boardSwitchReducer from '@/redux/reducers/boardSwitchReducer';
import {
  BoardStackParamList,
  RootStackParamList,
  RootStackScreenProps,
} from '@/presentation/navigation/types';
import { useNavigation } from '@react-navigation/native';

const HomeHeader: React.FC<StackHeaderProps> = ({ navigation, route, options, back }) => {
  const title = getHeaderTitle(options, route.name);
  const dispatch = useAppDispatch();
  const { switchTitle } = useAppSelector(state => state.boardSwitchReducer);
  // TODO: 뭔가 반응이 느려서 답답함.
  // Todo: 네비게이션 상태 관리를 Redux가 아닌 Navigator로 이전할 필요가.. 흑흑
  async function switchBoard() {
    if (switchTitle === BoardSwitchActionType.FIND_TEAMMATE_SWITCH) {
      dispatch({ type: BoardSwitchActionType.FIND_TEAMMATE_SWITCH });
      navigation.replace('TeamMate');
    } else {
      dispatch({ type: BoardSwitchActionType.FIND_GROUP_SWITCH });
      navigation.replace('GroupList');
    }
  }

  return (
    <CustomHeader
      title={title}
      canGoBack={false}
      rightChildren={
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CustomIcon
            name="notification"
            size={30}
            style={{ paddingHorizontal: 5 }}
            color={color.black}
            onPress={() => {
              navigation.navigate('MainNavigation', { screen: 'AlertPage' });
            }}
          />
          <OutlinedButton
            size="xs"
            title={switchTitle}
            onPress={() => {
              switchBoard();
            }}
          />
        </View>
      }
    />
  );
};

export default HomeHeader;
