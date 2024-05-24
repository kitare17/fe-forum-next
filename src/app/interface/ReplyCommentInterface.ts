import {UserInterface} from "@/app/interface/User";

export interface ReplyCommentInterface {
    "detail"?: string,
    "userComment"?: UserInterface
    "_id"?: string,
    "createdAt": string,
    "updatedAt"?: string,
}

export interface ReplyCommentListInterface extends Array<ReplyCommentInterface> {

}