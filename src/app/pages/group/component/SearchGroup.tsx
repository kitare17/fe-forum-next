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
const SearchGroup = () => {
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
            <h1>🎓🎓 Danh sách các group️ 🎓🎓</h1>

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
                />
                <IconButton type="button" sx={{p: '10px'}} aria-label="search">
                    <SearchIcon/>
                </IconButton>
            </Paper>


        </Box>


    );
};

export default SearchGroup;