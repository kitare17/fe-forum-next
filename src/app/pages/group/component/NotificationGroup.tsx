import React, {useEffect} from 'react';
import CardNotification from "@/app/pages/group/component/CardNotification";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/store";
import {findAllNotification} from "@/app/store/action/group";
import {useRouter, useSearchParams} from "next/navigation";
import FormCreateNotification from "@/app/pages/group/component/FormCreateNotification";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {GroupInterface} from "@/app/interface/GroupInterface";

const NotificationGroup = (
    {groupDetail}:
        {
            groupDetail: GroupInterface | undefined
        }) => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const page = searchParams.get('page') ?? 1;
    var groupId = groupDetail?._id

    const {listNotification, maxPageNotification, isLoading, isError} = useSelector((state: RootState) => state.group);
    const userId: string | undefined = (typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem('authnRes') ?? "{}") : {}).userEmailId

    var checkAdmin: boolean = userId === groupDetail?.adminGroup._id;


    const dipatch = useDispatch();
    useEffect(() => {
        console.log("page noti", page)
        if (groupId)
            // @ts-ignore
            dipatch(findAllNotification({page: page, groupId: groupId}))
    }, [page, groupId])

    const handlePaging = (event: any, value: number) => {
        var currentUrl: string = window.location.href;
        if (currentUrl.indexOf("?page=") >= 0) {
            var pushUrl: string = currentUrl.substring(0, currentUrl.lastIndexOf("?page="));
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

    const [openCreateNotification, setOpenCreateNotificationForm] = React.useState(false);

    return (
        <>
            {checkAdmin ?
                <Grid container justifyContent="flex-end">
                    <Button variant="contained"
                            onClick={() => setOpenCreateNotificationForm(true)}><AddCircleOutlineIcon/></Button>
                </Grid>
                :
                <></>
            }
            <FormCreateNotification openCreateNotification={openCreateNotification}
                                    setOpenCreateNotificationForm={setOpenCreateNotificationForm}
                                    groupId={groupId}/>


            {listNotification.map((notification, index) => {
                return (
                    <CardNotification date={notification.createdAt} title={notification.title} detail={notification.detail} key={index}/>
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