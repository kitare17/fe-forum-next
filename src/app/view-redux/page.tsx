"use client"

import {useDispatch, useSelector} from "react-redux";

import {RootState} from "@/app/store";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {UserInterface} from "@/app/interface/userinterface";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import {fetchUsers} from "@/app/store/action/user";

const View = () => {
    const dipatch = useDispatch();
    const {listUser, isLoading, isError} = useSelector((state:RootState) => state.user);

    useEffect(()=>{

        // @ts-ignore
        dipatch(fetchUsers());
    },[])
    useEffect(()=>{
      if(isLoading)
          toast.info("Đang tải thông tin")
      if(isError)
          toast.error("lỗi rồi")
    },[isLoading,isError])

    const handleClick = () => {
        // @ts-ignore
        dipatch(fetchUsers());
        toast.success("ok");
    }


    return (
        <div>
            <h1>Hello</h1>
            <Link href={"/view-redux/detail"}>Get Data</Link>
            <button onClick={handleClick}>Click me</button>
            {isLoading && <CircularProgress />}
            <ul>
                {listUser.map((user:UserInterface) => {
                    return (
                        <li key={user.id}>
                            {user.id} {user.title}
                        </li>
                    )
                })
                }
            </ul>

        </div>
    )
}
export default View;