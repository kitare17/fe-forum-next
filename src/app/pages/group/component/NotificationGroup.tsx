import React, {useEffect} from 'react';
import CardNotification from "@/app/pages/group/component/CardNotification";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/store";
import {findAllNotification} from "@/app/store/action/group";
import {useRouter, useSearchParams} from "next/navigation";

const NotificationGroup = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const page = searchParams.get('page') ?? 1;

    const {listNotification, maxPageNotification, isLoading, isError} = useSelector((state: RootState) => state.group);

    const dipatch = useDispatch();
    useEffect(() => {
        console.log("page noti",page)
        // @ts-ignore
        dipatch(findAllNotification({page: page, groupId: "666460ca76b649da27f6ba23"}))
    }, [page])

    const handlePaging = (event: any, value: number) => {
        var currentUrl: string = window.location.href;
        if (currentUrl.indexOf("?page=") >= 0) {
            var pushUrl: string = currentUrl.substring(0,currentUrl.lastIndexOf("?page="));
            // alert("da co page")
            // alert(`${pushUrl}?page=${value}`)


            router.push(`${pushUrl}?page=${value}`)
        } else {
            var pushUrl: string = currentUrl.substring(currentUrl.indexOf("/pages/group/detail/"));
            // alert(`${pushUrl}?page=${value}`)
            // alert("chua co page")
            router.push(`${pushUrl}?page=${value}`);
        }

    };

    return (
        <>
            {listNotification.map((notification, index) => {
                return (
                    <CardNotification title={notification.title} detail={notification.detail} key={index}/>
                )
            })}
            <Grid container
                  sx={{
                      display: 'flex',
                      justifyContent: 'center'
                  }}
                  mb={2}
                  mt={2}
            >
                <Grid item xs={10}
                      sx={{
                          display: 'flex',
                          justifyContent: 'center'
                      }}
                      mb={2}
                >
                    <Pagination
                        onChange={handlePaging}
                        count={maxPageNotification}
                        defaultPage={1}
                        siblingCount={1}
                        size="large"
                        showLastButton
                        showFirstButton/>
                </Grid>
            </Grid>
        </>
    );
};

export default NotificationGroup;