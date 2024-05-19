"use client"

import {useDispatch, useSelector} from "react-redux";

import {RootState} from "@/app/store";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {UserInterface} from "@/app/interface/userinterface";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import {fetchLogin} from "@/app/store/action/auth";


const page = () => {

    // const dipatch = useDispatch();
    // const {user, isLoading, isError} = useSelector((state:RootState) => state.auth);

    // useEffect(()=>{

    //     // @ts-ignore
    //     dipatch(fetchLogin());
    // },[])
    // useEffect(()=>{
    //   if(isLoading)
    //       toast.info("Đang tải thông tin")
    //   if(isError)
    //       toast.error("lỗi rồi")
    // },[isLoading,isError])

   

    
  return (
    <div>
    <h1>Hello</h1>
    <Link href={"/view-redux/detail"}>Get Data</Link>
       {/* {isLoading && <CircularProgress />} */}
    <ul>
        {/* {user.map((auth:UserInterface) => { */}
            {/* return (
                <li key={auth.id}>
                    {auth.id} {auth.title}
                </li>
            )
        })
        } */}
    </ul>

</div>
  )
}

export default page