export default interface ReviewQuestions {
    context: String,
    createdDate: String,
    modifiedDate: String,
    questionId: String,
    reviewType: reviewType,
    schemaVersion: String
}

export enum reviewType {
    RATING = "RATING",
    ANSWER = "ANSWER"
}