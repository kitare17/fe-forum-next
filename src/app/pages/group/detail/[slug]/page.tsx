"use client"
import React, {useEffect} from 'react';
import dynamic from "next/dynamic";
import Link from 'next/link';
import {Breadcrumbs} from '@mui/material';
import Typography from "@mui/material/Typography";
import {useParams} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {findOneGroup} from "@/app/store/action/group";
import {RootState} from "@/app/store";
import GroupDetail from '../../component/GroupDetail';


const PassJoinGroup = dynamic(() => import('../../component/PassJoinGroup'), {
    ssr: false,
})
const GroupDetailPage = () => {

    const {slug}: { slug: string } = useParams();

    const dipatch = useDispatch();

    useEffect(() => {
        //@ts-ignore
        dipatch(findOneGroup({slug}))
    }, [slug]);


    const {groupDetail, isJoin} = useSelector((state: RootState) => state.group);
    return (
        <>
            <Breadcrumbs aria-label="breadcrumb" sx={{mt: 2, ml: 5}}>
                <Link color="inherit" href="/public">
                    Trang chủ
                </Link>
                <Link

                    color="inherit"
                    href="/pages/group"
                >
                    Hội nhóm
                </Link>
                <Typography color="text.primary">{groupDetail?.groupName}</Typography>
            </Breadcrumbs>

            {isJoin ?
                <PassJoinGroup/>
                :
                <GroupDetail/>
            }

        </>
    );
};

export default GroupDetailPage;