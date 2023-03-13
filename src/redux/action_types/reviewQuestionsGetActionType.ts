import { ActionType } from "typesafe-actions";
import * as actions from '@/redux/action/reviewQuestionsGetAction'
import { AsyncState } from "@/lib/reducerUtils";
import ReviewQuestions from "@/model/Review/ReviewQuestions";

export type ReviewQuestionsActionType = ActionType<typeof actions>
export type ReviewQuestionsState = {
    reviewQuestionsResult: AsyncState<Array<ReviewQuestions>, Error>
}