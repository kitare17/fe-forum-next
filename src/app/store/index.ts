"use client"
import {configureStore} from '@reduxjs/toolkit'
import userReducer from "./reducer/user"
import chatEnglishReducer from "./reducer/chat"
export const index =
    configureStore({
            reducer: {
                user: userReducer,
                chatEnglish:chatEnglishReducer
            }
        }
    )


export type AppDispatch = typeof index.dispatch
export type RootState = ReturnType<typeof index.getState>
