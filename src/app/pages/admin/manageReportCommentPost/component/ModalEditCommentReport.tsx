"use client"
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import Grid from "@mui/material/Grid";
import {ReportBlogInterface} from "@/app/interface/ReportBlog";
import {createDayToStringTask} from "@/app/constant/Fomart";
import {ReportCommentInterface} from "@/app/interface/ReportCommentInterface";
import {CommentInterface} from "@/app/interface/Comment";
import DOMPurify from "isomorphic-dompurify";
import {acceptReportComment, cancelReportComment} from "@/app/store/action/dashboard";


const ModalEditCommentReport = (
    {
        report,
        openEditStatusBlog,
        setOpenCreateWordForm
    }
        : {
        report: ReportCommentInterface | undefined,
        openEditStatusBlog: boolean,
        setOpenCreateWordForm: React.Dispatch<React.SetStateAction<boolean>>
    }
) => {


    const handleClickCloseForm = () => {
        setOpenCreateWordForm(false);
    };


    //form
    const dipatch = useDispatch();


    //@ts-ignore
    var comment: CommentInterface | undefined = report?.blogId?.comments?.filter(comment => comment._id === report?.commentId)[0];


    const handleFormCreate = () => {


        // alert(report?._id+" "+status.label);
        // @ts-ignore


        // reset();
        handleClickCloseForm();

    }

    const handleAccept = () => {
        //@ts-ignore
        dipatch(acceptReportComment({reportId: report?._id, postId: report?.blogId?._id, commentId: report?.commentId}))

        setOpenCreateWordForm(false)

    }
    const handleCancel = () => {
        //@ts-ignore
        dipatch(cancelReportComment({reportId: report?._id}));

        setOpenCreateWordForm(false)
    }

    return (
        <React.Fragment>

            <Dialog
                open={openEditStatusBlog}
                onClose={handleClickCloseForm}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "700px",  // Set your width here
                        },
                    },
                }}
                maxWidth="lg"
            >
                <DialogTitle>Chỉnh sửa trạng thái của report</DialogTitle>
                <DialogContent>
                    <Grid container
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          spacing={2}
                          mt={4}
                          mb={9}
                    >
                        <Grid item xs={10}
                        >
                            <b>Tạo ngày: </b> {createDayToStringTask(report?.createdAt ?? "")}
                            <br/>
                            <b>Comment bị báo cáo: </b>

                            <span className="Container"
                                  dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(comment?.detail ?? "Comment này có lẽ đã bị xóa")}}></span>
                        </Grid>
                        <Grid item xs={10}
                              sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between'
                              }}

                        >


                            <Button variant="contained" onClick={() => handleAccept()}
                                    sx={{backgroundColor: "#00cc00"}}>Xoá comment này</Button>
                            <Button variant="contained" onClick={() => handleCancel()}
                                    sx={{backgroundColor: "#ff0000"}}>Comment hợp lệ</Button>


                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickCloseForm}>Hủy</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default ModalEditCommentReport;
