"use client"
import {Provider} from "react-redux";
import {index} from "@/app/store/index";


// @ts-ignore
export function Providers({children}) {
    return (
        <Provider store={index}>
            {children}
        </Provider>
    )
}