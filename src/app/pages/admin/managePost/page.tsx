"use client"
import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {showAllBlog} from "@/app/store/action/dashboard";

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

interface Post {
    id: number;
    title: string;
    content: string;
    creator: string; // New field for creator
    status: string;
}


const ManagePost: React.FC = () => {

    const {
        listBlog
    } =
        useSelector((state: RootState) => state.dashboard);


    const dispatch = useDispatch();
    useEffect(() => {

        // @ts-ignore
        dispatch(showAllBlog({page: 1}));
    }, [])



    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showViewModal, setShowViewModal] = useState<boolean>(false); // State for view modal
    const [selectedPost, setSelectedPost] = useState<BlogInterface | null>(null);

    const handleEdit = (post: BlogInterface) => {
        setSelectedPost(post);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setSelectedPost(null);
    };

    const handleSaveEdit = () => {
        // Perform save logic here
        // For example, update the post information in the state or make an API call
        // After saving, close the modal
        setShowEditModal(false);
        setSelectedPost(null);
    };

    const handleView = (post: BlogInterface) => {
        setSelectedPost(post);
        setShowViewModal(true);
    };

    const handleCloseViewModal = () => {
        setShowViewModal(false);
        setSelectedPost(null);
    };

    // const handleStatusChange = (id: number) => {
    //     const updatedPosts = posts.map((post) => {
    //         if (post.id === id) {
    //             post.status = post.status === "Draft" ? "Published" : "Draft";
    //         }
    //         return post;
    //     });
    //     setPosts(updatedPosts);
    // };

    return (
        <>
            <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg">
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
                                    <IconButton
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        color="inherit"
                                    >
                                        <Avatar alt="Admin"
                                                src="https://img.icons8.com/?size=24&id=82751&format=png&color=000000"/>
                                    </IconButton>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="container-fluid py-4">
                    <Paper className="card mb-4">
                        <div className="card-header pb-4">
                            <Typography variant="h5">Quản lý bài viết</Typography>
                        </div>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>STT</TableCell>
                                        <TableCell>Chủ đề</TableCell>

                                        <TableCell>Tác giả</TableCell>
                                        <TableCell align="center">Xem</TableCell>
                                        <TableCell align="center">Publish/Unpublish</TableCell>
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
                                                <Typography variant="body2">{post?.creator?.username}</Typography>
                                            </TableCell>
                                            <TableCell align="center">

                                                <IconButton onClick={() => handleView(post)}>
                                                    <ViewIcon/>
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="center">
                                                {/*<IconButton*/}
                                                {/*    onClick={() => handleStatusChange(post._id)}*/}
                                                {/*    color={post.status === "Draft" ? "secondary" : "primary"}*/}
                                                {/*>*/}
                                                {/*    {post.statusPost === "Draft" ? <UnlockIcon/> : <LockIcon/>}*/}
                                                {/*</IconButton>*/}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </div>

                {/* View Modal */}
                <Dialog open={showViewModal} onClose={handleCloseViewModal}>
                    <DialogTitle>Chi tiết bài viết</DialogTitle>
                    <DialogContent>
                        {selectedPost && (
                            <div>
                                <Typography variant="body2">
                                    <strong>Chủ đề:</strong> {selectedPost.title}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Nội dung:</strong> {selectedPost.detail}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Tác giả:</strong> {selectedPost?.creator?.username}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Trạng thái:</strong> {selectedPost?.statusPost}
                                </Typography>
                            </div>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseViewModal} color="primary">
                            Đóng
                        </Button>
                    </DialogActions>
                </Dialog>


            </main>
        </>
    );
};

export default ManagePost;
