import {UserInterface} from "@/app/interface/User";

export interface BlogInterface {
    "title": string,
    "id":string ,
    "detail": string,
    "creator": UserInterface
}