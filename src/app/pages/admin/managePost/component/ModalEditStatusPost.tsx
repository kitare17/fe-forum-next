"use client"
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {removeBlog} from "@/app/store/action/blog";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {Controller, useForm} from "react-hook-form";
import {BlogInterface} from "@/app/interface/Blog";
import {createNotification, createTaskGroup} from "@/app/store/action/group";
import Grid from "@mui/material/Grid";
import {Autocomplete, Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {RootState} from "@/app/store";
import blog from "@/app/store/reducer/blog";
import {updateBlogStatus} from "@/app/store/action/dashboard";

const ModalEditStatusPost = (
    {
        blog,
        openEditStatusBlog,
        setOpenCreateWordForm
    }
        : {
        blog: BlogInterface|undefined,
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



   


    const listStatusOption = [
        {
            label: "Đang hoạt động",
            id: "1"
        },
        {
            label: "Bị khóa",
            id: "2"
        }
    ]



    const handleFormCreate = () => {

        var status=getValues("status");

        // alert(blog?._id+" "+status.label);
        // @ts-ignore

        dipatch(updateBlogStatus({status:status.label, postId:blog?._id}))
        // reset();
        handleClickCloseForm();

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
                <DialogTitle>Chỉnh sửa trạng thái của blog</DialogTitle>
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
                            <Box

                                component="form"
                                sx={{
                                    '& .MuiFormLabel-asterisk': {color: 'red'}
                                }}
                                noValidate
                                autoComplete="off">



                                <Controller
                                    control={control}
                                    name={"status"}
                                    rules={{required: true}}

                                    render={({field: {onChange, value}}) => {
                                        return (
                                            <Autocomplete
                                                sx={{
                                                    mt: 2
                                                }}
                                                onBlur={async () => {
                                                    await trigger("status")
                                                }}
                                                defaultValue={{
                                                    label: blog?.statusPost ?? "",
                                                    id: "1"
                                                }}
                                                getOptionLabel={(option) => {
                                                    return option.label
                                                }}
                                                options={listStatusOption}

                                                renderInput={(params) => (
                                                    <TextField {...params} label="Trạng thái"
                                                               error={!!errors.status}
                                                               helperText={errors.status && "Vui lòng chỉnh sửa trạng thái"}
                                                               required

                                                    />
                                                )}
                                                isOptionEqualToValue={(option, value) => {
                                                    return option.label === value.label
                                                }
                                                }
                                                onChange={async (e, value) => {
                                                    if (!value) {
                                                        // @ts-ignore
                                                        setValue('status', {id: "", label: ""});
                                                        await trigger("status")
                                                        return ""
                                                    }
                                                    // @ts-ignore
                                                    setValue('status', {id: value.id, label: value.label});
                                                }}
                                            />

                                        )
                                    }}
                                />
                            </Box>


                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickCloseForm}>Hủy</Button>
                    <Button type="button" onClick={handleSubmit(handleFormCreate)}>Lưu</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default ModalEditStatusPost;
