import {UserInterface} from "@/app/interface/User";


export interface SaleInterface {
    _id?: string,
    title?:string ,
    detail?: string,
    images: string[],
    productStatus?:string,
    category?:string,
    brand?:string,
    origin?:string,
    address?:string,
    creator?:UserInterface,
    isLock?:boolean,
    isSold?:boolean,
    comments?:string[],
    createdAt?:string,
    updatedAt?:string,
    price:number,
}
