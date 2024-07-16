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
import {editBlog, editCommentBlog} from "@/app/store/action/blog";

const FormEditCommentDialog = (
    {
        blogId,
        commentId,
        detail,
        openEditComment,
        setOpenEditComment
    }
        : {
        blogId: string,
        commentId: string,
        detail: string,
        openEditComment: boolean,
        setOpenEditComment: React.Dispatch<React.SetStateAction<boolean>>
    }
) => {

    //state of prop dialog
    const handleClickOpenEditBlog = () => {
        setOpenEditComment(true);
    };
    const handleClickCloseEditBlog = () => {
        setOpenEditComment(false);
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

    }, [detail])
    const onChangeText = (event: any, editor: any) => {
        setText(editor.getData())
        console.log(editor.getData())
    }

    const handleEditBlog = () => {
        const editBlogData = {

            detail: getValues("detail"),
        }
        if (text) {
            editBlogData.detail = text
                .replace("<figure class=\"image image-style-side\">", "<figure style=\"text-align: center;\" class=\"image image-style-side\">")
                .replace("<figure class=\"image\"", "<figure class=\"image\" style=\"text-align: center;\"");

            console.log(text + " " + commentId + " " + blogId)
            //@ts-ignore
            dipatch(editCommentBlog({
                blogId: blogId,
                commentId: commentId,
                detail: editBlogData.detail

            }))


            setOpenEditComment(false);

        } else {
            if (!text) toast.error("Vui lòng nhập nội dung");
        }

    }


    return (
        <React.Fragment>

            <Dialog
                open={openEditComment}
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
                <DialogTitle>Chỉnh sửa comment</DialogTitle>
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

export default FormEditCommentDialog;
