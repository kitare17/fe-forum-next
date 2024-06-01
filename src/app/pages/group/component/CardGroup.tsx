import React from 'react';
import {Card, CardHeader, IconButton} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import Grid from "@mui/material/Grid";

const CardGroup = ({array}:{array:any[]}) => {
    return (
        <Grid container spacing={3} p={6} mb={2}>
        {
            array.map((com, index) => {
                return (
                    <Grid key={index} item lg={4} xs={12} md={6}>
                        <Card >
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe" sx={{
                                        background:"#fda401"
                                    }} >
                                        ✍️
                                    </Avatar>
                                }
                                action={
                                    <IconButton aria-label="settings">
                                        <ElectricBoltIcon />
                                    </IconButton>
                                }
                                title="CardHeader Example"
                                subheader="A flexbox with avatar, title, subtitle and action"
                            />
                        </Card>
                    </Grid>
                )
            })}
        </Grid>
    );
};

export default CardGroup;