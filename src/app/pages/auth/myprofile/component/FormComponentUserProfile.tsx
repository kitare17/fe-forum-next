"use client";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogActions } from "@mui/material";
import React, { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateProfile } from "@/app/store/action/user";
import { UserInterface } from "@/app/interface/User";
import { getBase64 } from "../../../../../utils";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const FormComponentUserProfile = ({
  idUser,
  changeProfile,
  handleShowUserProfile,
  openEditPopup,
  setopenEditPopup,
}: {
  idUser: string;
  changeProfile: UserInterface;
  handleShowUserProfile: () => void;
  openEditPopup: boolean;
  setopenEditPopup: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(changeProfile?.avatar);
  const [currentURL, setCurrentURL] = useState("");

  const { register, handleSubmit, reset, formState: { errors }, setValue, getValues } = useForm({
    defaultValues: {
      fullname: changeProfile?.fullname,
      phone: changeProfile?.phone,
      email: changeProfile?.email,
      username: changeProfile?.username,
      avatar: changeProfile?.avatar,
    },
  });

  useEffect(() => {
    setCurrentURL(window.location.href);
    setValue("fullname", changeProfile?.fullname);
    setValue("phone", changeProfile?.phone);
    setValue("email", changeProfile?.email);
    setValue("username", changeProfile?.username);
    setValue("avatar", changeProfile?.avatar);
  }, [changeProfile, setValue]);

  const handleUpdateProfile = (data: any) => {
    const userProfile = {
      fullname: data.fullname,
      phone: data.phone,
      email: data.email,
      username: data.username,
      avatar: avatar,
    };


    

  //@ts-ignore
    dispatch(updateProfile({ idUser: idUser, inforUpdate: userProfile })).then(
      (result: any) => {
        if (result?.payload?.data?.status === "Error") {
          toast.error(result?.payload?.data?.message);
        } else {
          toast.success("Chỉnh sửa thông tin thành công");
        }
        handleShowUserProfile();
        setopenEditPopup(false);
      }
    );
  };

  const handleOnchangeAvatar = async ({ fileList }: any) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview);
  };

  return (
    <div>
      <Dialog open={openEditPopup} onClose={() => setopenEditPopup(false)}>
        <h2 className="text-center" style={{ paddingTop: "20px" }}>
          Chỉnh sửa hồ sơ
        </h2>
        <DialogContent>
          <label htmlFor="upload-avatar" style={{ paddingBottom: "20px" }}>
            <div>
              {!currentURL?.includes("pages/admin/manageAccount") && (
                <Upload maxCount={1} onChange={handleOnchangeAvatar}>
                  <label htmlFor="avatar-upload">
                    <UploadOutlined />
                    Chọn ảnh đại diện
                  </label>
                </Upload>
              )}
              {avatar && (
                <img
                  id="avatar"
                  src={avatar}
                  style={{
                    height: "70px",
                    width: "70px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  alt="avatar"
                />
              )}
            </div>
          </label>
          <TextField
            autoFocus
            margin="dense"
            label="Tên tài khoản"
            id="username"
            fullWidth
            {...register("username", {
              required: "Phải nhập tên tài khoản",
            })}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Họ và tên"
            id="fullname"
            fullWidth
            {...register("fullname", {
              required: "Phải nhập họ và tên",
            })}
            error={!!errors.fullname}
            helperText={errors.fullname?.message}
          />
          <TextField
            margin="dense"
            label="Email"
            id="email"
            fullWidth
            {...register("email", {
              required: "Phải nhập email",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Phải nhập đúng format email",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            margin="dense"
            label="Số điện thoại"
            id="phone"
            fullWidth
            {...register("phone", {
              required: "Phải nhập số điện thoại",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Số điện thoại phải đúng format",
              },
            })}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setopenEditPopup(false)}>Hủy</Button>
          <Button
            onClick={handleSubmit(handleUpdateProfile)}
            variant="contained"
            color="primary"
          >
            Lưu thay đổi
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormComponentUserProfile;
