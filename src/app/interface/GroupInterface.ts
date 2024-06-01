import {UserInterface} from "@/app/interface/User";


export interface GroupInterface {
    "_id"?: string,
    "groupName"?:string ,
    "groupDescription"?: string,
    "adminGroup": UserInterface,
    status?:string,
    createdAt?:string,
    updatedAt?:string,
    slug?:string[]
}
