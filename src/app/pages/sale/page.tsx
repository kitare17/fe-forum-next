"use client"

import React, {Suspense, useEffect} from "react";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import {useRouter, useSearchParams} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/store";
import {toast} from "react-toastify";
import {getAllSalePost} from "@/app/store/action/sale";
import ListSalePost from "@/app/pages/sale/compoment/ListSalePost";

const Sale = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const page = searchParams.get('page') ?? 1;


    //fetch data
    const dipatch = useDispatch();
    const {listSale, maxPage, isLoading, isError} = useSelector((state: RootState) => state.sale);


    useEffect(() => {
        console.log("vào useEffect", page)
        // @ts-ignore
        dipatch(getAllSalePost({page}));
    }, [page])
    useEffect(() => {
        // if (isLoading)
        //     toast.info("Đang tải thông tin")
        if (isError)
            toast.error("lỗi rồi")
    }, [isLoading, isError])


    const handlePaging = (event: any, value: number) => {
        router.push(`/pages/sale?page=${value}`)
    };



    return (
        <>
           <ListSalePost array={listSale}/>
            <Grid item xs={10}
                  sx={{
                      display: 'flex',
                      justifyContent: 'center'
                  }}
                  mb={2}
            >
                <Pagination
                    onChange={handlePaging}
                    count={maxPage}
                    defaultPage={1}
                    siblingCount={1}
                    size="large"
                    showLastButton
                    showFirstButton/>
            </Grid>

        </>
    )
}


const SalePageRender = () => {
    return (
        // You could have a loading skeleton as the `fallback` too
        <Suspense>
            <Sale/>
        </Suspense>
    )
};


export default SalePageRender;