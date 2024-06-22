"use client"
import {configureStore} from '@reduxjs/toolkit'
import userReducer from "./reducer/user"
import auth from "./reducer/auth"
import chatEnglishReducer from "./reducer/chat"
import blog from "./reducer/blog"
import topic from "@/app/store/reducer/topic";
import group from "@/app/store/reducer/group";
import sale from "@/app/store/reducer/sale";
import quiz from "@/app/store/reducer/quiz";
import test from "@/app/store/reducer/test";


export const index =
    configureStore({
            reducer: {
                user: userReducer,
                chatEnglish:chatEnglishReducer,
                blog:blog,
                topic:topic,
                auth: auth,
                group: group,
                sale: sale,
                quiz:  quiz,
                test: test,
            }
        }
    )


export type AppDispatch = typeof index.dispatch
export type RootState = ReturnType<typeof index.getState>
