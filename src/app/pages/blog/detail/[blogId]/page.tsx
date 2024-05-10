"use client"

import * as React from 'react';
import {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import Avatar from "@mui/material/Avatar";
import {Card, CardHeader, Collapse} from '@mui/material';
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
import {addNewComment, findOneBlog} from "@/app/store/action/blog";
import {useParams} from "next/navigation";

// @ts-ignore
import DOMPurify from 'dompurify';
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";


const Blog = () => {


    const dipatch = useDispatch();
    //Get param
    const {blogId} = useParams();


    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    //Add comment
    const [text, setText] = useState<string>("");
    const onChangeText = (event: any, editor: any) => {
        setText(editor.getData())
    }
    const handleComment=()=>{
        // @ts-ignore
        dipatch(addNewComment({blogId,detail:text}))
    }


    //Fetch data
    const {blogDetail, comments, isLoading, isError} = useSelector((state: RootState) => state.blog);
    useEffect(() => {
        // @ts-ignore
        dipatch(findOneBlog(blogId));

    }, [])

    useEffect(() => {
        if (isLoading)
            toast.info("Đang tải thông tin")
        if (isError)
            toast.error("lỗi rồi")
    }, [isLoading, isError])



    return (
        <Grid container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              mt={4}
              mb={9}
        >
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
                            <IconButton aria-label="settings">
                                <MoreVertIcon/>
                            </IconButton>
                        }
                        title={`${blogDetail?.creator?.fullname} (${blogDetail?.creator?.username})`}
                        // @ts-ignore
                        subheader={`Đăng ngày ${new Date(blogDetail?.createdAt).getDate()}/${new Date(blogDetail?.createdAt).getMonth() + 1}/${new Date(blogDetail?.createdAt).getFullYear()}`}

                    />

                    <CardContent>


                        <div className="Container"
                             dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(blogDetail?.detail)}}></div>

                    </CardContent>
                    <Divider/>
                    <CardActions disableSpacing>

                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon/>
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon/>
                        </IconButton>
                        {/*<ExpandMore*/}
                        {/*    expand={expanded}*/}
                        {/*    onClick={handleExpandClick}*/}
                        {/*    aria-expanded={expanded}*/}
                        {/*    aria-label="show more"*/}
                        {/*>*/}
                        {/*    <ExpandMoreIcon />*/}
                        {/*</ExpandMore>*/}
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>Method:</Typography>
                            <Typography paragraph>
                                Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                                aside for 10 minutes.
                            </Typography>
                            <Typography paragraph>
                                Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                                medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                                occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                                large plate and set aside, leaving chicken and chorizo in the pan. Add
                                pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                                stirring often until thickened and fragrant, about 10 minutes. Add
                                saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                            </Typography>
                            <Typography paragraph>
                                Add rice and stir very gently to distribute. Top with artichokes and
                                peppers, and cook without stirring, until most of the liquid is absorbed,
                                15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                                mussels, tucking them down into the rice, and cook again without
                                stirring, until mussels have opened and rice is just tender, 5 to 7
                                minutes more. (Discard any mussels that don&apos;t open.)
                            </Typography>
                            <Typography>
                                Set aside off of the heat to let rest for 10 minutes, and then serve.
                            </Typography>
                        </CardContent>
                    </Collapse>
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

                            <Button onClick={handleComment} variant="contained" endIcon={<SendIcon />}>
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
                                    <>
                                        <Grid item xs={11}>
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
                                                            <IconButton aria-label="settings">
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
                                                </Card>
                                            </Grid>
                                        </>

                                    )
                                }
                            )}


                    </Grid>
                </Card>
            </Grid>

        </Grid>
    )
}

export default Blog;