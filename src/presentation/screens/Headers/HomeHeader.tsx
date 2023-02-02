import {getHeaderTitle} from '@react-navigation/elements'
import {StackHeaderProps, StackScreenProps} from '@react-navigation/stack'
import React, { useCallback, useState } from 'react'
import { View } from 'react-native'
import CustomIcon from '@/presentation/components/icon/Gabojait'
import { OutlinedButton } from '../../components/Button'
import CustomHeader from '../../components/CustomHeader'
import color from '@/presentation/res/styles/color'
import {store} from '@/redux/store'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { BoardSwitchActionType } from '@/redux/action_types/boardSwitchTypes'
import { Provider, useDispatch } from 'react-redux'
import boardSwitchReducer from '@/redux/reducers/boardSwitchReducer'
import { BoardStackParamList } from '@/presentation/navigation/types'

export type BoardStackProps = StackScreenProps<BoardStackParamList, 'Group'> 

const Header: React.FC<StackHeaderProps> = ({navigation, route, options, back}) => {
  const title = getHeaderTitle(options, route.name)
  const dispatch = useAppDispatch()
  const {switchTitle} = useAppSelector(state => state.boardSwitchReducer)

  // 일단 급한 작업부터 하고서 더 깔끔하게 리팩토링 예정.
  const switchBoard = () => {
    if(switchTitle == BoardSwitchActionType.FiND_TEAMATE_SWITCH) {
      dispatch({type: BoardSwitchActionType.FiND_TEAMATE_SWITCH})
      navigation.navigate('TeamMate')
    }
    else{
      dispatch({type: BoardSwitchActionType.FIND_GROUP_SWITCH})
      navigation.navigate('Group')
    }
  }

  return (
    <CustomHeader title={title} canGoBack={navigation.canGoBack()}  
      rightChildren={
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <CustomIcon name='notification' size={30} style={{paddingHorizontal:5}} color={color.black}/>
          <OutlinedButton size='xs' title={switchTitle} onPress={()=>{
            switchBoard()
          }}/>
        </View>
    }
  />
  )
}

export default Header
