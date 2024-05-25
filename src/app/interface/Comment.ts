import {UserInterface} from "@/app/interface/User";
import {ReplyCommentListInterface} from "@/app/interface/ReplyCommentInterface";

export interface CommentInterface {
    "detail": string,
    "userComment": UserInterface
    "_id": string,
    "createdAt": string,
    "updatedAt": string,
    replyComment: ReplyCommentListInterface,
}



export interface CommentListInterface extends Array<CommentInterface> {
}