"use client"
import {configureStore} from '@reduxjs/toolkit'
import userReducer from "./reducer/user"

export const index =
    configureStore({
            reducer: {
                user: userReducer
            }
        }
    )


export type AppDispatch = typeof index.dispatch
export type RootState = ReturnType<typeof index.getState>
