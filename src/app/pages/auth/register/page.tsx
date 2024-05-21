"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { RegisterInterface } from "@/app/interface/RegisterInterface";
import { fetchRegister } from "@/app/store/action/auth";
import { toast } from "react-toastify";

const defaultTheme = createTheme();
import { useRouter } from "next/navigation";

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user, isLoading, isError, message,isSuccess } = useSelector(
    (state: RootState) => state.auth
  );
  React.useEffect(() => {
    if(isError){
        toast.error(message)}

    if(isSuccess){
        toast.success(message)
      router.push("/pages/auth/login");
    }

   
  }, [isError, isLoading,isSuccess]);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const username = data.get("username") as string;

    // Ensure the data conforms to LoginInterface
    const userRegister: RegisterInterface = { email, password, username };
    dispatch(fetchRegister(userRegister)).then((result) => {
      console.log(result);
      //   if (result?.payload === "successfully") {
      //     toast.error("Đăng ký thành công");
      //     router.push("/pages/auth/login");
      //   }
      //   toast.success("Đăng ký không thành công");
    });
  };
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://fptcity.vn/wp-content/uploads/truong-fpt-university.jpg)",
              backgroundRepeat: "no-repeat",
              // backgroundColor: (t) =>
              //     t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "#ed7207" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Đăng kí
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="username"
                  label="User name"
                  type="text"
                  id="username"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Mật khẩu"
                  type="password"
                  id="password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Ghi nhớ đăng nhập"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Đăng ki
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#">Quên mật khẩu?</Link>
                  </Grid>
                  <Grid item>
                    <Link href="/pages/auth/login">{"Đăng nhập►"}</Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};
export default Register;
