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

const FormCreateWork = (
    {
        groupId,
        openCreateWork,
        setOpenCreateWordForm
    }
        : {
        groupId: string | undefined,
        openCreateWork: boolean,
        setOpenCreateWordForm: React.Dispatch<React.SetStateAction<boolean>>
    }
) => {


    const {groupDetail, isLoading, isError} = useSelector((state: RootState) => state.group);

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
                "title": "",
                "detail": "",
                "startDay": "",
                "endDay": "",
                "level": "",
                "assignee": []
            }
        }
    )
    const {errors} = formState;



    useEffect(() => {


    }, [])


    const listLevelOption = [
        {
            label: "Quan trọng",
            id: "1"
        },
        {
            label: "Trung bình",
            id: "2"
        },
        {
            label: "Thấp",
            id: "3"
        }
    ]
    const [listMember, setListMember] = useState([{
        label: "None",
        id: "1"
    }]);
    useEffect(() => {
        if (groupDetail) {
            var filterList = groupDetail.members.map(mem => {
                var option = {id: mem._id, "label": mem.username};
                return option;
            })

            setListMember([{id: groupDetail.adminGroup._id, label: groupDetail.adminGroup.username}, ...filterList])
        }

    }, [groupDetail]);


    const handleFormCreate = () => {

        var assignee = getValues("assignee");
        // @ts-ignore
        var assignId:string[] = assignee.map(item => item.id);

        const work = {
            "title": getValues("title"),
            "detail": getValues("detail"),
            "startDay": getValues("startDay"),
            "endDay": getValues("endDay"),
            // @ts-ignore
            "level": getValues("level")?.label.toString(),
            "assignee": assignId,
            "groupId": groupDetail?._id
        }
        // @ts-ignore
        dipatch(createTaskGroup(
            {
                title: work.title,
                detail:work.detail,
                startDay: work.startDay,
                endDay: work.endDay,
                level: work.level,
                assignee: work.assignee,
                groupId: work.groupId
            }
        ))

        reset();
        handleClickCloseForm();

    }

    return (
        <React.Fragment>

            <Dialog
                open={openCreateWork}
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
                                            required: "Phải nhập tiêu đề"
                                        }
                                    )}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    error={!!errors.title}
                                    helperText={(errors.title?.message ?? "").toString()}
                                />
                                <TextField
                                    id="detail"
                                    fullWidth
                                    margin="normal"
                                    required
                                    label="Chi tiết"
                                    variant="outlined"
                                    {...register(
                                        'detail',
                                        {
                                            required: "Phải nhập chi tiết"
                                        }
                                    )}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    error={!!errors.detail}
                                    helperText={(errors.detail?.message ?? "").toString()}
                                />
                                <TextField
                                    id="startDay"
                                    fullWidth
                                    margin="normal"
                                    required
                                    type={"datetime-local"}
                                    label="Ngày bắt đầu"
                                    variant="outlined"
                                    {...register(
                                        'startDay',
                                        {
                                            required: "Phải chọn ngày bắt đầu"
                                        }
                                    )}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    error={!!errors.startDay}
                                    helperText={(errors.startDay?.message ?? "").toString()}
                                />

                                <TextField
                                    id="title"
                                    fullWidth
                                    margin="normal"
                                    required
                                    type={"datetime-local"}
                                    label="Ngày kết thúc"
                                    variant="outlined"
                                    {...register(
                                        'endDay',
                                        {
                                            required: "Phải chọn ngày kết thúc"
                                        }
                                    )}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    error={!!errors.endDay}
                                    helperText={(errors.endDay?.message ?? "").toString()}
                                />

                                <Controller
                                    control={control}
                                    name={"level"}
                                    rules={{required: true}}

                                    render={({field: {onChange, value}}) => {
                                        return (
                                            <Autocomplete
                                                sx={{
                                                    mt: 2
                                                }}
                                                onBlur={async () => {
                                                    await trigger("level")
                                                }}
                                                getOptionLabel={(option) => {
                                                    return option.label
                                                }}
                                                options={listLevelOption}

                                                renderInput={(params) => (
                                                    <TextField {...params} label="Độ ưu tiên"
                                                               error={!!errors.level}
                                                               helperText={errors.level && "Vui lòng chọn độ ưu tiên"}
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
                                                        setValue('level', {id: "", label: ""});
                                                        await trigger("level")
                                                        return ""
                                                    }
                                                    // @ts-ignore
                                                    setValue('level', {id: value.id, label: value.label});
                                                }}
                                            />

                                        )
                                    }}
                                />


                                <Controller
                                    control={control}
                                    name={"assignee"}
                                    rules={{required: true}}

                                    render={({field: {onChange, value}}) => {
                                        return (
                                            <Autocomplete
                                                sx={{
                                                    mt: 2
                                                }}
                                                multiple
                                                onBlur={async () => {
                                                    await trigger("assignee")
                                                }}
                                                getOptionLabel={(option) => {
                                                    return option.label
                                                }}
                                                options={listMember}

                                                renderInput={(params) => (
                                                    <TextField {...params} label="Người thực hiện"
                                                               error={!!errors.assignee}
                                                               helperText={errors.assignee && "Vui lòng chọn người thực hiện"}
                                                               required

                                                    />
                                                )}
                                                isOptionEqualToValue={(option, value) => {
                                                    return option.label === value.label
                                                }
                                                }
                                                onChange={async (e, value) => {
                                                    // @ts-ignore
                                                    setValue('assignee', [...value]);

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
                    <Button type="button" onClick={handleSubmit(handleFormCreate)}>Tạo</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default FormCreateWork;
