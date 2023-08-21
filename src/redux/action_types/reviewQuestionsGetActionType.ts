import {ActionType} from 'typesafe-actions'
import * as actions from '@/redux/action/reviewQuestionsGetAction'
import {AsyncState} from '@/lib/reducerUtils'
import ReviewQuestion from '@/data/model/Review/ReviewQuestion'

export type ReviewQuestionsActionType = ActionType<typeof actions>
export type ReviewQuestionsState = {
  reviewQuestionsResult: AsyncState<Array<ReviewQuestion>, Error>
}
