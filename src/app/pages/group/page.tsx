"use client"
import React, {Suspense, useEffect, useState} from 'react';
import SearchGroup from "@/app/pages/group/component/SearchGroup";
import CardGroup from "@/app/pages/group/component/CardGroup";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/store";
import {fetchUsers} from "@/app/store/action/user";
import {toast} from "react-toastify";
import {findAllGroup, findAllGroupByName} from "@/app/store/action/group";

import {useRouter, useSearchParams} from "next/navigation";

const GroupPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const page = searchParams.get('page') ?? 1;
    const searchName = searchParams.get('groupName') ?? "";


    //fetch data
    const dipatch = useDispatch();
    const {listGroup, maxPage, isLoading, isError} = useSelector((state: RootState) => state.group);


    useEffect(() => {
        console.log("check search", searchName)

        if (!searchName){
            // @ts-ignore
            dipatch(findAllGroup({page}));
        }


        else
        {
            // @ts-ignore
            dipatch(findAllGroupByName({page, groupName: searchName}));
        }
    }, [page, searchName])
    useEffect(() => {
        // if (isLoading)
        //     toast.info("Đang tải thông tin")
        if (isError)
            toast.error("lỗi rồi")
    }, [isLoading, isError])


    const handlePaging = (event: any, value: number) => {
        if(searchName)
        router.push(`/pages/group?page=${value}&groupName=${searchName}`);
        else
        router.push(`/pages/group?page=${value}`)
    };


    return (
        <>
            <SearchGroup />

            <CardGroup array={listGroup}/>
            <Grid container
                  sx={{
                      display: 'flex',
                      justifyContent: 'center'
                  }}
                  mb={2}
            >
                <Grid item xs={10}
                      sx={{
                          display: 'flex',
                          justifyContent: 'center'
                      }}
                >
                    <Pagination
                        onChange={handlePaging}
                        count={maxPage}
                        defaultPage={1}
                        siblingCount={1}
                        page={Number(page)??1}
                        size="large"

                        showLastButton
                        showFirstButton/>
                </Grid>
            </Grid>
        </>
    );
};


const GroupPageRender = () => {
    return (
        // You could have a loading skeleton as the `fallback` too
        <Suspense>
            <GroupPage/>
        </Suspense>
    )
};

export default GroupPageRender

