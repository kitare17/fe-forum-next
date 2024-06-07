import React from 'react';
import {Card, CardHeader, IconButton, Tooltip} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import Grid from "@mui/material/Grid";
import {GroupInterface} from "@/app/interface/GroupInterface";
import {useRouter} from "next/navigation";

const CardGroup = ({array}:{array:GroupInterface[]}) => {
    const router=useRouter();
    const handleJoinGroup=({slug}:{slug:string})=>{
        router.push(`/pages/group/detail/${slug}`);
    }
    return (
        <Grid container spacing={3} p={6} mb={2}>
        {
            [...array??[]].map((group, index) => {
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
                                    <Tooltip title="Tham gia">
                                    <IconButton aria-label="settings" onClick={()=>handleJoinGroup({slug:group.slug})}>
                                        <ElectricBoltIcon />
                                    </IconButton>
                                    </Tooltip>
                                }
                                title={group.groupName}
                                subheader={group.adminGroup.username}
                            />
                        </Card>
                    </Grid>
                )
            })}
        </Grid>
    );
};

export default CardGroup;