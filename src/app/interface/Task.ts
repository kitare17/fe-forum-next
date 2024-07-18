export interface TaskInterface {
    "_id": string,
    "taskName": string,
    "createAt"?: string,
    "updateAt"?: string,
    "userId"?: string,
    "todoList"?: string[],
    "maxPage"?: number
}