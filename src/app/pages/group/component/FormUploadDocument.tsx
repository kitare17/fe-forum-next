"use client"
import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import {TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {createDocGroup, createNotification, getDocGroup} from "@/app/store/action/group";
import {toast} from "react-toastify";
import Button from "@mui/material/Button";
import {RootState} from "@/app/store";
import Link from "next/link";
import Image from 'next/image'

const FormUploadDocument = ({groupId}: { groupId: string }) => {
    const {listDoc, isLoading, isError} = useSelector((state: RootState) => state.group);

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


    const handleDocIcon = (link: string|undefined) => {
        var imgUrl;
        if (link?.endsWith(".svg")) {
            imgUrl="https://img.icons8.com/?size=50&id=60lvtpcdN1Ff&format=png";
        } else if (link?.endsWith(".png")) {
            imgUrl="https://img.icons8.com/?size=256&id=13410&format=png";

        } else if (link?.endsWith(".jpg") || link?.endsWith(".jpeg")) {
            imgUrl="https://img.icons8.com/?size=256&id=PtYlif3xemQi&format=png";

        } else if (link?.endsWith(".pdf")) {
            imgUrl="https://img.icons8.com/?size=96&id=13417&format=png";

        } else if (link?.endsWith(".docx")) {
            imgUrl="https://img.icons8.com/?size=96&id=30464&format=png";

        } else if (link?.endsWith(".xlsx")) {
            imgUrl="https://img.icons8.com/?size=256&id=13425&format=png";

        } else if (link?.endsWith(".pptx")) {
            imgUrl="https://img.icons8.com/?size=96&id=ifP93G7BXUhU&format=png";

        } else {
            imgUrl="https://img.icons8.com/?size=256&id=11651&format=png";

        }
        return(
            <Image
                src={imgUrl}
                width={50}
                height={50}
                alt="Picture of file"
            />
        )
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

            {
                [...listDoc ?? []].map((doc) => {
                    return (
                        <div key={doc._id}>
                            <Link href={doc.link + ""}>
                                {handleDocIcon(doc.link)}
                                {doc.docName}</Link>
                        </div>
                    )
                })
            }

        </div>
    );
};
export default FormUploadDocument