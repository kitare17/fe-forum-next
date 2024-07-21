"use client"
import React, {useState, useEffect, Suspense} from "react";
import {useDispatch, useSelector} from "react-redux";
import {findBlog, showAllBlog} from "@/app/store/action/dashboard";
import BuildIcon from '@mui/icons-material/Build';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    Button,
    TextField,
    InputAdornment,
    Avatar,
    MenuItem,
    ListItemIcon,
    Tooltip,Menu,
    Box
} from "@mui/material";
import {
    Edit as EditIcon,
    Visibility as ViewIcon,
    Lock as LockIcon,
    LockOpen as UnlockIcon,
    Search as SearchIcon,
    Logout
} from "@mui/icons-material";
import {RootState} from "@/app/store";
import {BlogInterface} from "@/app/interface/Blog";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import {useRouter, useSearchParams} from "next/navigation";
import InputBase from "@mui/material/InputBase";
import {useForm} from "react-hook-form";
import ModalEditStatusPost from "@/app/pages/admin/managePost/component/ModalEditStatusPost";
import Image from 'next/image'
import { resetInitialState } from "@/app/store/reducer/auth";
import { fetchLogout } from "@/app/store/action/auth";

const ManagePost: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const page = searchParams.get('page') ?? 1;
    const searchBlogTitle = searchParams.get('searchBlogTitle') ?? "";
    const {
        listBlog, isUpdate, isLoading
    } =
        useSelector((state: RootState) => state.dashboard);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        formState,
        control,
        trigger,
        setValue,
        getValues
    } = useForm<any>(
        {
            defaultValues: {
                "searchBlogTitle": searchBlogTitle,
            }
        }
    )

    useEffect(() => {

        if (searchBlogTitle) {
            // @ts-ignore

            dispatch(findBlog({page: page, searchBlogTitle: searchBlogTitle}));
        } else {
            // @ts-ignore
            dispatch(showAllBlog({page: page}));
        }

    }, [page, searchBlogTitle, isUpdate]);

    const handlePaging = (event: any, value: number) => {
        if (searchBlogTitle)
            router.push(`/pages/admin/managePost?page=${value}&searchBlogTitle=${searchBlogTitle}`);
        else
            router.push(`/pages/admin/managePost?page=${value}`)
    };
    const handleFindGroup = () => {
        var searchBlogTitle = getValues("searchBlogTitle")
        router.push(`/pages/admin/managePost?page=1&searchBlogTitle=${searchBlogTitle}`);
    }


    //handle modal edit open
    const [open, setOpen] = React.useState(false);
    const [blogPick, setBlogPick] = React.useState<BlogInterface | undefined>(undefined);
    const handleOpenModalEdit = (blog: BlogInterface) => {
        setOpen(true);
        setBlogPick(blog);
    }


    const StatusBlogNoti = ({statusPost}: { statusPost: string | undefined }) => {

        var hrefStatus = "https://img.icons8.com/ios-filled/50/40C057/ok--v1.png";
        if (statusPost === "Đang hoạt động") {
            hrefStatus = "https://img.icons8.com/ios-filled/50/40C057/ok--v1.png";
        } else {
            hrefStatus = "https://img.icons8.com/sf-black/64/FA5252/cancel-2.png";
        }
        return (
            <Image
                src={hrefStatus}
                width={24}
                height={24}
                alt="none"
            />

        )
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const openlogout = Boolean(anchorEl);
    const handleClick = (event: any) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const hanldeLogout = () => {
      // @ts-ignore
      dispatch(fetchLogout)
      console.log("dang xuat")
      dispatch(resetInitialState());
      window.localStorage.clear()
      router.push("/pages/auth/login")
  };
  

    return (
        <>
            <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg p-2 mb-3">
                <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
                     id="navbarBlur">
                    <div className="container-fluid py-1 px-3">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                                <li className="breadcrumb-item text-sm">
                                    <a className="opacity-5 text-dark" href="javascript:;">Pages</a>
                                </li>
                                <li className="breadcrumb-item text-sm text-dark active" aria-current="page">
                                    Quản lý bài viết
                                </li>
                            </ol>
                            <h6 className="font-weight-bolder mb-0">Quản lý bài viết</h6>

                        </nav>
                        <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                            <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                                <TextField
                                    fullWidth
                                    placeholder="Type here..."
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon/>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                            <ul className="navbar-nav justify-content-end">
                                <li className="nav-item d-flex align-items-center">


                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            textAlign: "center",
                                        }}
                                    >
                                        <Tooltip title="Account settings">
                                            <IconButton
                                                onClick={handleClick}
                                                size="small"
                                                sx={{ml: 2}}
                                                aria-controls={open ? "account-menu" : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? "true" : undefined}
                                            >
                                                <Avatar sx={{width: 32, height: 32}}>A</Avatar>
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                    <Menu
                                        anchorEl={anchorEl}
                                        id="account-menu"
                                        open={open}
                                        onClose={handleClose}
                                        onClick={handleClose}
                                        PaperProps={{
                                            elevation: 0,
                                            sx: {
                                                overflow: "visible",
                                                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                                mt: 1.5,
                                                "& .MuiAvatar-root": {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1,
                                                },
                                                "&::before": {
                                                    content: '""',
                                                    display: "block",
                                                    position: "absolute",
                                                    top: 0,
                                                    right: 14,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: "background.paper",
                                                    transform: "translateY(-50%) rotate(45deg)",
                                                    zIndex: 0,
                                                },
                                            },
                                        }}
                                        transformOrigin={{
                                            horizontal: "right",
                                            vertical: "top",
                                        }}
                                        anchorOrigin={{
                                            horizontal: "right",
                                            vertical: "bottom",
                                        }}
                                    >
                                        <MenuItem onClick={hanldeLogout}>
                                            <ListItemIcon>
                                                <Logout fontSize="small"/>
                                            </ListItemIcon>
                                            Logout
                                        </MenuItem>
                                    </Menu>


                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="container-fluid py-4">
                    <Paper className="card mb-4">
                        <div className="card-header pb-4 d-flex justify-content-between">
                            <Typography variant="h5">Quản lý bài viết</Typography>
                            <Paper
                                component="form"
                                sx={
                                    {p: '2px 4px', display: 'flex', alignItems: 'center', width: 400}
                                }

                            >

                                <InputBase
                                    sx={{ml: 1, flex: 1}}
                                    placeholder="Tìm kiếm group"
                                    inputProps={{'aria-label': 'Tìm kiếm group'}}
                                    {...register(
                                        'searchBlogTitle'
                                    )}
                                />
                                <IconButton type="button" sx={{p: '10px'}} aria-label="search">
                                    <SearchIcon onClick={() => handleFindGroup()}/>
                                </IconButton>
                            </Paper>
                        </div>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>STT</TableCell>
                                        <TableCell>Tiêu đề </TableCell>
                                        <TableCell>Chủ đề </TableCell>
                                        <TableCell align="center">Lượt thích</TableCell>
                                        <TableCell>Tác giả</TableCell>
                                        <TableCell align="center">Xem</TableCell>
                                        <TableCell align="center">Hành động</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listBlog?.posts.map((post, index) => (
                                        <TableRow key={post._id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>
                                                <Typography variant="body2">{post.title}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2">{post?.topic?.title}</Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography
                                                    variant="body2">{[...(post.likes ?? [])].length}</Typography>
                                            </TableCell>

                                            <TableCell>
                                                <Typography variant="body2">{post?.creator?.username}</Typography>
                                            </TableCell>
                                            <TableCell align="center">

                                                <Link href={`/pages/blog/detail/${post._id}`} rel="noopener noreferrer"
                                                      target="_blank">
                                                    <ViewIcon/>
                                                </Link>

                                            </TableCell>
                                            <TableCell align="center">
                                                <IconButton onClick={() => handleOpenModalEdit(post)}>
                                                    <BuildIcon/>
                                                </IconButton>
                                                <StatusBlogNoti statusPost={post?.statusPost}/>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </div>


                <Grid container
                      sx={{
                          display: 'flex',
                          justifyContent: 'center'
                      }}
                      mb={5}
                >
                    <Grid item xs={10}
                          sx={{
                              display: 'flex',
                              justifyContent: 'center'
                          }}
                    >
                        <Pagination
                            onChange={handlePaging}
                            count={listBlog?.maxPage}
                            defaultPage={1}
                            siblingCount={1}
                            // page={Number(page)??1}
                            size="large"

                            showLastButton
                            showFirstButton/>
                    </Grid>
                </Grid>
                <ModalEditStatusPost openEditStatusBlog={open} setOpenCreateWordForm={setOpen} blog={blogPick}/>
            </main>
        </>
    );
};


const ManagePostRender = () => {
    return (
        // You could have a loading skeleton as the `fallback` too
        <Suspense>
            <ManagePost/>
        </Suspense>
    )
};
export default ManagePostRender;

