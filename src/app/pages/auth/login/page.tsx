"use client";
import React, {useEffect} from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import { LoginInterface } from "@/app/interface/LoginInterface";
import { fetchLogin } from "@/app/store/action/auth";
import { AppDispatch } from "@/app/store";
import { RootState } from "@/app/store";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const defaultTheme = createTheme();

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user, isLoading, isError, message } = useSelector(
    (state: RootState) => state.auth
  );


  useEffect(() => {
    if(isError){
      toast.error(message);
    }
    // @ts-ignore
    if(user?.token){
      router.push("/");
    }

  }, [isError,isLoading,user]);


  //submit form login
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    // Ensure the data conforms to LoginInterface
    const userLogin: LoginInterface = { email, password };
    dispatch(fetchLogin(userLogin))
    //     .then((result) => {
    //   console.log("result", result)
    //   if (result?.payload?.code === "AxiosError") {
    //     toast.error("Mật khẩu hoặc email sai");
    //   } else{
    //     toast.success("Đăng nhập thành công");
    //
    //   router.push("/");
    //   }
    // });
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
                Đăng nhập
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
                  label="Username & Email"
                  name="email"
                  type="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Mật khẩu"
                  type="password"
                  id="password"
                  autoComplete="current-password"
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
                  Đăng nhập
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#">Quên mật khẩu?</Link>
                  </Grid>
                  <Grid item>
                    <Link href="/pages/auth/register">{"Đăng kí►"}</Link>
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
export default Login;
