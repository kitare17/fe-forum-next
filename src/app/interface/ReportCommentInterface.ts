import {BlogInterface} from "@/app/interface/Blog";
import {UserInterface} from "@/app/interface/User";

export interface ReportCommentInterface{
    "title"?: string,
    "reason"?: string,
    "userReport"?:UserInterface,
    "blogId"?: BlogInterface,
    "commentId"?: string,
    "status"?:string
}
