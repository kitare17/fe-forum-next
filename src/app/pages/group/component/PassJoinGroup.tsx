"use client"
import React from 'react';
import {Controller, useForm} from "react-hook-form";
import {BlogInterface} from "@/app/interface/Blog";
import Grid from "@mui/material/Grid";
import {Autocomplete, Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/store";
import {joinGroup} from "@/app/store/action/group";

const PassJoinGroup = () => {

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
                "password": "",
            }
        }
    );
    const {errors} = formState;

    const dipatch=useDispatch();

    const {groupDetail} = useSelector((state: RootState) => state.group);


    const handleJoinGroup = () => {
        alert("join group for fun")
        const user = typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem('authnRes') ?? "{}") : {}
        const groupId =groupDetail?._id;
        // @ts-ignore
        dipatch(joinGroup({groupId:groupId, userId:user.userEmailId}))

    }


    return (
        <>
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
                        onSubmit={handleSubmit(handleJoinGroup)}
                        component="form"
                        sx={{
                            '& .MuiFormLabel-asterisk': {color: 'red'}
                        }}
                        noValidate
                        autoComplete="off">


                        <h3 style={{textAlign: "center"}}>Tham gia nhóm {groupDetail?.groupName} </h3>


                        <TextField
                            id="title"
                            fullWidth
                            margin="normal"
                            required
                            type={"password"}
                            label="Mật khẩu"
                            variant="outlined"
                            {...register(
                                'password',
                                {
                                    required: "Phải nhập mật khẩu"
                                }
                            )}
                            error={!!errors.password}
                            helperText={errors?.password?.message?.toString()}
                        />

                        <Button type="submit" variant="contained">Tham gia</Button>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default PassJoinGroup;