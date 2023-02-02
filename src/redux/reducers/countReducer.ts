import React from 'react'
import { State } from 'react-native-gesture-handler'
import { CountActions } from '../action/countActions'
import { CountActionType } from '../action_types/countTypes'

const initialStates = {
    number: 0
}

export const increaseCount = () => ({type: CountActionType.INCREMENT})
export const decreaseCount = () => ({type: CountActionType.DECREMENT})

const countReducer = (state = initialStates, action:CountActions) => {

    switch(action.type) {
        case CountActionType.INCREMENT: {
            return {
                ...state,
                number: state.number + 1
            }
        }
        case CountActionType.DECREMENT: {
            return {
                ...state,
                number: state.number > 0 ? (state.number - 1) : 0
            }
        }
        default:
            return state
    }
}

export default countReducer