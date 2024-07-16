"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Link,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { AnyAaaaRecord } from "dns";
import FormComponentUserProfile from "./component/FormComponentUserProfile";
import { fetchUserProfile } from "@/app/store/action/user";
import { AppDispatch } from "@/app/store";

const MyProfile = () => {
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [userUpdateState, setUsertUpdateState] = useState<Object>();

  const {
    detailUser,
    isLoading: isLoading,
    isError: isError,
    message,
  } = useSelector((state: RootState) => state.user);

  const handleEditClick = () => {
    setUsertUpdateState(detailUser);
    setOpenEditPopup(true);
  };

  const handleCloseEditPopup = () => {
    setOpenEditPopup(false);
  };

  const handleShowUserProfile = async () => {
    await dispatch(fetchUserProfile(user.userEmailId));
  };

  useEffect(() => {
    handleShowUserProfile();
  }, []);

  return (
    <section
      style={{
        backgroundColor: "#f0f0f0",
        paddingTop: "48px",
        paddingBottom: "48x",
        minHeight: "100vh",
      }}
    >
      <Container>
        <Typography
          className="text-center"
          variant="h3"
          style={{ paddingBottom: "30px" }}
        >
          Hồ sơ của tôi
        </Typography>
        <Grid>
          <Grid item lg={6}>
            <Card
              style={{
                padding: "24px",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              }}
            >
              <>
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "24px",
                    background: "#4169E1",
                    borderRadius: "0.5rem",
                    color: "white",
                  }}
                >
                  <img
                       src={detailUser.avatar}
                    alt="Avatar"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      marginRight: "24px",
                    }}
                  />

                  <div>
                    <Typography className="fw-bold" variant="h5">
                      {detailUser.username}
                    </Typography>
                  </div>
                  <Edit
                    className="far fa-edit mb-5"
                    style={{ marginLeft: "auto", cursor: "pointer" }}
                    onClick={handleEditClick}
                  />
                </Box>
                <CardContent style={{ padding: "16px" }}>
                  <Typography variant="h5">Thông tin cá nhân</Typography>
                  <Divider style={{ marginTop: "8px", marginBottom: "16px" }} />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="subtitle1">Họ và tên</Typography>
                      <Typography variant="body1" className="text-muted">
                        {detailUser.fullname}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle1">SDT</Typography>
                      <Typography variant="body1" className="text-muted">
                        {detailUser.phone}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid style={{ paddingTop: "10px" }} container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="subtitle1">Email</Typography>
                      <Typography variant="body1" className="text-muted">
                        {detailUser.email}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </>

              <CardContent style={{ padding: "16px" }}>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    marginTop: "16px",
                  }}
                >
                  <Link href="#!" style={{ marginRight: "16px" }}>
                    <Facebook className="fab fa-facebook-f fa-lg" />
                  </Link>
                  <Link href="#!" style={{ marginRight: "16px" }}>
                    <Twitter className="fab fa-twitter fa-lg" />
                  </Link>
                  <Link href="#!">
                    <Instagram className="fab fa-instagram fa-lg" />
                  </Link>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <FormComponentUserProfile
          // @ts-ignore
          changeProfile={userUpdateState}
          idUser={user.userEmailId}
          openEditPopup={openEditPopup}
          handleShowUserProfile={handleShowUserProfile}
          setopenEditPopup={setOpenEditPopup}
        />
      </Container>
    </section>
  );
};

export default MyProfile;
