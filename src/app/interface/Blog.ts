import {UserInterface} from "@/app/interface/User";
import { CommentListInterface} from "@/app/interface/Comment";

export interface BlogInterface {
    "title"?: string,
    "_id"?:string ,
    "detail"?: string,
    "creator"?: UserInterface,
    createdAt?:string,
    updatedAt?:string,
    statusPost?:string,
    comments?:CommentListInterface
}

