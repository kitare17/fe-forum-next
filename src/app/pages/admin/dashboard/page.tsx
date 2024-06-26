
"use client"
import {
  TextField,
  InputAdornment,
  IconButton,
  Avatar

} from "@mui/material";
import {
  Search as SearchIcon,
} from "@mui/icons-material"
export default function Dashboard() {
    return (
      <>

        <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
        <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur">
          <div className="container-fluid py-1 px-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                <li className="breadcrumb-item text-sm">
                  <a className="opacity-5 text-dark" href="javascript:;">Pages</a>
                </li>
                <li className="breadcrumb-item text-sm text-dark active" aria-current="page">
                  Dashboard
                </li>
              </ol>
              <h6 className="font-weight-bolder mb-0">Dashboard</h6>
            </nav>
            <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
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
                    <Avatar alt="Admin" src="https://img.icons8.com/?size=24&id=82751&format=png&color=000000" />
                  </IconButton>
                </li>
              </ul>
            </div>
          </div>
        </nav>
          <div className="container-fluid py-4">
            <div className="row">
              <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div className="card">
                  <div className="card-body p-3">
                    <div className="row">
                      <div className="col-8">
                        <div className="numbers">
                          <p className="text-sm mb-0 text-capitalize font-weight-bold">
                            Tổng tiền
                          </p>
                          <h5 className="font-weight-bolder mb-0">
                            $53,000
                            <span className="text-success text-sm font-weight-bolder">
                              +55%
                            </span>
                          </h5>
                        </div>
                      </div>
                      <div className="col-4 text-end">
                        <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                        <img src="https://img.icons8.com/?size=48&id=7165&format=png&color=ffffff"></img>
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
                            
                            Người dùng hôm nay
                          </p>
                          <h5 className="font-weight-bolder mb-0">
                            2,300
                            <span className="text-success text-sm font-weight-bolder">
                              +3%
                            </span>
                          </h5>
                        </div>
                      </div>
                      <div className="col-4 text-end">
                        <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                        <img src='https://img.icons8.com/?size=48&id=11727&format=png&color=ffffff'></img>
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
                            Bài viết mới
                          </p>
                          <h5 className="font-weight-bolder mb-0">
                            +3,462
                            <span className="text-danger text-sm font-weight-bolder">
                              -2%
                            </span>
                          </h5>
                        </div>
                      </div>
                      <div className="col-4 text-end">
                        <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                       <img src="https://img.icons8.com/?size=48&id=bvRRICvUpWEh&format=png&color=ffffff" ></img>
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
                            Tổng bài viết
                          </p>
                          <h5 className="font-weight-bolder mb-0">
                            103,430
                            <span className="text-success text-sm font-weight-bolder">
                              +5%
                            </span>
                          </h5>
                        </div>
                      </div>
                      <div className="col-4 text-end">
                        <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                        <img src='https://img.icons8.com/?size=48&id=93444&format=png&color=ffffff'></img>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="row mt-4">
                <div className="col-lg-5 mb-lg-0 mb-4">
                  <div className="card z-index-2">
                    <div className="card-body p-3">
                      <div className="bg-gradient-dark border-radius-lg py-3 pe-1 mb-3">
                        <div className="chart">
                          <BarChart />
                        </div>
                      </div>
                      <h6 className="ms-2 mt-4 mb-0"> Active Users </h6>
                      <p className="text-sm ms-2">
                        {" "}
                        (<span className="font-weight-bolder">+23%</span>) than last
                        week{" "}
                      </p>
                      <div className="container border-radius-lg">
                        <div className="row">
                          <div className="col-3 py-3 ps-0">
                            <div className="d-flex mb-2">
                              <div className="icon icon-shape icon-xxs shadow border-radius-sm bg-gradient-primary text-center me-2 d-flex align-items-center justify-content-center"></div>
                              <p className="text-xs mt-1 mb-0 font-weight-bold">
                                Users
                              </p>
                            </div>
                            <h4 className="font-weight-bolder">36K</h4>
                            <div className="progress w-75">
                              <div
                                className="progress-bar bg-dark w-60"
                                role="progressbar"
                                aria-valuenow="60"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                          </div>
                          <div className="col-3 py-3 ps-0">
                            <div className="d-flex mb-2">
                              <div className="icon icon-shape icon-xxs shadow border-radius-sm bg-gradient-info text-center me-2 d-flex align-items-center justify-content-center"></div>
                              <p className="text-xs mt-1 mb-0 font-weight-bold">
                                Clicks
                              </p>
                            </div>
                            <h4 className="font-weight-bolder">2m</h4>
                            <div className="progress w-75">
                              <div
                                className="progress-bar bg-dark w-90"
                                role="progressbar"
                                aria-valuenow="90"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                          </div>
                          <div className="col-3 py-3 ps-0">
                            <div className="d-flex mb-2">
                              <div className="icon icon-shape icon-xxs shadow border-radius-sm bg-gradient-warning text-center me-2 d-flex align-items-center justify-content-center"></div>
                              <p className="text-xs mt-1 mb-0 font-weight-bold">
                                Sales
                              </p>
                            </div>
                            <h4 className="font-weight-bolder">435$</h4>
                            <div className="progress w-75">
                              <div
                                className="progress-bar bg-dark w-30"
                                role="progressbar"
                                aria-valuenow="30"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                          </div>
                          <div className="col-3 py-3 ps-0">
                            <div className="d-flex mb-2">
                              <div className="icon icon-shape icon-xxs shadow border-radius-sm bg-gradient-danger text-center me-2 d-flex align-items-center justify-content-center"></div>
                              <p className="text-xs mt-1 mb-0 font-weight-bold">
                                Items
                              </p>
                            </div>
                            <h4 className="font-weight-bolder">43</h4>
                            <div className="progress w-75">
                              <div
                                className="progress-bar bg-dark w-50"
                                role="progressbar"
                                aria-valuenow="50"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="card z-index-2">
                    <div className="card-header pb-0">
                      <h6>Sales overview</h6>
                      <p className="text-sm">
                        <i className="fa fa-arrow-up text-success"></i>
                        <span className="font-weight-bold">4% more</span> in 2024
                      </p>
                    </div>
                    <div className="card-body p-3">
                      <div className="chart">
                        <LineChart />
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </main>
      </>
    );
  }