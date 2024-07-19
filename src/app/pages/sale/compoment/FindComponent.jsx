"use client"
import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import Box from "@mui/material/Box";
import {useDispatch} from "react-redux";
import {searchProduct} from "@/app/store/action/sale";
import {useForm} from "react-hook-form";
import {BlogInterface} from "@/app/interface/Blog";
import {useRouter} from "next/navigation";

const FindComponent = () => {

    const dipatch = useDispatch();
    const router = useRouter();

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
                "groupName": "",
            }
        }
    )
    const handleFindGroup = () => {
        var groupName = getValues("groupName")
        router.push(`/pages/sale?page=${1}&title=${groupName}`)
        alert(groupName)
    }
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: "center",
                m: 1,
                p: 1,
                bgcolor: 'background.paper',
                borderRadius: 1,
                height: "150px"
            }}
        >

            <Paper
                component="form"
                sx={
                    {p: '2px 4px', display: 'flex', alignItems: 'center', width: 400}
                }

            >

                <InputBase
                    sx={{ml: 1, flex: 1}}
                    placeholder="Tìm kiếm group"
                    inputProps={{'aria-label': 'Tìm kiếm group'}}
                    {...register(
                        'groupName'
                    )}
                />
                <IconButton type="button" sx={{p: '10px'}} aria-label="search">
                    <SearchIcon onClick={() => handleFindGroup()}/>
                </IconButton>
            </Paper>


        </Box>


    );
};

export default FindComponent;