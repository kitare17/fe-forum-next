"use client"
import {useState} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import {useForm} from "react-hook-form";

import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/store";
import {createReport} from "@/app/store/action/blog";
import {ReportCommentInterface} from "@/app/interface/ReportCommentInterface";


const ReportCommentDialog = (
    {
        blogId,
        commentId,
        openFormCommentReport,
        setOpenFormCommentReport,

    }
        :
        {
            blogId: string,
            commentId: string,
            openFormCommentReport: boolean,
            setOpenFormCommentReport: React.Dispatch<React.SetStateAction<boolean>>
        }) => {


    const dipatch = useDispatch();


    const handleReportClose = () => {
        setOpenFormCommentReport(false);
    };


    const {user} = useSelector((state: RootState) => state.auth);


    const {
        register,
        handleSubmit,
        reset,
        formState,
        getValues
    } = useForm<ReportCommentInterface>(
        {
            defaultValues: {
                "title": "Báo cáo vi phạm",
                "reason": "",
                "blogId": blogId,
                // @ts-ignore
                "userReport": (user?.userEmailId ?? "")
            }
        }
    )
    const {errors} = formState;

    const handleReport = () => {

        const reportForm: ReportCommentInterface = {
            title: getValues("title"),
            reason: getValues("reason"),
            userReport: getValues("userReport"),
            blogId: getValues("blogId"),
            commentId: commentId
        }

        // alert("Đay ne "+getValues("commentId"))
        alert(JSON.stringify({reportForm}))
        // @ts-ignore
        // dipatch(createReport(reportForm))
        // handleReportClose();
    };

    return (
        <>
            {/*<h1>Hello</h1>*/}
            {/*<Button variant="outlined" onClick={handleReportOpen}>*/}
            {/*    Open form dialog*/}
            {/*</Button>*/}
            <Dialog
                open={openFormCommentReport}
                onClose={handleReportClose}
            >
                <DialogTitle>Báo cáo bình luận</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Hãy cho chúng mình lí do comment này vi phạm nhé
                    </DialogContentText>
                    <TextField
                        sx={{
                            marginTop: "20px"
                        }}
                        select
                        fullWidth
                        label="Lý do"
                        defaultValue=''
                        inputProps={register('reason', {
                            required: 'Chọn lý do bạn nhé',
                        })}
                        error={(errors.reason ?? false) as boolean}
                        helperText={errors.reason?.message}
                    >
                        <MenuItem value={"Nội dung bất hợp pháp"}>Nội dung bất hợp pháp</MenuItem>
                        <MenuItem value={"Nội dung gây hiểu lầm hoặc sai lệch"}>Nội dung gây hiểu lầm hoặc sai
                            lệch</MenuItem>
                        <MenuItem value={"Nội dung kích động bạo lực hoặc căm ghét"}>Nội dung kích động bạo lực hoặc căm
                            ghét</MenuItem>
                        <MenuItem value={"Nội dung khiêu dâm hoặc tình dục"}>Nội dung khiêu dâm hoặc tình dục</MenuItem>
                        <MenuItem value={"Nội dung quảng cáo không đáng tin cậy"}>Nội dung quảng cáo không đáng tin
                            cậy</MenuItem>
                        <MenuItem value={"Nội dung xúc phạm"}>Nội dung xúc phạm</MenuItem>
                        <MenuItem value={"Nội dung liên quan đến ma túy hoặc hành vi tự sát"}>Nội dung liên quan đến ma
                            túy hoặc hành vi tự sát</MenuItem>
                        <MenuItem value={"Nội dung quảng cáo không phù hợp"}>Nội dung quảng cáo không phù hợp</MenuItem>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleReportClose}>Hủy</Button>
                    <Button type="button" onClick={handleSubmit(handleReport)}>Báo cáo</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
export default ReportCommentDialog