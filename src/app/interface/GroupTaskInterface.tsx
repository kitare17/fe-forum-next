import {GroupInterface} from "@/app/interface/GroupInterface";
import {UserInterface} from "@/app/interface/User";

export interface GroupTaskInterface {
    "title": string,
    "_id"?: string,
    "detail": string,
    "group"?: GroupInterface,
    "assignee"?: [UserInterface],
    createdAt?: string,
    updatedAt?: string,
    "label": string,
    "startDate": string,
    "endDate": string,
    "status":string
}
