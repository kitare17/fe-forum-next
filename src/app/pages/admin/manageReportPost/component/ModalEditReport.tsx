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
import {acceptReportComment, cancelReportComment} from "@/app/store/action/dashboard";

const ModalEditReport = (
    {
        report,
        openEditStatusBlog,
        setOpenCreateWordForm
    }
        : {
        report: ReportBlogInterface | undefined
        openEditStatusBlog: boolean,
        setOpenCreateWordForm: React.Dispatch<React.SetStateAction<boolean>>
    }
) => {


    const handleClickCloseForm = () => {
        setOpenCreateWordForm(false);
    };


    //form
    const dipatch = useDispatch();

    const {
        register,
        handleSubmit,
        reset,
        formState,
        control,
        trigger,
        setValue,
        getValues
    } = useForm(
        {
            defaultValues: {

                "status": "",

            }
        }
    )
    const {errors} = formState;


    const handleCancel = () => {
        //@ts-ignore
        dipatch(cancelReportComment({reportId:report?._id}))
        setOpenCreateWordForm(false)

    }

    const handleAccept = () => {
        //@ts-ignore
        dipatch(acceptReportComment({reportId:report?._id}))
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
                <DialogTitle>Cập nhật trạng thái của report</DialogTitle>
                <DialogContent>
                    <Grid container
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          spacing={2}
                          mt={4}
                          mb={9}
                    >
                        <Grid item xs={10}>
                            <b>Ngày tạo:</b> {createDayToStringTask(report?.createdAt ?? "")}
                            <br/>
                            <b>Cập nhật:</b> {createDayToStringTask(report?.updatedAt ?? "")}
                            <br/>
                            <b>Trạng thái:</b> {report?.status}
                            <br/>
                            <b>Lý do:</b> {report?.reason}
                            <br/>

                        </Grid>
                        <Grid item xs={10}
                              sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between'
                              }}

                        >


                            <Button variant="contained" onClick={() => handleAccept()}
                                    sx={{backgroundColor: "#00cc00"}}>Khóa bài viết này</Button>
                            <Button variant="contained" onClick={() => handleCancel()}
                                    sx={{backgroundColor: "#ff0000"}}>Bài viết hợp lệ</Button>


                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickCloseForm}>Hủy</Button>
                    {/*<Button type="button" onClick={handleSubmit(handleFormCreate)}>Lưu</Button>*/}
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default ModalEditReport;
