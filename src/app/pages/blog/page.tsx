"use client"
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {FiCard, FiCardActionArea, FiCardActions, FiCardContent, FiCardMedia} from "./component/BlogCard";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@mui/styles";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/store";
import {fetchUsers} from "@/app/store/action/user";
import {toast} from "react-toastify";
import {findAllTopic} from "@/app/store/action/topic";
import Grid from "@mui/material/Grid";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {TopicInterface} from "@/app/interface/Topic";


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

        height: 160
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
    cardContent: {

        height: 160
    }
});


const Blog = () => {
    const dipatch = useDispatch();
    const {listTopic, isLoading, isError} = useSelector((state: RootState) => state.topic);
    const router = useRouter();

    const [showListTopic,setShowListTopic] = useState<TopicInterface[]>([]);
    useEffect(() => {
        // @ts-ignore
        dipatch(findAllTopic());
    }, [])
    useEffect(() => {
        if (isLoading)
            toast.info("Đang tải thông tin")
        if (isError)
            toast.error("lỗi rồi")
        setShowListTopic([...listTopic??[]]);

    }, [isLoading, isError,listTopic])

    const handleClick = () => {
        // @ts-ignore
        dipatch(fetchUsers());
        toast.success("ok");
    }
    // @ts-ignore
    const classes = useStyles();
    return (
        <div

            style={{
                background: `url('/img/background-frog.jpg')`,
                paddingBottom: "10px"
            }}
        >
            <h1
                className="mint"
                style={{
                    textAlign: 'center',
                }}>
                Hot topic</h1>
            <Grid container spacing={2} mt={2} mb={2}>
                <Grid item
                      md={6}
                      xs={12}
                      sm={12}
                      sx={{display: 'flex', justifyContent: 'center'}}
                >
                    <Box width={"50%"}
                         height={"100%"}
                         onClick={() => router.push("/pages/blog/list")}
                    >
                        <Link href={"/"}>
                            <FiCard
                                className={classes.card}>
                                <FiCardActionArea className={classes.cardContent}>
                                    <FiCardMedia
                                        image={"https://www.thesun.co.uk/wp-content/uploads/2022/07/unnamed-138.jpg?w=620"}
                                        title="Contemplative Reptile"
                                    />
                                    <FiCardContent className={classes.fiCardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Xem tất cả
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            className={classes.fiCardContentTextSecondary}
                                            component="p"
                                        >
                                            Xem tất cả nội dung
                                        </Typography>
                                    </FiCardContent>
                                </FiCardActionArea>
                            </FiCard>
                        </Link>
                    </Box>

                </Grid>
                {
                    [...(showListTopic ?? [])].map((topic) => {
                        return (
                            <Grid item
                                  md={6}
                                  xs={12}
                                  sm={12}
                                  key={topic._id}
                                  sx={{display: 'flex', justifyContent: 'center'}}
                            >
                                <Box width={"50%"}
                                     height={"100%"}
                                >
                                    <Link href={`/pages/blog/list/${topic.slug}`}>

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
                                    </Link>
                                </Box>
                            </Grid>

                        )
                    })
                }
            </Grid>
        </div>
    );

}

export default Blog;