"use client"
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {removeBlog} from "@/app/store/action/blog";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

const FormRemoveDialog = (
    {
        blogId,
        openRemoveBlog,
        setOpenRemoveBlog
    }
        : {
        blogId: string,
        openRemoveBlog: boolean,
        setOpenRemoveBlog: React.Dispatch<React.SetStateAction<boolean>>
    }
) => {

    const router=useRouter();

    //state of prop dialog
    const handleClickOpenEditBlog = () => {
        setOpenRemoveBlog(true);
    };
    const handleClickCloseRemoveBlog = () => {
        setOpenRemoveBlog(false);
    };


    //form
    const dipatch = useDispatch();

    ///text edit field

    useEffect(() => {


    }, [])


    const handleRemoveBlog = () => {

        // @ts-ignore
        dipatch(removeBlog({blogId}));
        toast.success('Xóa bài viết thành công');
        router.replace("/pages/blog")
    }

    return (
        <React.Fragment>

            <Dialog
                open={openRemoveBlog}
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
                <DialogTitle>Xóa bài viết </DialogTitle>
                <DialogContent>
                    <span className="text-danger">Bạn có chắc muốn xóa không. Hành động này sẽ không được hoàn tác!!! ❌❌❌</span>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickCloseRemoveBlog}>Hủy</Button>
                    <Button type="button" onClick={handleRemoveBlog}>Xóa</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default FormRemoveDialog;
