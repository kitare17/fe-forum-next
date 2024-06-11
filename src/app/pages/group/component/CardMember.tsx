"use client"
import React, {useState} from 'react';
import {Box, Card, CardHeader, IconButton, Tooltip} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import Grid from "@mui/material/Grid";
import {useRouter} from "next/navigation";
import {UserInterface} from "@/app/interface/User";
import PersonIcon from '@mui/icons-material/Person';
import RemoveIcon from '@mui/icons-material/Remove';
import {useDispatch} from "react-redux";
import {removeMember} from "@/app/store/action/group";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {GroupInterface} from "@/app/interface/GroupInterface";

const CardMember = ({groupId, members, groupDetail}: {
    groupId: string,
    members: [UserInterface] | undefined,
    groupDetail: GroupInterface
}) => {

    const dipatch = useDispatch();
    const [openRemoveAccept, setOpenRemoveAccept] = useState(false)
    const [userIdRemove, setUserIdRemove] = useState<string>("");

    const handleRemoveMember = ({userId}: { userId: string }) => {
        setOpenRemoveAccept(true);
        setUserIdRemove(userId)
        //@ts-ignore
        // dipatch(removeMember({groupId, userId}));
    }

    const handleCloseRemoveAccept = () => {
        setOpenRemoveAccept(false);
        setUserIdRemove("")
    }

    const hanldeRemoveMember = () => {
        //@ts-ignore
        dipatch(removeMember({groupId, userId: userIdRemove}));
        setOpenRemoveAccept(false);
    }

    return (<>
            <h4>Trưởng nhóm </h4>
            <Grid container spacing={3} p={6} mb={2}>
                <Grid  item lg={4} xs={12} md={6}>
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
                                <Tooltip title="Trưỏng nhóm">
                                    <IconButton aria-label="settings"
                                                // onClick={() => handleRemoveMember({userId: user._id})}
                                    >
                                        ⭐
                                    </IconButton>
                                </Tooltip>
                            }
                            title={groupDetail.adminGroup.fullname}
                            subheader={groupDetail.adminGroup.username}
                        />
                    </Card>
                </Grid>
            </Grid>
            <h4>Thành viên của nhóm ({members?.length})</h4>
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
                                                            onClick={() => handleRemoveMember({userId: user._id})}
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

            {/*modal accept to delete*/}
            <Dialog
                open={openRemoveAccept}
                onClose={handleCloseRemoveAccept}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "700px",  // Set your width here
                        },
                    },
                }}
                maxWidth="lg"
            >
                <DialogTitle>Xóa thành viên này </DialogTitle>
                <DialogContent>
                    <p> Bạn có muốn xóa thành viên này không. Hành động này sẽ không đươc hoàn tác</p>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCloseRemoveAccept}>Hủy</Button>
                    <Button type="button"
                            onClick={() => hanldeRemoveMember()}
                    >Xóa</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CardMember;