"use client"
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {removeBlog} from "@/app/store/action/blog";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {Controller, useForm} from "react-hook-form";
import {BlogInterface} from "@/app/interface/Blog";
import {createNotification} from "@/app/store/action/group";
import Grid from "@mui/material/Grid";
import {Autocomplete, Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const FormCreateNotification = (
    {
        groupId,
        openCreateNotification,
        setOpenCreateNotificationForm
    }
        : {
        groupId:string,
        openCreateNotification: boolean,
        setOpenCreateNotificationForm: React.Dispatch<React.SetStateAction<boolean>>
    }
) => {

    const router=useRouter();
    
   
    const handleClickCloseForm = () => {
        setOpenCreateNotificationForm(false);
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
                "title": "",
                "detail": "",
            }
        }
    )
    const {errors} = formState;
    ///text edit field
    const [text, setText] = useState<string>("");
    const onChangeText = (event: any, editor: any) => {
        setText(editor.getData())
        console.log(editor.getData())
    }

    useEffect(() => {


    }, [])


    const handleFormCreate = () => {


        if(text){
            // @ts-ignore
            dipatch(createNotification({
                title: getValues("title"),
                detail:text,
                group:groupId
            }));
            handleClickCloseForm();
            setText("");
            reset();

        }
        else{
            toast.error("Vui lòng nhập nội dung")
        }
    }

    return (
        <React.Fragment>

            <Dialog
                open={openCreateNotification}
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
                <DialogTitle>Tạo thông báo mới </DialogTitle>
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
                                    helperText={(errors.title?.message??"").toString()}
                                />


                                <div style={{marginTop: "10px", marginBottom: "10px", width: "100%"}}>
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
                    <Button onClick={handleClickCloseForm}>Hủy</Button>
                    <Button type="button" onClick={handleSubmit(handleFormCreate)}>Tạo</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default FormCreateNotification;
