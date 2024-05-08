import {UserInterface} from "@/app/interface/User";

export interface BlogInterface {
    "title"?: string,
    "_id"?:string ,
    "detail"?: string,
    "creator"?: UserInterface,
    createdAt?:string,
    updatedAt?:string,
    statusPost?:string
}