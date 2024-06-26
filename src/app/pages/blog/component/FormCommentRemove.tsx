"use client"
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {removeBlog, removeCommentBlog} from "@/app/store/action/blog";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

const FormRemoveCommentDialog = (
    {
        blogId,
        commentId,
        openRemoveCommentBlog,
        setOpenRemoveCommentBlog
    }
        : {
        blogId: string,
        commentId: string,
        openRemoveCommentBlog: boolean,
        setOpenRemoveCommentBlog: React.Dispatch<React.SetStateAction<boolean>>
    }
) => {

    const router=useRouter();

    //state of prop dialog
    const handleClickOpenEditBlog = () => {
        setOpenRemoveCommentBlog(true);
    };
    const handleClickCloseRemoveBlog = () => {
        setOpenRemoveCommentBlog(false);
    };


    //form
    const dipatch = useDispatch();

    ///text edit field

    useEffect(() => {


    }, [])


    const handleRemoveCommentBlog = () => {
        handleClickCloseRemoveBlog();
        // @ts-ignore
        dipatch(removeCommentBlog({blogId,commentId}));
        toast.success('Xóa comment thành công');
     
    }

    return (
        <React.Fragment>

            <Dialog
                open={openRemoveCommentBlog}
                onClose={handleClickCloseRemoveBlog}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "400px",  // Set your width here
                        },
                    },
                }}
            >
                <DialogTitle>Xóa comment  </DialogTitle>
                <DialogContent>
                    <span className="text-danger">Bạn có chắc muốn xóa không. Hành động này sẽ không được hoàn tác!!! ❌❌❌</span>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickCloseRemoveBlog}>Hủy</Button>
                    <Button type="button" onClick={handleRemoveCommentBlog}>Xóa</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default FormRemoveCommentDialog;
