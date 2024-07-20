"use client";
import React, {Suspense, useEffect, useState} from "react";
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
  InputBase,
  Pagination,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  Box
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";

import Grid from "@mui/material/Grid";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Edit as EditIcon,
  Visibility as ViewIcon,
  Lock as LockIcon,
  LockOpen as UnlockIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogout } from "@/app/store/action/auth";
import { RootState } from "@/app/store";
import { UserInterface } from "@/app/interface/User";
import { findUser, showAllUser, updateUserStatus } from "@/app/store/action/dashboard";
import FormComponentUserProfile from "../../auth/myprofile/component/FormComponentUserProfile";
import { useForm } from "react-hook-form";
import { resetInitialState } from "@/app/store/reducer/auth";

const ManageAccount: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { listUser, isLoading, isError } = useSelector(
    (state: RootState) => state.dashboard
  );
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? 1;
  const searchUser = searchParams.get('searchUser') ?? "";

  const handleShowUserProfile = () => {
    // @ts-ignore
    dispatch(showAllUser({ page: page }));
  };

  useEffect(() => {
    handleShowUserProfile();
  }, [page]);

  const [users, setUsers] = useState<UserInterface[]>();
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showViewModal, setShowViewModal] = useState<boolean>(false); // State for view modal
  const [userUpdateState, setUserUpdateState] = useState<UserInterface | null>(
    null
  );
  const [idUser, setIdUser] = useState("");

  const handleEdit = (user: UserInterface) => {
    setIdUser(user?._id);
    setUserUpdateState(user);
    setOpenEditPopup(true);
  };

  const handleStatusChange = (id: string) => {
    // @ts-ignore
    dispatch(updateUserStatus({ userId: id }));
    // @ts-ignore
    dispatch(showAllUser({ page: page }));
  };
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
            "searchUser": searchUser,
        }
    }
)

useEffect(() => {

    if (searchUser) {
        // @ts-ignore
        dispatch(findUser({page: page, searchUser: searchUser}));
    } else {
        // @ts-ignore
        dispatch(showAllUser({ page: page }));
    }

}, [page, searchUser]);

  const handlePaging = (event: any, value: number) => {
    if (searchUser)
    router.push(`/pages/admin/manageAccount?page=${value}&searchUser=${searchUser}`);
    else
    router.push('/pages/admin/manageAccount');
  };
  const handleFindUser = () => {
    var searchUser = getValues("searchUser")
    router.push(`/pages/admin/manageAccount?page=1&searchUser=${searchUser}`);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
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
      <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg">
        <nav
          className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
          id="navbarBlur"
        >
          <div className="container-fluid py-1 px-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                <li className="breadcrumb-item text-sm">
                  <a className="opacity-5 text-dark" href="javascript:;">
                    Pages
                  </a>
                </li>
                <li
                  className="breadcrumb-item text-sm text-dark active"
                  aria-current="page"
                >
                  Quản lý tài khoản
                </li>
              </ol>
              <h6 className="font-weight-bolder mb-0">Quản lý tài khoản</h6>
            </nav>
            <div
              className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
              id="navbar"
            >
              <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                <TextField
                  fullWidth
                  placeholder="Type here..."
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
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
                    <React.Fragment>
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
                            sx={{ ml: 2 }}
                            aria-controls={open ? "account-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                          >
                            <Avatar sx={{ width: 32, height: 32 }}>A</Avatar>
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
                            <Logout fontSize="small" />
                          </ListItemIcon>
                          Logout
                        </MenuItem>
                      </Menu>
                    </React.Fragment>
                  </IconButton>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container-fluid py-4">
          <Paper className="card mb-4">
            <div className="card-header pb-4 d-flex justify-content-between">
              <Typography variant="h5">Quản lý tài khoản</Typography>
              <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 400,
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Tìm kiếm người dùng"
                  inputProps={{ "aria-label": "Tìm kiếm người dùng" }}
                  {...register(
                      'searchUser'
                  )}
                />
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon onClick={() => handleFindUser()} />
                </IconButton>
              </Paper>
            </div>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>STT</TableCell>
                    <TableCell>Tên người dùng</TableCell>
                    <TableCell>Họ và tên</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>SDT</TableCell>
                    <TableCell>Vai trò</TableCell> {/* New column for Role */}
                    <TableCell align="center">Sửa/Xem</TableCell>
                    <TableCell align="center">Khóa/Mở khóa</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[...(listUser?.users ?? [])].map((user, index) => (
                    <TableRow key={user._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {user?.username}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {user?.fullname}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{user?.email}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{user?.phone}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {user?.admin === false
                            ? "Người dùng"
                            : "Quản trị viên"}
                        </Typography>
                        {/* Display Role */}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => handleEdit(user)}>
                          <EditIcon />
                        </IconButton>
                        {/* <IconButton onClick={() => handleView(user)}>
                          <ViewIcon />
                        </IconButton> */}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => handleStatusChange(user._id)}
                          color={
                            user?.status === true ? "primary" : "error"
                          }
                        >
                          {user?.status === true ? (
                            <UnlockIcon />
                          ) : (
                            <LockIcon />
                          )}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>

        {/* View Modal */}
        <FormComponentUserProfile
          // @ts-ignore
          changeProfile={userUpdateState}
          idUser={idUser}
          openEditPopup={openEditPopup}
          handleShowUserProfile={handleShowUserProfile}
          setopenEditPopup={setOpenEditPopup}
        />

        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
          mb={5}
        >
          <Grid
            item
            xs={10}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Pagination
              onChange={handlePaging}
              count={listUser?.maxPage}
              defaultPage={1}
              siblingCount={1}
              page={Number(page) ?? 1}
              size="large"
              showLastButton
              showFirstButton
            />
          </Grid>
        </Grid>
      </main>
    </>
  );
};

const ManageAccountRender = () => {
  return (
      // You could have a loading skeleton as the `fallback` too
      <Suspense>
        <ManageAccount/>
      </Suspense>
  )
};
export default ManageAccountRender;
