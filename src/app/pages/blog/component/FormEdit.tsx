"use client"
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormEdit from "@/app/pages/blog/component/FormEdit";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {BlogInterface} from "@/app/interface/Blog";
import {useEffect, useState} from "react";

import {toast} from "react-toastify";
import Grid from "@mui/material/Grid";
import {Box} from "@mui/material";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {editBlog} from "@/app/store/action/blog";

const FormEditDialog = (
    {
        blogId,
        title,
        detail,
        openEditBlog,
        setOpenEditBlog
    }
        : {
        blogId: string,
        title: string,
        detail: string,
        openEditBlog: boolean,
        setOpenEditBlog: React.Dispatch<React.SetStateAction<boolean>>
    }
) => {

    //state of prop dialog
    const handleClickOpenEditBlog = () => {
        setOpenEditBlog(true);
    };
    const handleClickCloseEditBlog = () => {
        setOpenEditBlog(false);
    };


    //manage put data form


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
    } = useForm<BlogInterface>(
        {
            defaultValues: {
                "title": title,
                "_id": blogId,
                "detail": detail
            }
        }
    )

    const {errors} = formState;


    ///text edit field
    const [text, setText] = useState<string>(detail);

    useEffect(() => {
        setText(detail);
        setValue("title", title);

    }, [detail, title])
    const onChangeText = (event: any, editor: any) => {
        setText(editor.getData())
        console.log(editor.getData())
    }

    const handleEditBlog = () => {
        const editBlogData = {
            title: getValues("title"),
            id: getValues("_id"),
            detail: getValues("detail"),
        }
        if (text) {
            editBlogData.detail = text
                .replace("<figure class=\"image image-style-side\">", "<figure style=\"text-align: center;\" class=\"image image-style-side\">")
                .replace("<figure class=\"image\"", "<figure class=\"image\" style=\"text-align: center;\"");

            console.log(editBlog)
            // @ts-ignore
            dipatch(editBlog({
                postId:blogId,
                detail:editBlogData.detail,
                title:editBlogData.title,

            }));

            setOpenEditBlog(false);

        } else {
            if (!text) toast.error("Vui lòng nhập nội dung");
        }

    }


    return (
        <React.Fragment>

            <Dialog
                open={openEditBlog}
                onClose={handleClickCloseEditBlog}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "1200px",  // Set your width here
                        },
                    },
                }}
            >
                <DialogTitle>Chỉnh sửa bài viết {title}</DialogTitle>
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
                                onSubmit={handleSubmit(handleEditBlog)}
                                component="form"
                                sx={{
                                    '& .MuiFormLabel-asterisk': {color: 'red'}
                                }}
                                noValidate
                                autoComplete="off">
                                <TextField

                                    id="title"
                                    fullWidth
                                    margin="normal"
                                    required
                                    label="Tiêu đề"
                                    variant="outlined"
                                    {...register(
                                        'title',
                                        {
                                            required: "Phải nhập title"
                                        }
                                    )}
                                    error={!!errors.title}
                                    helperText={errors.title?.message}
                                />
                                <div style={{marginTop: "10px", width: "100%"}}>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        config={
                                            {
                                                ckfinder: {
                                                    uploadUrl: "http://localhost:8080/minio/upload-ckeditor"
                                                }
                                            }
                                        }
                                        onChange={onChangeText}
                                        data={text}
                                    >
                                    </CKEditor>
                                </div>
                            </Box>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickCloseEditBlog}>Hủy</Button>
                    <Button type="button" onClick={handleSubmit(handleEditBlog)}>lưu</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default FormEditDialog;
