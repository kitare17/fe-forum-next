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

    const [showListTopic, setShowListTopic] = useState<TopicInterface[]>([]);
    useEffect(() => {
        // @ts-ignore
        dipatch(findAllTopic());
    }, [])
    useEffect(() => {
        if (isLoading)
            toast.info("Đang tải thông tin")
        if (isError)
            toast.error("lỗi rồi")
        setShowListTopic([...listTopic ?? []]);

    }, [isLoading, isError, listTopic])

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
                                        // image={"data:image/jpeg;base64,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"}
                                        title="Contemplative Reptile"
                                        style={{ background: "linear-gradient(90deg, rgba(173,188,232,1) 18%, rgba(227,199,153,1) 100%)"}}
                                    />
                                    <FiCardContent className={classes.fiCardContent}>
                                        <Typography gutterBottom variant="h5" component="h2"
                                                    style ={{color:"#f58303"}}
                                        >
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
                                                    // image={topic.imgUrl}
                                                    title="Contemplative Reptile"
                                                    style={{ background: "linear-gradient(90deg, rgba(173,188,232,1) 18%, rgba(227,199,153,1) 100%)"}}
                                                />
                                                <FiCardContent className={classes.fiCardContent}>
                                                    <Typography gutterBottom  variant="h5" component="h2"
                                                        style ={{color:"#f58303"}}
                                                  >
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