"use client"
import Grid from "@mui/material/Grid";
import {makeStyles} from "@mui/styles";
import {FiCard, FiCardActions, FiCardContent, FiCardMedia} from "@/app/pages/blog/component/BlogCard";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Pagination from '@mui/material/Pagination';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/store";
import {useEffect} from "react";
import {fetchUsers} from "@/app/store/action/user";
import {toast} from "react-toastify";
import {showAllBlog} from "@/app/store/action/blog";

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
const ListBlog = () => {
    const classes = useStyles();

    const handlePaging = (event: any, value: any) => {
        console.log("Current page: " + value)
    }


    //fetch data
    const dipatch = useDispatch();
    const {listBlog, isLoading, isError} = useSelector((state: RootState) => state.blog);

    useEffect(() => {
        // @ts-ignore
        dipatch(showAllBlog());
    }, [])
    useEffect(() => {
        if (isLoading)
            toast.info("Đang tải thông tin")
        if (isError)
            toast.error("lỗi rồi")
    }, [isLoading, isError])


    return (
        <>
            <Grid container spacing={2}
                  mt={5}
                  mb={5}
                  sx={{
                      display: 'flex',
                      justifyContent: 'center'
                  }}
            >
                {/*{*/}
                {/*    [...( listBlog.posts?? [])].map((topic)=>{*/}
                {/*        return(*/}
                {/*            */}
                {/*                <>*/}
                {/*                  */}
                {/*                </>*/}
                {/*           */}
                {/*        )*/}
                {/*    }*/}
                {/*}*/}

                {[...( listBlog.posts?? [])].map(blog => (
                    <Grid key={blog._id}
                        item xs={10}>

                        <FiCard className={classes.card}>
                            <FiCardMedia
                                image="https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?cs=srgb&dl=pexels-pixabay-301920.jpg&fm=jpg"
                                title="Contemplative Reptile"
                            />
                            <FiCardContent className={classes.fiCardContent}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Lizard
                                </Typography>
                                <Typography
                                    variant="body2"
                                    className={classes.fiCardContentTextSecondary}
                                    component="p"
                                >
                                    Lizards are a widespread group of squamate reptiles, with over
                                    6,000 species, ranging across all continents except Antarctica
                                </Typography>
                            </FiCardContent>
                            <FiCardActions className={classes.fiCardContent}>
                                <Button size="small" color="inherit" variant="outlined">
                                    Share
                                </Button>
                                <Button size="small" color="inherit" variant="outlined">
                                    Learn More
                                </Button>
                            </FiCardActions>
                        </FiCard>

                    </Grid>
                ))}



                <Grid item xs={10}
                      sx={{
                          display: 'flex',
                          justifyContent: 'center'
                      }}
                >
                    <Pagination
                        onChange={handlePaging}
                        count={listBlog.maxPage}
                        defaultPage={1}
                        siblingCount={1}
                        size="large"
                        showLastButton
                        showFirstButton/>
                </Grid>
            </Grid>

        </>
    )
}
export default ListBlog;