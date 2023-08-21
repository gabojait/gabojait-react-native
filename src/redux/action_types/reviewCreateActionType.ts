import { ActionType } from "typesafe-actions";
import * as actions from '@/redux/action/reviewCreateAction'
import { AsyncState } from "@/lib/reducerUtils";

export type ReviewCreateActionType = ActionType<typeof actions>
export type ReviewCreateState = {
    reviewCreateResult: AsyncState<{}, Error>
}