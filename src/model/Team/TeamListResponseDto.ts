import Team from "./Team";

export default interface TeamListResponseDto {
    responseCode: string,
    responseMessage: string,
    data: Array<Team>,
    totalPageNum: number
}