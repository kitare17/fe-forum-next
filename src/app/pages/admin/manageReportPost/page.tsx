"use client"
import React, {Suspense, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllReport, showReportFollowStatus} from "@/app/store/action/dashboard";
import BuildIcon from '@mui/icons-material/Build';
import {
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {Visibility as ViewIcon} from "@mui/icons-material";
import {RootState} from "@/app/store";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import {useRouter, useSearchParams} from "next/navigation";
import {useForm} from "react-hook-form";
import ModalEditReport from "@/app/pages/admin/manageReportPost/component/ModalEditReport";
import {ReportBlogInterface} from "@/app/interface/ReportBlog";
import Image from "next/image";
import {
    setStateShowDoneReport,
    setStateShowIllegalReport,
    setStateShowPendingReport
} from "@/app/store/reducer/dashboard";


const ManagePost: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    var page = searchParams.get('page') ?? 1;
    const searchBlogTitle = searchParams.get('searchBlogTitle') ?? "";
    const {
        showListReportType,
        listReportBlog, isUpdate, isLoading
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
        switch (showListReportType) {
            //all, pending, done, illegal
            case "all":
                // @ts-ignore
                dispatch(getAllReport({page: page}))
                break;
            case "pending":
                // @ts-ignore
                dispatch(showReportFollowStatus({page: page, statusReport: "Đang chờ xử lí"}))
                break;
            case "done":
                // @ts-ignore
                dispatch(showReportFollowStatus({page: page, statusReport: "Đã giải quyết"}))
                break;
            case "illegal":
                // @ts-ignore
                dispatch(showReportFollowStatus({page: page, statusReport: "Báo cáo không hợp lệ"}))
                break;

        }

        // @ts-ignore

        // if (searchBlogTitle) {
        //     // @ts-ignore
        //
        //     dispatch(findBlog({page: page, searchBlogTitle: searchBlogTitle}));
        // } else {
        //     // @ts-ignore
        //     dispatch(showAllBlog({page: page}));
        // }

    }, [page, isUpdate,showListReportType]);

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
    const [reportPick, setReportPick] = React.useState<ReportBlogInterface | undefined>(undefined);
    const handleOpenModalEdit = (report: ReportBlogInterface | undefined) => {
        setOpen(true);
        setReportPick(report);
    }

    const StatusReportNoti = ({statusReport}: { statusReport: string | undefined }) => {

        var hrefStatus = "https://img.icons8.com/ios-filled/50/40C057/ok--v1.png";
        if (statusReport === "Đã giải quyết") {
            hrefStatus = "https://img.icons8.com/ios-filled/50/40C057/ok--v1.png";
        } else if (statusReport === "Báo cáo không hợp lệ") {
            hrefStatus = "https://img.icons8.com/sf-black/64/FA5252/cancel-2.png";
        } else {
            hrefStatus = "https://img.icons8.com/color/48/clock--v1.png";
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
    const handleShowAll = () => {
        //@ts-ignore
        dispatch(getAllReport({page: page}))
    }
    const handleShowAccept = () => {
        //@ts-ignore
        dispatch(showReportFollowStatus({page: "1", statusReport: "Đã giải quyết"}))
        dispatch(setStateShowDoneReport());
        page="1";
    }

    const handleShowCancel = () => {
        //@ts-ignore

        dispatch(showReportFollowStatus({page: "1", statusReport: "Báo cáo không hợp lệ"}))
        dispatch(setStateShowIllegalReport());

    }
    const handleShowPending = () => {
        //@ts-ignore
        dispatch(showReportFollowStatus({page: "1", statusReport: "Đang chờ xử lí"}))
        dispatch(setStateShowPendingReport());

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
                                    Quản lý report blog {showListReportType}
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

                            <Button sx={{mx: 2}} onClick={() => handleShowAll()} variant="contained"> Tất cả</Button>
                            <Button sx={{mx: 2}} onClick={() => handleShowPending()} variant="contained"> Hiện chưa xử
                                lí</Button>
                            <Button sx={{mx: 2}} onClick={() => handleShowAccept()} variant="contained"> Hiện đã xử
                                lí</Button>
                            <Button sx={{mx: 2}} onClick={() => handleShowCancel()} variant="contained"> Hiện không hợp
                                lệ</Button>
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
                                                <IconButton onClick={() => handleOpenModalEdit(report)}>
                                                    <BuildIcon/>
                                                </IconButton>
                                                <StatusReportNoti statusReport={report?.status}/>
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
                <ModalEditReport openEditStatusBlog={open} setOpenCreateWordForm={setOpen} report={reportPick}/>
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

