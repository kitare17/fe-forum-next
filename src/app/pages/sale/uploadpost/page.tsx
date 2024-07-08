"use client"
import CarouselComponent from "@/app/component/Carousel";
import Image from "next/image";
import {useParams, useRouter} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from 'react';
import {RootState} from "@/app/store";
import {useForm} from "react-hook-form";
import {BlogInterface} from "@/app/interface/Blog";
import TextField from "@mui/material/TextField";
import Gallery from 'react-fine-uploader'
import FineUploaderTraditional from 'fine-uploader-wrappers'
//Get param
import 'react-fine-uploader/gallery/gallery.css'
const UploadPost = () => {
    const dipatch = useDispatch();

    const {
        register,
        handleSubmit,
        reset,
        formState,
        control,
        trigger,
        setValue,
        getValues
    } = useForm(
        {
            defaultValues: {
                "title": "",
                "detail": "",
                "images": "",
                "price": "",
                "productStatus": "",
                "brand": "",
                "category": "",
                "creator": "",
                "origin":"",
                "address":""


            }
        }
    )

    const {errors} = formState;


    const uploader = new FineUploaderTraditional({

        options: {
            chunking: {
                enabled: true
            },
            deleteFile: {
                enabled: true,
                endpoint: '/uploads'
            },
            request: {
                endpoint: 'http://localhost:8080/minio/upload-multi-image'
            },
            retry: {
                enableAuto: false
            },
            callbacks: {
                onComplete: (id, name, responseJSON, xhr) => {
                    // Xử lý khi tải lên hoàn tất
                    if (xhr.status === 200) {
                        console.log('File uploaded successfully!');
                    } else {
                        console.error('File upload failed.');
                    }
                }
            }
        }
    })



    return (
        <>
            <style jsx>{`


                body {
                    background-color: #f8f9fa;
                }

                .container {
                    background: white;
                    padding: 2rem;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }

                .form-title {
                    background-color: #007bff;
                    color: white;
                    padding: 10px;
                    border-radius: 5px;
                    margin-bottom: 20px;
                }

                .form-section {
                    margin-bottom: 20px;
                }

                .form-control, .form-select {
                    border-radius: 0.25rem;
                }

                .btn-primary {
                    background-color: #007bff;
                    border-color: #007bff;
                }

            `}</style>
            <div className="my-5 container">
                <h2 className="text-center form-title">Đăng Bài Bán Hàng</h2>
                <div className="row">
                    {/* Bên trái: Upload hình ảnh và video */}
                    <div className="col-md-6 form-section">
                        <h4>Upload Hình Ảnh Sản Phẩm</h4>
                        <Gallery uploader={ uploader } />
                    </div>
                    {/* Bên phải: Thông tin sản phẩm */}
                    <div className="col-md-6 form-section">
                        <h4>Thông Tin Sản Phẩm</h4>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="category" className="form-label">Danh Mục</label>
                                <select className="form-select" id="category">
                                    <option value="" selected>Chọn danh mục</option>
                                    <option value="1">Danh mục 1</option>
                                    <option value="2">Danh mục 2</option>
                                    <option value="3">Danh mục 3</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Tình Trạng</label>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="condition" id="newCondition"
                                           value="new"/>
                                    <label className="form-check-label" htmlFor="newCondition">Mới</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="condition" id="usedCondition"
                                           value="used"/>
                                    <label className="form-check-label" htmlFor="usedCondition">Đã Sử Dụng</label>
                                </div>
                            </div>
                            <div className="mb-3">
                                <TextField
                                    id="title"
                                    fullWidth
                                    margin="normal"
                                    required
                                    label="Tiêu đề sản phẩm"
                                    variant="outlined"
                                    {...register(
                                        'title',
                                        {
                                            required: "Phải nhập title"
                                        }
                                    )}
                                    error={!!errors.title}
                                    helperText={errors.title?.message}
                                />
                            </div>
                            <div className="mb-3">
                                <TextField
                                    id="detail"
                                    fullWidth
                                    margin="normal"
                                    required
                                    label="Mô Tả Chi Tiết"
                                    variant="outlined"
                                    {...register(
                                        'detail',
                                        {
                                            required: "Phải nhập chi tiết"
                                        }
                                    )}
                                    error={!!errors.detail}
                                    helperText={errors.detail?.message}
                                />
                            </div>
                            <div className="mb-3">
                                <TextField
                                    id="price"
                                    fullWidth
                                    margin="normal"
                                    required
                                    type="number"
                                    label="Nhập giá tiền"
                                    variant="outlined"
                                    {...register(
                                        'price',
                                        {
                                            required: "Phải nhập giá"
                                        }
                                    )}
                                    error={!!errors.price}
                                    helperText={errors.price?.message}
                                />

                            </div>
                            <div className="mb-3">

                                <TextField
                                    id="brand"
                                    fullWidth
                                    margin="normal"
                                    required
                                    label="Nhập thương hiệu"
                                    variant="outlined"
                                    {...register(
                                        'brand',
                                        {
                                            required: "Phải nhập thương hiệu"
                                        }
                                    )}
                                    error={!!errors.brand}
                                    helperText={errors.brand?.message}
                                    />


                            </div>
                            <div className="mb-3">


                                <TextField
                                    id="origin"
                                    fullWidth
                                    margin="normal"
                                    required
                                    label="Nhập xuất xứ"
                                    variant="outlined"
                                    {...register(
                                        'origin',
                                        {
                                            required: "Phải nhập xuất xứ"
                                        }
                                    )}
                                    error={!!errors.origin}
                                    helperText={errors.origin?.message}
                                />

                            </div>
                            <div className="mb-3">

                                <TextField
                                    id="address"
                                    fullWidth
                                    margin="normal"
                                    required
                                    label="Nhập địa chỉ giao dịch"
                                    variant="outlined"
                                    {...register(
                                        'origin',
                                        {
                                            required: "Phải nhập địa chỉ giao dịch"
                                        }
                                    )}
                                    error={!!errors.address}
                                    helperText={errors.address?.message}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Đăng Bài</button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}


export default UploadPost