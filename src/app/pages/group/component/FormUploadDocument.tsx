"use client"
import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import {TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {createDocGroup, createNotification, deleteDocGroup, getDocGroup} from "@/app/store/action/group";
import {toast} from "react-toastify";
import Button from "@mui/material/Button";
import {RootState} from "@/app/store";
import Link from "next/link";
import Image from 'next/image'
import Grid from "@mui/material/Grid";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';





const FormUploadDocument = ({groupId,admin}: { groupId: string,admin:string }) => {
    const {listDoc, isLoading, isError,message} = useSelector((state: RootState) => state.group);

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
                "docName": "",
                "linkFile": "",
            }
        }
    )
    const {errors} = formState;

    const [file, setFile] = useState<any>(false);
    const handleInputChange = (event: any) => {
        setFile(event.target.files[0]);
        let formData = new FormData();
        formData.append("file", event.target.files[0]);
        axios({
            method: "post",
            url: "http://localhost:8080/minio/upload",
            data: formData
        }).then(({data}) => {
            console.log("Succesfully uploaded: ", data?.link.toString());
            setValue("linkFile", data?.link.toString())
        });
    };


    const handleFormCreate = () => {
        const docName = getValues("docName");
        const linkFile = getValues("linkFile");
        const linkDown = "http://localhost:8080/minio/download" + linkFile.substring(linkFile.indexOf("/commons"));
        alert(groupId + " " + docName + " " + linkDown);
        //@ts-ignore
        dipatch(createDocGroup({docName: docName, link: linkDown, group: groupId}))

        reset();
        setFile(null);
    }


    useEffect(() => {
        //@ts-ignore
        dipatch(getDocGroup({groupId: groupId}))
    }, []);


    const handleDocIcon = (link: string | undefined) => {
        var imgUrl;
        if (link?.endsWith(".svg")) {
            imgUrl = "https://img.icons8.com/?size=50&id=60lvtpcdN1Ff&format=png";
        } else if (link?.endsWith(".png")) {
            imgUrl = "https://img.icons8.com/?size=256&id=13410&format=png";

        } else if (link?.endsWith(".jpg") || link?.endsWith(".jpeg")) {
            imgUrl = "https://img.icons8.com/?size=256&id=PtYlif3xemQi&format=png";

        } else if (link?.endsWith(".pdf")) {
            imgUrl = "https://img.icons8.com/?size=96&id=13417&format=png";

        } else if (link?.endsWith(".docx")) {
            imgUrl = "https://img.icons8.com/?size=96&id=30464&format=png";

        } else if (link?.endsWith(".xlsx")) {
            imgUrl = "https://img.icons8.com/?size=256&id=13425&format=png";

        } else if (link?.endsWith(".pptx")) {
            imgUrl = "https://img.icons8.com/?size=96&id=ifP93G7BXUhU&format=png";

        } else {
            imgUrl = "https://img.icons8.com/?size=256&id=11651&format=png";

        }
        return (
            <Image
                src={imgUrl}
                width={50}
                height={50}
                alt="Picture of file"
            />
        )
    }



    //modal remove state
    const [docDeleteId,setDocDeleteId]=useState("")

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
        setDocDeleteId("");
    };
    const handleClickOpen = (docId:string) => {
        setOpen(true);
        setDocDeleteId(docId)

    };


    useEffect(() => {
        if(message){
            toast.success(message)
        }
    }, [message]);

    const handleRemoveDoc =()=>{
        //@ts-ignore
        dipatch(deleteDocGroup({groupId:groupId,docId:docDeleteId}))
        handleClose();
    }
    return (
        <div>

            <TextField
                sx={{
                    mb: 2
                }}
                id="title"
                fullWidth
                margin="normal"
                required
                label="Tên tài liệu"
                variant="outlined"
                {...register(
                    'docName',
                    {
                        required: "Phải nhập tên tài liệu"
                    }
                )}
                error={!!errors.docName}
                helperText={(errors.docName?.message ?? "").toString()}
            />

            <TextField
                sx={{
                    mb: 2
                }}
                type="file" fullWidth onChange={handleInputChange} id="fullWidth"/>

            <Button type="button" variant="contained" onClick={handleSubmit(handleFormCreate)}>Tạo</Button>
            <br/>
            <br/>
            <h4>Danh sách các tài liệu</h4>
            {
                [...listDoc ?? []].map((doc) => {
                    return (
                        <Grid container
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center" key={doc._id}
                              style={
                                  {
                                      background: "#CCCCCC",
                                      margin: "10px",
                                      padding: "5px"
                                  }
                              }
                        >
                            <Link href={doc.link + ""}>
                                {handleDocIcon(doc.link)}
                                {doc.docName}</Link>

                            <Button variant="text" onClick={()=>handleClickOpen(doc._id??"")}>
                                <Image src="https://img.icons8.com/?size=96&id=7QxI0RBW4NzS&format=png"
                                       width={20}
                                       height={20}
                                       alt="remove"/>
                            </Button>

                        </Grid>

                    )
                })
            }


            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Xóa tài liệu này {docDeleteId}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn có muốn xóa tài liệu này không, hành động này sẽ không được hoàn tác
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button onClick={handleRemoveDoc} className="text-danger" autoFocus>
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default FormUploadDocument