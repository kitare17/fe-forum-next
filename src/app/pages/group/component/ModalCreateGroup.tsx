import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Autocomplete, Grid} from '@mui/material';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {useDispatch} from "react-redux";
import {Controller, useForm} from "react-hook-form";
import {BlogInterface} from "@/app/interface/Blog";
import TextField from "@mui/material/TextField";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {createGroup} from "@/app/store/action/group";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function CreateModalGroup() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


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
    } = useForm<any>(
        {
            defaultValues: {
                "groupName": "",
                "groupDescription": "",
                "adminGroup": "",
                "password": ""
            }
        }
    )

    const {errors} = formState;

    const handleCreate = () => {
        // alert("tạo group")
        const user = typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem('authnRes') ?? "{}") : {}
        // @ts-ignore
        dipatch(createGroup(
            {
                groupName: getValues("groupName"),
                password: getValues("password"),
                adminGroup: user.userEmailId
            }))
    }


    return (
        <>
            <Grid container justifyContent="flex-end" px={5}>
                <Button variant="contained" onClick={handleOpen}><AddCircleOutlineIcon/></Button>
            </Grid>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Tạo group
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
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
                                    onSubmit={handleSubmit(handleCreate)}
                                    component="form"
                                    sx={{
                                        '& .MuiFormLabel-asterisk': {color: 'red'}
                                    }}
                                    noValidate
                                    autoComplete="off">


                                    <Typography variant="h4"
                                                sx={{
                                                    textAlign: "center"
                                                }}
                                    >
                                        Tạo bài viết mới
                                    </Typography>


                                    <TextField
                                        id="groupName"
                                        fullWidth
                                        margin="normal"
                                        required
                                        label="Tiêu đề"
                                        variant="outlined"
                                        {...register(
                                            'groupName',
                                            {
                                                required: "Phải nhập tên group"
                                            }
                                        )}
                                        error={!!errors.groupName}
                                        helperText={(errors.groupName?.message ?? "").toString()}
                                    />

                                    <TextField
                                        id="password"
                                        fullWidth
                                        margin="normal"
                                        required
                                        type="password"
                                        label="Mật khẩu"
                                        variant="outlined"
                                        {...register(
                                            'password',
                                            {
                                                required: "Phải nhập mật khẩu"
                                            }
                                        )}
                                        error={!!errors.password}
                                        helperText={(errors.password?.message ?? "").toString()}
                                    />


                                    <Button type="submit" variant="contained">Tạo</Button>
                                </Box>

                                {/*<div>*/}
                                {/*    <div className="Container" dangerouslySetInnerHTML={{__html: text}}></div>*/}

                                {/*</div>*/}

                            </Grid>
                        </Grid>

                    </Typography>
                </Box>
            </Modal>
        </>
    );
}