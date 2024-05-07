"use client"
import {useForm} from "react-hook-form";
import {BlogInterface} from "@/app/interface/Blog";
import {Box} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {useState} from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {toast} from "react-toastify";


const WriteBlog = () => {

    const {register, handleSubmit, reset, formState} = useForm<BlogInterface>(
        {
            defaultValues: {
                "title": "",
                "id": "",
                "detail": "",
                "creator": {
                    username: "anhkhoa",
                    email: "anhkhoa",
                    phone: "0123456789",
                    admin: false
                }
            }
        }
    )
    const {errors} = formState;
    const [text, setText] = useState<string>("");
    const onChangeText = (event: any, editor: any) => {
        setText(editor.getData())
    }

    const handleWriteBlog = (newBlog: BlogInterface) => {


        if (text) {
            newBlog.detail = text;
            console.log({newBlog});
            reset();
        } else {
            toast.error("Vui lòng nhập nội dung");
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

                        <div style={{marginTop: "10px", marginBottom: "10px", width: "100%"}}>
                            <CKEditor
                                editor={ClassicEditor}
                                config={
                                    {
                                        toolbar: {
                                            items: [
                                                'heading',
                                                '|',
                                                'bold',
                                                'italic',
                                                'link',
                                                'bulletedList',
                                                'numberedList',
                                                'alignment',
                                                'imageUpload',
                                                'blockQuote',
                                                'undo',
                                                'redo'
                                            ]
                                        },
                                        alignment: {
                                            options: ['left', 'right', 'center', 'justify']
                                        },

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

                    <div>
                        <div className="Container" dangerouslySetInnerHTML={{__html: text}}></div>

                    </div>

                </Grid>
            </Grid>


        </div>
    )
}
export default WriteBlog