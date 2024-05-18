"use client"
import {configureStore} from '@reduxjs/toolkit'
import userReducer from "./reducer/user"
import auth from "./reducer/auth"
import chatEnglishReducer from "./reducer/chat"
import blog from "./reducer/blog"
import topic from "@/app/store/reducer/topic";
export const index =
    configureStore({
            reducer: {
                user: userReducer,
                chatEnglish:chatEnglishReducer,
                blog:blog,
                topic:topic,
                auth: auth
            }
        }
    )


export type AppDispatch = typeof index.dispatch
export type RootState = ReturnType<typeof index.getState>
