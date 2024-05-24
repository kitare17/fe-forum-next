"use client"
import * as React from 'react';
import {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import Avatar from "@mui/material/Avatar";
import {Card, CardHeader, Tooltip} from '@mui/material';
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Divider from "@mui/material/Divider";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/store";
import {toast} from "react-toastify";
import {addNewComment, findOneBlog, likeBlog, unlikeBlog} from "@/app/store/action/blog";
import {useParams, useRouter} from "next/navigation";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// @ts-ignore
import DOMPurify from 'dompurify';
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import ReplyIcon from '@mui/icons-material/Reply';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from '@mui/icons-material/Edit';
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FlagIcon from '@mui/icons-material/Flag';
import ReportBlogDialog from "@/app/pages/blog/component/ReportBlogDialog";
import ReportCommentDialog from "@/app/pages/blog/component/ReportCommentDialog";

const Blog = () => {

    const router = useRouter();

    const dipatch = useDispatch();

    const {user} = useSelector((state: RootState) => state.auth);
    //Get param
    const {blogId}: { blogId: string } = useParams();


    //Add comment
    const [text, setText] = useState<string>("");
    const onChangeText = (event: any, editor: any) => {
        setText(editor.getData())
    }
    const handleComment = () => {
        const userComment = user?.userEmailId ?? "";
        // @ts-ignore
        dipatch(addNewComment({blogId, detail: text, userComment}))
        setText("")

    }

    //Fetch data
    const {
        blogDetail,
        isLike,
        isLoading,
        isError,
        isSuccess,
        message
    } =
        useSelector((state: RootState) => state.blog);
    useEffect(() => {
        // @ts-ignore
        dipatch(findOneBlog(blogId));

    }, [])

    useEffect(() => {
        if (isLoading)
            toast.info("Đang tải thông tin")
        if (isError)
            toast.error("lỗi rồi")
        if (isSuccess)
            toast.success(message)

    }, [isLoading, isError, isSuccess])

    const handleLikeState = () => {

        if (!isLike) {
            // @ts-ignore
            dipatch(likeBlog({blogId}))
        } else {
            // @ts-ignore
            dipatch(unlikeBlog({blogId}))
        }
    };


    //reply comment dialog
    const [replyDialog, setDialog] = React.useState(false);

    const handleReplyOpen = () => {
        setDialog(true);
    };

    const handleReplyClose = () => {
        setDialog(false);
    };


    //Menu main post
    const [menuMain, setMenuMain] = React.useState<null | HTMLElement>(null);
    const openMenuMain = Boolean(menuMain);
    const handleMenuMainOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMenuMain(event.currentTarget);
    };
    const handleMenuMainClose = () => {
        setMenuMain(null);
    };


    //Menu comment post
    const [menuComment, setMenuComment] = React.useState<null | HTMLElement>(null);
    const openMenuComment = Boolean(menuComment);

    const handleMenuCommentOpen = (event: React.MouseEvent<HTMLButtonElement>, commentId: string) => {
        setMenuComment(event.currentTarget);
        setCommentIdReport(commentId);
    };
    const handleMenuCommentClose = () => {
        setMenuComment(null);
    };

    //state report blog form
    const [openFormBlogReport, setOpenFormBlogReport] = useState<boolean>(false);


    //Handle edit / report main post
    const handleEditMainPost = () => {
        alert("hanldEditMainPost ");

    }
    const handleReportMainPost = () => {
        setOpenFormBlogReport(true)
    }


    //state report comment form
    const [openFormCommentReport, setOpenFormCommentReport] = useState<boolean>(false);
    const [commentIdReport, setCommentIdReport] = useState<string>("");


    //Handle edit / report comment
    const handleEditComment = () => {
        alert("hanldEditComment");

    }
    const handleReportComment = () => {
        setOpenFormCommentReport(true);

    }

    const handleShare = () => {
        toast.success("Đã copy vào clipboard chia sẻ cho bạn bè nhé 😍😍😍");

        navigator.clipboard.writeText(window.location.href);
    }


    return (
        <Grid container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}

              pt={5}
              pb={5}
              sx={{bgcolor: '#f0eded'}}
        >
            <Grid item xs={10}>
                <Button
                    variant="outlined"
                    onClick={() => router.back()}
                >
                    <ArrowBackIcon/> Trở vể
                </Button>

            </Grid>
            <Grid item xs={10}>
                <Card sx={{width: "100%"}}>
                    <CardHeader
                        avatar={
                            <Avatar src="https://gaming.vn/wp-content/uploads/2024/01/Solo-Leveling.jpg" sx={{
                                width: 70,
                                height: 70
                            }} aria-label="recipe">

                            </Avatar>
                        }
                        action={
                            <IconButton
                                id="menu-main-btn"
                                onClick={handleMenuMainOpen}
                                aria-controls={openMenuMain ? 'menu-main' : undefined}
                                aria-haspopup="true"
                                aria-expanded={openMenuMain ? 'true' : undefined}
                            >

                                <MoreVertIcon/>

                            </IconButton>
                        }
                        title={`${blogDetail?.creator?.fullname} (${blogDetail?.creator?.username})`}
                        // @ts-ignore
                        subheader={`Đăng ngày ${new Date(blogDetail?.createdAt).getDate()}/${new Date(blogDetail?.createdAt).getMonth() + 1}/${new Date(blogDetail?.createdAt).getFullYear()}`}

                    />

                    <CardContent
                        sx={{padding: "30px"}}
                    >
                        <div className="Container"
                             dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(blogDetail?.detail)}}></div>
                    </CardContent>
                    <Divider/>
                    <CardActions disableSpacing>
                        <IconButton
                            onClick={handleLikeState}
                            aria-label="add to favorites">
                            {!isLike && <FavoriteIcon/>}
                            {isLike && <FavoriteIcon style={{color: "#eb1b0c"}}/>}
                        </IconButton>
                        <Tooltip title="Nhấn để copy đường link">
                            <IconButton aria-label="share" onClick={handleShare}>
                                <ShareIcon/>
                            </IconButton>
                        </Tooltip>
                    </CardActions>

                    <Divider/>

                    <Grid container
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          spacing={2}
                          mt={2}
                          mb={9}
                    >

                        <Grid item xs={11}>
                            <Typography variant="h5">
                                Bình luận
                            </Typography>
                            <div style={{marginTop: "10px", marginBottom: "10px", width: "100%"}}>
                                <CKEditor
                                    editor={ClassicEditor}
                                    config={
                                        {
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

                            <Button onClick={handleComment} variant="contained" endIcon={<SendIcon/>}>
                                Bình luận
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          spacing={2}
                          mt={2}
                          mb={9}
                    >

                        {
                            [...(blogDetail.comments ?? [])].toReversed().map((comment) => {
                                    return (

                                        <Grid
                                            key={comment._id}
                                            item xs={11}>
                                            <Card sx={{width: "100%"}}>
                                                <CardHeader
                                                    avatar={
                                                        <Avatar
                                                            src="https://gaming.vn/wp-content/uploads/2024/01/Solo-Leveling.jpg"
                                                            sx={{
                                                                width: 70,
                                                                height: 70
                                                            }} aria-label="recipe">

                                                        </Avatar>
                                                    }
                                                    action={
                                                        <IconButton
                                                            id="menu-comment-btn"
                                                            onClick={(e) => handleMenuCommentOpen(e, comment._id)}
                                                            aria-controls={openMenuComment ? 'menu-comment' : undefined}
                                                            aria-haspopup="true"
                                                            aria-expanded={openMenuComment ? 'true' : undefined}
                                                        >
                                                            <MoreVertIcon/>
                                                        </IconButton>
                                                    }
                                                    title={`${comment?.userComment?.fullname} (${comment?.userComment?.username})`}
                                                    subheader={`Bình luận ngày ${new Date(comment?.createdAt).getDate()}/${new Date(comment?.createdAt).getMonth() + 1}/${new Date(comment?.createdAt).getFullYear()}`}

                                                />
                                                <CardContent>


                                                    <div className="Container"
                                                         dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(comment?.detail)}}></div>

                                                </CardContent>
                                                <Divider/>
                                                <CardActions>
                                                    <ReplyIcon onClick={handleReplyOpen}/>
                                                </CardActions>
                                            </Card>
                                            {comment.replyComment.length>0 && <Card sx={{width: "100%"}}>
                                                <Grid container
                                                      direction="row"
                                                      justifyContent="center"
                                                      alignItems="center"
                                                      spacing={2}
                                                      mt={2}
                                                     p={3}
                                                      sx={{bgcolor: '#f0eded'}}
                                                >
                                                    {
                                                        [...(comment.replyComment ?? [])].toReversed().map((replyCmt) => {
                                                            return (
                                                                <Card sx={{width: "80%",marginBottom:"10px"}} key={replyCmt._id} >
                                                                    <CardHeader
                                                                        avatar={
                                                                            <Avatar
                                                                                src="https://gaming.vn/wp-content/uploads/2024/01/Solo-Leveling.jpg"
                                                                                sx={{
                                                                                    width: 70,
                                                                                    height: 70
                                                                                }} aria-label="recipe">

                                                                            </Avatar>
                                                                        }
                                                                        // action={
                                                                        //     <IconButton
                                                                        //         id="menu-comment-btn"
                                                                        //         onClick={(e) => handleMenuCommentOpen(e, comment._id)}
                                                                        //         aria-controls={openMenuComment ? 'menu-comment' : undefined}
                                                                        //         aria-haspopup="true"
                                                                        //         aria-expanded={openMenuComment ? 'true' : undefined}
                                                                        //     >
                                                                        //         <MoreVertIcon/>
                                                                        //     </IconButton>
                                                                        // }
                                                                        title={`${replyCmt?.userComment?.fullname} (${replyCmt?.userComment?.username})`}
                                                                        subheader={`Bình luận ngày ${new Date(replyCmt?.createdAt).getDate()}/${new Date(replyCmt?.createdAt).getMonth() + 1}/${new Date(replyCmt?.createdAt).getFullYear()}`}

                                                                    />
                                                                    <CardContent>
                                                                        <p>{replyCmt.detail}</p>
                                                                    </CardContent>
                                                                </Card>
                                                            )
                                                        })
                                                    }

                                                </Grid>

                                            </Card>}
                                        </Grid>
                                    )
                                }
                            )}


                    </Grid>
                </Card>
            </Grid>


            {/*Reply dialog*/}
            <Dialog
                open={replyDialog}
                onClose={handleReplyClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());
                        const email = formJson.email;
                        console.log(email);
                        handleReplyClose();
                    },
                }}
            >
                <DialogTitle>Trả lời bình luận</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Nhập bình luận ở bên dưới nhé 🤗🤗🤗
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="email"
                        label="Bình luận"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleReplyClose}>Hủy</Button>
                    <Button type="submit">Bình luận</Button>
                </DialogActions>
            </Dialog>


            {/*Menu main*/}
            <Menu
                id="menu-main"
                anchorEl={menuMain}
                open={openMenuMain}
                onClose={handleMenuMainClose}
                MenuListProps={{
                    'aria-labelledby': 'menu-main-btn',
                }}
            >
                <MenuItem onClick={handleEditMainPost}>
                    <ListItemIcon>
                        <EditIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Chỉnh sửa"/>
                </MenuItem>
                <MenuItem onClick={handleReportMainPost}>
                    <ListItemIcon>
                        <FlagIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Báo cáo"/>
                </MenuItem>
            </Menu>


            {/*Menu comment*/}
            <Menu
                id="menu-comment"
                anchorEl={menuComment}
                open={openMenuComment}
                onClose={handleMenuCommentClose}
                MenuListProps={{
                    'aria-labelledby': 'menu-comment-btn',
                }}
            >
                <MenuItem onClick={handleEditComment}>
                    <ListItemIcon>
                        <EditIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Chỉnh sửa"/>
                </MenuItem>
                <MenuItem onClick={handleReportComment}>
                    <ListItemIcon>
                        <FlagIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Báo cáo"/>
                </MenuItem>
            </Menu>

            <ReportBlogDialog blogId={blogId} openFormBlogReport={openFormBlogReport}
                              setOpenFormBlogReport={setOpenFormBlogReport}/>

            <ReportCommentDialog blogId={blogId} setOpenFormCommentReport={setOpenFormCommentReport}
                                 openFormCommentReport={openFormCommentReport}
                                 commentId={commentIdReport}
            />
        </Grid>
    )
}

export default Blog;