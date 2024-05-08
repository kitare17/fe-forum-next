"use client"

import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from "@mui/material/Avatar";
import {CardHeader, CardMedia, Collapse, IconButtonProps} from '@mui/material';
import { Card } from '@mui/material';
import {red} from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useEffect, useState} from "react";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/store";
import {fetchUsers} from "@/app/store/action/user";
import {toast} from "react-toastify";
import {findOneBlog} from "@/app/store/action/blog";
import {useParams} from "next/navigation";





const Blog = () => {
    const {blogId}=useParams();


    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const dipatch = useDispatch();
    const {blogDetail, isLoading, isError} = useSelector((state:RootState) => state.blog);

    useEffect(()=>{
        // @ts-ignore
        dipatch(findOneBlog(blogId));
    },[])

    useEffect(()=>{
        if(isLoading)
            toast.info("Đang tải thông tin")
        if(isError)
            toast.error("lỗi rồi")
    },[isLoading,isError])

    const handleClick = () => {
        // @ts-ignore
        dipatch(fetchUsers());
        toast.success("ok");
    }


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
                <Card sx={{ width:"100%"}}>
                    <CardHeader
                        avatar={
                            <Avatar src="https://gaming.vn/wp-content/uploads/2024/01/Solo-Leveling.jpg" sx={{
                                width:70,
                                height:70
                            }} aria-label="recipe">

                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={ `${blogDetail?.creator?.fullname} (${blogDetail?.creator?.username})`}
                        // @ts-ignore
                        subheader={`Đăng ngày ${new Date(blogDetail?.createdAt).getDate()}/${new Date(blogDetail?.createdAt).getMonth() + 1}/${new Date(blogDetail?.createdAt).getFullYear()}` }

                    />

                    <CardContent>

                        <div className="Container"
                             dangerouslySetInnerHTML={{__html: blogDetail?.detail}}></div>

                    </CardContent>
                    <Divider />
                    <CardActions disableSpacing>

                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
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
                    <Divider />
                    <Grid container
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          spacing={2}
                          mt={2}
                          mb={9}
                    >
                        <Grid item xs={11}>
                            <Card sx={{ width:"100%"}}>
                                <CardHeader
                                    avatar={
                                        <Avatar src="https://gaming.vn/wp-content/uploads/2024/01/Solo-Leveling.jpg" sx={{
                                            width:70,
                                            height:70
                                        }} aria-label="recipe">

                                        </Avatar>
                                    }
                                    action={
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon />
                                        </IconButton>
                                    }
                                    title={blogDetail?.creator?.fullname}
                                    subheader=" This impressive paella is a perfect party dish and a fun meal to cook
                                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                                    if you like."
                                />
                            </Card>
                        </Grid>
                        <Grid item xs={11}>
                            <div className="bg-danger">
                                kk
                            </div>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>

        </Grid>
    )
}

export default Blog;