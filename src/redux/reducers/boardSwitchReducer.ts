import { BoardSwitchActions } from '@/redux/action/boardSwitchActions'
import React from 'react'
import { BoardSwitchActionType } from '../action_types/boardSwitchTypes'

const initialStates = {
    switch:BoardSwitchActionType.GROUP_SWITCH
}

const boardSwitchReducers = (state = initialStates,action:BoardSwitchActions) => {
    const {type} = action

    switch(type) {
        case BoardSwitchActionType.GROUP_SWITCH: {
            return {
                ...state,
                switch: BoardSwitchActionType.GROUP_SWITCH
            }
        }
        case BoardSwitchActionType.TEAMATE_SWITCH: {
            return {
                ...state,
                switch: BoardSwitchActionType.TEAMATE_SWITCH
            }
        }
    }
}

export default boardSwitchReducers