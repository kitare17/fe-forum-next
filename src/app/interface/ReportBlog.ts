import {UserInterface} from "@/app/interface/User";
import {BlogInterface} from "@/app/interface/Blog";

export interface ReportBlogInterface {
    _id: string,
    "title"?: string,
    "reason"?: string,
    "userReport"?:UserInterface,
    "blogId"?: BlogInterface,
}
