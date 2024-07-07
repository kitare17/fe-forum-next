import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/store";
import {getAllMember} from "@/app/store/action/group";
import {toast} from "react-toastify";
import CardMember from "@/app/pages/group/component/CardMember";

const MemberList = ({groupId}:{groupId:string}) => {

    const dipatch = useDispatch();
    const {members,groupDetail, isLoading, isError} = useSelector((state: RootState) => state.group);

    useEffect(() => {
        if(groupId)
        // @ts-ignore
        dipatch(getAllMember({groupId:groupId}));
    }, [groupId])
    useEffect(() => {
        if (isLoading)
            toast.info("Đang tải thông tin")
        if (isError)
            toast.error("lỗi rồi")
    }, [isLoading, isError])




    return (
        <>
            <CardMember members={members} groupId={groupId} groupDetail={groupDetail} />
        </>
    );
};

export default MemberList;