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
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const defaultTheme = createTheme();

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user, isLoading, isError, message, isSuccess } = useSelector(
    (state: RootState) => state.auth
  );

  React.useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success(message);
      router.push("/pages/auth/login");
    }
  }, [isError, isLoading, isSuccess]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInterface>({
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const onSubmit = (data: RegisterInterface) => {
    dispatch(fetchRegister(data)).then((result) => {
      console.log(result);
    });
  };

  return (
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
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                autoFocus
                {...register("email", {
                  required: "Phải nhập email",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Phải nhập đúng format email",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message?.toString()}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="User name"
                {...register("username", {
                  required: "Phải nhập username",
                  validate: (value) => value.trim() !== "" || "Username không được để trống",
                })}
                error={!!errors.username}
                helperText={errors.username?.message?.toString()}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Mật khẩu"
                type="password"
                {...register("password", {
                  required: "Phải nhập mật khẩu",
                  minLength: {
                    value: 4,
                    message: "Mật khẩu phải có ít nhất 4 ký tự",
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message?.toString()}
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
                Đăng kí
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
  );
};

export default Register;
