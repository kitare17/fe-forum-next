"use client"

import {useDispatch, useSelector} from "react-redux";

import {RootState} from "@/app/store";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {UserInterface} from "@/app/interface/userinterface";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import {fetchUsers} from "@/app/store/action/user";
import { getAllCategory, getOneSalePost } from "@/app/store/action/sale";

const View = () => {
    const dipatch = useDispatch();
    const {listCategory, isLoading, isError} = useSelector((state:RootState) => state.sale);

    useEffect(()=>{
            
        // dipatch(getAllCategory());
    },[])
    useEffect(()=>{
      if(isLoading)
          toast.info("Đang tải thông tin")
      if(isError)
          toast.error("lỗi rồi")
      if(listCategory)
        console.log(listCategory)
    },[isLoading,isError,listCategory]) 

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
                
            </ul>

        </div>
    )
}
export default View;