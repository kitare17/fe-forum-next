
import {GroupInterface} from "@/app/interface/GroupInterface";

export interface DocGroupInterface {
    "docName": string,
    "_id"?:string ,
    "detail": string,
    "group"?: GroupInterface,
    createdAt?:string,
    updatedAt?:string,
    link?:string,

}
