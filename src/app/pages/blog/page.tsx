"use client"
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {FiCard, FiCardActionArea, FiCardActions, FiCardContent, FiCardMedia} from "./component/BlogCard";
import React, {useEffect} from "react";
import {makeStyles} from "@mui/styles";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/store";
import {fetchUsers} from "@/app/store/action/user";
import {toast} from "react-toastify";
import {findAllTopic} from "@/app/store/action/topic";
import Grid from "@mui/material/Grid";


const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    /**
     * Max Card with for demo
     * same values used in Material-Ui Card Demos
     */
    card: {

        height:160
    },

    /**
     * Applied to Orginal Card demo
     * Same vale used in Material-ui Card Demos
     */
    media: {
        height: 140
    },

    /**
     * Demo stlying to inclrease text visibility
     * May verry on implementation
     */
    fiCardContent: {
        color: "#ffffff",
        backgroundColor: "rgba(0,0,0,.24)"
    },
    fiCardContentTextSecondary: {
        color: "rgba(255,255,255,0.78)"
    },
    cardContent:{

        height:160
    }
});



const Blog = () => {
    const dipatch = useDispatch();
    const {listTopic, isLoading, isError} = useSelector((state:RootState) => state.topic);

    useEffect(()=>{
        // @ts-ignore
        dipatch(findAllTopic());
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
    // @ts-ignore
    const classes = useStyles();
    return (
        <div >
            <h1 style={{textAlign:'center',marginTop:"10px"}}>Các chủ đề được quan tâm</h1>
            <Grid container spacing={2} mt={2} mb={2}>
                {
                    [...( listTopic?? [])].map((topic) => {
                        return(

                            <Grid item
                                  md={6}
                                  xs={12}
                                  sm={12}
                                  key={topic._id}
                                  sx={{ display: 'flex',justifyContent: 'center' }}
                            >
                                <Box width={"50%"}
                                height={"100%"}
                                >
                                    <FiCard
                                        className={classes.card}>
                                        <FiCardActionArea className={classes.cardContent}>
                                            <FiCardMedia
                                                image={topic.imgUrl}
                                                title="Contemplative Reptile"
                                            />
                                            <FiCardContent className={classes.fiCardContent}>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {topic.title}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    className={classes.fiCardContentTextSecondary}
                                                    component="p"
                                                >
                                                    {topic.detail}
                                                </Typography>
                                            </FiCardContent>
                                        </FiCardActionArea>
                                    </FiCard>
                                </Box>

                            </Grid>
                        )
                    })
                }



            </Grid>










            {/*<Box my={4}>*/}
            {/*    <FiCard className={classes.card}>*/}
            {/*        <FiCardMedia*/}
            {/*            alt="Contemplative Reptile"*/}
            {/*            image="https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?cs=srgb&dl=pexels-pixabay-301920.jpg&fm=jpg"*/}
            {/*            title="Contemplative Reptile"*/}
            {/*        />*/}
            {/*        <FiCardContent className={classes.fiCardContent}>*/}
            {/*            <Typography gutterBottom variant="h5" component="h2">*/}
            {/*                Lizard*/}
            {/*            </Typography>*/}
            {/*            <Typography*/}
            {/*                variant="body2"*/}
            {/*                className={classes.fiCardContentTextSecondary}*/}
            {/*                component="p"*/}
            {/*            >*/}
            {/*                Lizards are a widespread group of squamate reptiles, with over*/}
            {/*                6,000 species, ranging across all continents except Antarctica*/}
            {/*            </Typography>*/}
            {/*        </FiCardContent>*/}
            {/*        <FiCardActions className={classes.fiCardContent}>*/}
            {/*            <Button size="small" color="inherit" variant="outlined">*/}
            {/*                Share*/}
            {/*            </Button>*/}
            {/*            <Button size="small" color="inherit" variant="outlined">*/}
            {/*                Learn More*/}
            {/*            </Button>*/}
            {/*        </FiCardActions>*/}
            {/*    </FiCard>*/}
            {/*</Box>*/}
        </div>
    );

}

export default Blog;