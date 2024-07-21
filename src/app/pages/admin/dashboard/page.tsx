"use client";
import { TextField, InputAdornment, IconButton, Avatar } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useEffect } from "react";
import {
  getAmountBlogMonth,
  getTotalReport,
  getTotalUser,
} from "@/app/store/action/dashboard";
import ChartBlogInMonth from "@/app/pages/admin/dashboard/component/ChartBlogInMonth";

import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { fetchLogout } from "@/app/store/action/auth";
import { resetInitialState } from "@/app/store/reducer/auth";
import {useRouter} from "next/navigation";


export default function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();


  const { totalUser, totalBlogMonth, totalReport, isLoading, isError } =
    useSelector((state: RootState) => state.dashboard);

  useEffect(() => {
    // @ts-ignore
    dispatch(getTotalUser());
    // @ts-ignore
    dispatch(getAmountBlogMonth());
    // @ts-ignore
    dispatch(getTotalReport());
  }, []);

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
      <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
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
                  Dashboard
                </li>
              </ol>
              <h6 className="font-weight-bolder mb-0">Dashboard</h6>
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


                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container-fluid py-4">
          <div className="row">
            {/*<div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">*/}
            {/*  <div className="card">*/}
            {/*    <div className="card-body p-3">*/}
            {/*      <div className="row">*/}
            {/*        <div className="col-8">*/}
            {/*          <div className="numbers">*/}
            {/*            <p className="text-sm mb-0 text-capitalize font-weight-bold">*/}
            {/*              Tổng tiền*/}
            {/*            </p>*/}
            {/*            <h5 className="font-weight-bolder mb-0">*/}
            {/*              $53,000*/}
            {/*              <span className="text-success text-sm font-weight-bolder">*/}
            {/*                +55%*/}
            {/*              </span>*/}
            {/*            </h5>*/}
            {/*          </div>*/}
            {/*        </div>*/}
            {/*        <div className="col-4 text-end">*/}
            {/*          <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">*/}
            {/*            <img src="https://img.icons8.com/?size=48&id=7165&format=png&color=ffffff"></img>*/}
            {/*          </div>*/}
            {/*        </div>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}
            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
              <div className="card">
                <div className="card-body p-3">
                  <div className="row">
                    <div className="col-8">
                      <div className="numbers">
                        <p className="text-sm mb-0 text-capitalize font-weight-bold">
                          Người dùng
                        </p>
                        <h5 className="font-weight-bolder mb-0">{totalUser}</h5>
                      </div>
                    </div>
                    <div className="col-4 text-end">
                      <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                        <img src="https://img.icons8.com/?size=48&id=11727&format=png&color=ffffff"></img>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
              <div className="card">
                <div className="card-body p-3">
                  <div className="row">
                    <div className="col-8">
                      <div className="numbers">
                        <p className="text-sm mb-0 text-capitalize font-weight-bold">
                          Bài viết
                        </p>
                        <h5 className="font-weight-bolder mb-0">
                          {totalBlogMonth}
                        </h5>
                      </div>
                    </div>
                    <div className="col-4 text-end">
                      <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                        <img src="https://img.icons8.com/?size=48&id=bvRRICvUpWEh&format=png&color=ffffff"></img>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6">
              <div className="card">
                <div className="card-body p-3">
                  <div className="row">
                    <div className="col-8">
                      <div className="numbers">
                        <p className="text-sm mb-0 text-capitalize font-weight-bold">
                          Tổng report
                        </p>
                        <h5 className="font-weight-bolder mb-0">
                          {totalReport}
                        </h5>
                      </div>
                    </div>
                    <div className="col-4 text-end">
                      <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                        <img src="https://img.icons8.com/?size=48&id=93444&format=png&color=ffffff"></img>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid py-4 bg-white">
          <div className="row">
            <ChartBlogInMonth />
          </div>
          <div className="row ">
            <h3 className="text-center">Số bài viết trong 7 ngày qua</h3>
          </div>
        </div>
      </main>
    </>
  );
}
