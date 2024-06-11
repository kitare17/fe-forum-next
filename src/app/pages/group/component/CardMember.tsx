import React from 'react';
import {Card, CardHeader, IconButton, Tooltip} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import Grid from "@mui/material/Grid";
import {useRouter} from "next/navigation";
import {UserInterface} from "@/app/interface/User";
import PersonIcon from '@mui/icons-material/Person';
import RemoveIcon from '@mui/icons-material/Remove';
const CardMember = ({members}: { members: [UserInterface] | undefined }) => {
    const router = useRouter();
    const handleJoinGroup = ({slug}: { slug: string }) => {
        router.push(`/pages/group/detail/${slug}`);
    }


    return (
        <Grid container spacing={3} p={6} mb={2}>
            {
                [...members ?? []].map((user, index) => {
                    return (
                        <Grid key={index} item lg={4} xs={12} md={6}>
                            <Card>
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="recipe" sx={{
                                            background: "#fda401"
                                        }}>
                                            <PersonIcon/>
                                        </Avatar>
                                    }
                                    action={
                                        <Tooltip title="Xoá thành viên">
                                            <IconButton aria-label="settings"
                                                // onClick={()=>handleJoinGroup({slug:group.slug})}
                                            >
                                                <RemoveIcon/>
                                            </IconButton>
                                        </Tooltip>
                                    }
                                    title={user.fullname}
                                    subheader={user.username}
                                />
                            </Card>
                        </Grid>
                    )
                })}
        </Grid>
    );
};

export default CardMember;