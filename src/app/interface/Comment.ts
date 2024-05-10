import {UserInterface} from "@/app/interface/User";

export interface CommentInterface {
    "detail": string,
    "userComment":UserInterface
    "_id": string,
    "createdAt": string,
    "updatedAt": string
}
export interface CommentListInterface extends Array<CommentInterface > {

}