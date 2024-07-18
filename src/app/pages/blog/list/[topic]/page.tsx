"use client"
import Grid from "@mui/material/Grid";
import {makeStyles} from "@mui/styles";
import {FiCard, FiCardActions, FiCardContent, FiCardMedia} from "@/app/pages/blog/component/BlogCard";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Pagination from '@mui/material/Pagination';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/store";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import { showOneTopic} from "@/app/store/action/blog";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {useParams, useRouter} from "next/navigation";
import AddBoxIcon from "@mui/icons-material/AddBox";
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
        height: 170
    },

    /**
     * Applied to Orginal Card demo
     * Same vale used in Material-ui Card Demos
     */
    media: {
        height: 170
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

        height: 170
    }
});
const ListBlog = () => {
    const {topic} = useParams();


    const classes = useStyles();
    const router=useRouter();

    const [currentPage, setCurrentPage] = useState(1);
    const handlePaging = (event: any, value: number) => {
        console.log("Current page: " + value)
        setCurrentPage(value);

    }


    //fetch data
    const dipatch = useDispatch();
    const {listBlog, isLoading, isError} = useSelector((state: RootState) => state.blog);

    useEffect(() => {
        // @ts-ignore
        dipatch(showOneTopic({slug:topic,page:currentPage}));
    }, [currentPage])

    useEffect(() => {
        if (isLoading)
            toast.info("Đang tải thông tin")
        if (isError)
            toast.error("lỗi rồi")
    }, [isLoading, isError])
    const userId: string | undefined = (typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem('authnRes') ?? "{}") : {}).userEmailId


    return (
        <>
            {
                userId &&
                <Grid px={5} container justifyContent="flex-end">
                    <Button onClick={()=>router.push("/pages/blog/write")} ><AddBoxIcon fontSize="large"/>Viết bài mới</Button>
                </Grid>
            }
            <Grid container spacing={2}
                  mt={5}
                  mb={5}
                  sx={{
                      display: 'flex',
                      justifyContent: 'center'
                  }}
            >
                {[...( listBlog.posts?? [])].map(blog => (
                    <Grid key={blog._id}
                          item xs={10}>

                        <FiCard className={classes.card}>
                            <FiCardMedia
                                image="https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?cs=srgb&dl=pexels-pixabay-301920.jpg&fm=jpg"
                                title="Contemplative Reptile"
                            />
                            <FiCardContent className={classes.fiCardContent}>
                                <Typography gutterBottom
                                            variant="h5"
                                            component="h2"
                                            pl={1}
                                >
                                    {blog.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    className={classes.fiCardContentTextSecondary}
                                    component="p"
                                >
                                    <PermIdentityIcon/>  Tác giả: {blog.creator?.fullname} ({blog.creator?.username})
                                </Typography>
                                <Typography
                                    variant="body2"
                                    className={classes.fiCardContentTextSecondary}
                                    component="p"
                                >
                                    <CalendarMonthIcon/>    Ngày đăng: {new Date(blog?.createdAt ??"").getDate()}/{new Date(blog?.createdAt ??"").getMonth() + 1}/{new Date(blog?.createdAt ??"").getFullYear()}
                                </Typography>

                            </FiCardContent>
                            <FiCardActions className={classes.fiCardContent}

                            >
                                <Button
                                    onClick={() => router.push(`/pages/blog/detail/${blog._id}`)}
                                    size="small" color="inherit"
                                    variant="outlined">
                                    Xem bài viết
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