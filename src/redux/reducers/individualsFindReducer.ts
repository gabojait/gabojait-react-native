import createAsyncThunk from "@/lib/createAsyncThunk";
import { asyncState, createAsyncReducer } from "@/lib/reducerUtils";
import { individualsFindAsyncAction } from "../action/individualsFindAction";
import { individualsFindActionType, IndividualsFindState } from "../action_types/individualsFindActionType";
import * as teamApi from '@/api/team'
import { createReducer } from "typesafe-actions";

const initialState: IndividualsFindState = {
    individualsFindResult: asyncState.initial([])
}

export const findIndividuals = createAsyncThunk(individualsFindAsyncAction, teamApi.findIndividuals)

export const individualsFindReducer = createReducer<IndividualsFindState, individualsFindActionType>(initialState)
.handleAction(
    [individualsFindAsyncAction.request, individualsFindAsyncAction.success, individualsFindAsyncAction.failure],
    createAsyncReducer(individualsFindAsyncAction, 'individualsFindResult')
)