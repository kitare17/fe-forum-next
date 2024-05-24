"use client"
import {Controller, useForm} from "react-hook-form";
import {BlogInterface} from "@/app/interface/Blog";
import {Autocomplete, Box} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import {RootState} from "@/app/store";
import {findAllTopic} from "@/app/store/action/topic";
import {createBlog} from "@/app/store/action/blog";


const WriteBlog = () => {
    const router = useRouter();

    const {listTopic, isLoading, isError} = useSelector((state: RootState) => state.topic);
    const {user} = useSelector((state: RootState) => state.auth);
    const [listTopicOption, setListTopicOptions] = useState<any[]>([]);
    useEffect(() => {
        // @ts-ignore
        dipatch(findAllTopic());
    }, [])


    useEffect(() => {
        if (listTopicOption.length == 0) {
            var optionChoice: any[] = [];
            [...listTopic ?? []].map(
                (topic) => {
                    optionChoice = [...optionChoice, {
                        label: topic.title,
                        id: topic._id
                    }
                    ];
                }
            )
            // @ts-ignore
            setListTopicOptions([...listTopicOption, ...optionChoice]);
        }

    }, [listTopic]);
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
                "title": "",
                "_id": "",
                "detail": "",
                "topic": ""
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

    const handleWriteBlog = () => {
        const newBlog = {
            title: getValues("title"),
            id: getValues("_id"),
            detail: getValues("detail"),
            topic: getValues("topic").id,
        }
        const creator=user?.userEmailId ?? "";
        console.log(newBlog.topic)
        if (text && newBlog.topic) {
            newBlog.detail = text
                .replace("<figure class=\"image image-style-side\">", "<figure style=\"text-align: center;\" class=\"image image-style-side\">")
                .replace("<figure class=\"image\"", "<figure class=\"image\" style=\"text-align: center;\"");

            console.log(newBlog)
            // @ts-ignore
            dipatch(createBlog({newBlog,creator}));
            setText("")

            reset();

            router.replace("/");

        } else {
            if (!text) toast.error("Vui lòng nhập nội dung");
            if (!newBlog.topic) toast.error("Vui lòng chọn thể loại");
        }

    }


    return (
        <div>

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
                        onSubmit={handleSubmit(handleWriteBlog)}
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
                        <Controller
                            control={control}
                            name={"topic"}
                            // rules={{required: true}}
                            render={({field: {onChange, value}}) => {
                                return (
                                    <Autocomplete
                                        onBlur={async () => {
                                            await trigger("topic")
                                        }}
                                        getOptionLabel={(option) => {
                                            return option.label
                                        }}
                                        options={listTopicOption}

                                        renderInput={(params) => (
                                            <TextField {...params} label="Thể loại"/>
                                        )}
                                        isOptionEqualToValue={(option, value) => {
                                            return option.label === value.label
                                        }
                                        }
                                        onChange={async (e, value) => {
                                            if (!value) {
                                                setValue('topic', {id: "", label: ""});
                                                await trigger("topic")
                                                return ""
                                            }
                                            setValue('topic', {id: value.id, label: value.label});
                                        }}
                                    />

                                )
                            }}


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


                        <Button type="submit" variant="contained">Tạo</Button>
                    </Box>

                    {/*<div>*/}
                    {/*    <div className="Container" dangerouslySetInnerHTML={{__html: text}}></div>*/}

                    {/*</div>*/}

                </Grid>
            </Grid>


        </div>
    )
}

export default WriteBlog