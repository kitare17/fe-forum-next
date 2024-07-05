"use client"
import React, {useState, useEffect, Suspense} from "react";
import {useDispatch, useSelector} from "react-redux";
import {findBlog, getAllReport, showAllBlog} from "@/app/store/action/dashboard";
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
    Avatar
} from "@mui/material";
import {
    Edit as EditIcon,
    Visibility as ViewIcon,
    Lock as LockIcon,
    LockOpen as UnlockIcon,
    Search as SearchIcon
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
import ModalEditReport from "@/app/pages/admin/manageReportPost/component/ModalEditReport";


const ManagePost: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const page = searchParams.get('page') ?? 1;
    const searchBlogTitle = searchParams.get('searchBlogTitle') ?? "";
    const {
        listBlog,listReportBlog,isUpdate,isLoading
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
        // @ts-ignore
        dispatch(getAllReport({page:page}))

        // if (searchBlogTitle) {
        //     // @ts-ignore
        //
        //     dispatch(findBlog({page: page, searchBlogTitle: searchBlogTitle}));
        // } else {
        //     // @ts-ignore
        //     dispatch(showAllBlog({page: page}));
        // }

    }, [page]);

    const handlePaging = (event: any, value: number) => {
        if (searchBlogTitle)
            router.push(`/pages/admin/manageReportPost?page=${value}&searchBlogTitle=${searchBlogTitle}`);
        else
            router.push(`/pages/admin/manageReportPost?page=${value}`)
    };
    const handleFindGroup = () => {
        var searchBlogTitle = getValues("searchBlogTitle")
        router.push(`/pages/admin/managePost?page=1&searchBlogTitle=${searchBlogTitle}`);
    }


    //handle modal edit open
    const [open, setOpen] = React.useState(false);
    const [blogPick, setBlogPick] = React.useState<BlogInterface | undefined>(undefined);
    const handleOpenModalEdit = (blog: BlogInterface|undefined) => {
        setOpen(true);
        setBlogPick(blog);
    }


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
                                    Quản lý report blog
                                </li>
                            </ol>

                        </nav>
                        <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">


                        </div>
                    </div>
                </nav>

                <div className="container-fluid py-4">
                    <Paper className="card mb-4">
                        <div className="card-header  d-flex justify-content-between">
                            <Typography variant="h5">Quản lý report blog</Typography>
                        </div>
                        <div className="card-header d-flex ">

                            <Button sx={{mx: 2}} variant="contained"> Hiện chưa xử lí</Button>
                            <Button sx={{mx: 2}} variant="contained"> Hiện đã xử lí</Button>
                        </div>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>STT</TableCell>
                                        <TableCell>Tiêu đề </TableCell>
                                        <TableCell>Người báo cáo</TableCell>
                                        <TableCell align="center">Xem blog</TableCell>
                                        <TableCell align="center">Hành động</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listReportBlog?.reports.map((report, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>
                                                <Typography variant="body2">{report.title}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2">{report?.userReport?.username}</Typography>
                                            </TableCell>

                                            <TableCell align="center">

                                                <Link href={`/pages/blog/detail/${report?.blogId?._id}`}
                                                      rel="noopener noreferrer"
                                                      target="_blank">
                                                    <ViewIcon/>
                                                </Link>

                                            </TableCell>
                                            <TableCell align="center">
                                                <IconButton onClick={() => handleOpenModalEdit(report?.blogId)}>
                                                    <BuildIcon/>
                                                </IconButton>
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
                            count={listReportBlog?.maxPage}
                            defaultPage={1}
                            siblingCount={1}
                            // page={Number(page)??1}
                            size="large"

                            showLastButton
                            showFirstButton/>
                    </Grid>
                </Grid>
                <ModalEditReport openEditStatusBlog ={open} setOpenCreateWordForm={setOpen} blog={blogPick}/>
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

