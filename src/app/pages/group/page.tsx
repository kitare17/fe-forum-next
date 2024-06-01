"use client"
import React from 'react';
import SearchGroup from "@/app/pages/group/component/SearchGroup";
import CardGroup from "@/app/pages/group/component/CardGroup";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
const GroupPage = () => {

    const array = [1, 2, 3, 5, 4, 8, 41, 8, 6];
    return (
        <>
            <SearchGroup/>
            <CardGroup array={array} />


            <Grid item xs={10}
                  sx={{
                      display: 'flex',
                      justifyContent: 'center'
                  }}
                  mb={2}
            >
                <Pagination
                   // onChange={handlePaging}
                    count={10}
                    defaultPage={1}
                    siblingCount={1}
                    size="large"
                    showLastButton
                    showFirstButton/>
            </Grid>
        </>
    );
};

export default GroupPage;

