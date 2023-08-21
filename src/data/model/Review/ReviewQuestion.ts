export default interface ReviewQuestion {
    context: string,
    createdDate: string,
    modifiedDate: string,
    questionId: string,
    reviewType: ReviewType,
    schemaVersion: string
}

export enum ReviewType {
    RATING = "RATING",
    ANSWER = "ANSWER"
}