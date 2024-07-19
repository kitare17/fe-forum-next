"use client"
import CarouselComponent from "@/app/component/Carousel";
import Image from "next/image";
import {useParams, useRouter} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from 'react';
import {RootState} from "@/app/store";
import {Controller, useForm} from "react-hook-form";
import {BlogInterface} from "@/app/interface/Blog";
import TextField from "@mui/material/TextField";
//@ts-ignore
import FineUploaderTraditional from 'fine-uploader-wrappers'
//@ts-ignore
import Gallery from 'react-fine-uploader'
import 'react-fine-uploader/gallery/gallery.css'

import {SaleInterface} from "@/app/interface/SaleInterface";
import {FormControl, FormHelperText, FormLabel, MenuItem, Radio, RadioGroup, Select} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import {createProduct, getAllCategory} from "@/app/store/action/sale";
import dynamic from "next/dynamic";

const UploadPost = () => {
    const dipatch = useDispatch();
    const router=useRouter();
    const {listCategory} = useSelector((state: RootState) => state.sale);
    const [options, setOptions]
        = useState<[
        { label: string | undefined, value: string | undefined }
    ] | []>([])
    const [productImages, setProductImages] = useState<string[]>([]);
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
                "origin": "",
                "address": "",
                "phone":""


            }
        }
    )

    const {errors} = formState;

    useEffect(() => {
        // @ts-ignore
        dipatch(getAllCategory());

    }, []);

    useEffect(() => {
        if (listCategory) [...(listCategory ?? [])].map(cate => {
            // @ts-ignore
            setOptions([...options, {label: cate?.name, value: cate?._id}])
        })
    }, [listCategory]);


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
                //@ts-ignore
                onComplete: (id, name, responseJSON, xhr) => {
                    // Xử lý khi tải lên hoàn tất
                    if (xhr.status === 200) {
                        console.log('File uploaded successfully!', responseJSON);
                        var link = "http://localhost:9000/commons/" + responseJSON.name;
                        setProductImages([...productImages, link])
                    } else {
                        console.error('File upload failed.');
                    }
                }
            }
        }
    })
    const handleSubmitProduct = () => {
        // var title = getValues("title");
        // var detail = getValues("detail");
        // var image = getValues("images");
        // var price = getValues("price");
        // var productStatus = getValues("productStatus");
        // var brand = getValues("brand");
        // var category = getValues("category");
        // var creator = getValues("creator");
        // var origin = getValues("origin");
        // var address = getValues("address");

        var newSale: SaleInterface = {
            title: getValues("title"),
            detail: getValues("detail"),
            images: productImages,
            price: Number(getValues("price")),
            productStatus: getValues("productStatus"),
            brand: getValues("brand"),
            category: getValues("category"),
            origin: getValues("origin"),
            address: getValues("address"),
            phone:getValues("phone")

        }
        console.log(newSale);
        const userId: string | undefined = (typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem('authnRes') ?? "{}") : {}).userEmailId
        //@ts-ignore
        dipatch(createProduct({product:newSale, creator:userId}))
        router.replace("/pages/sale");
    }


    const handleAddImage = () => {

    }
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
                        <Gallery uploader={uploader}/>
                    </div>
                    {/* Bên phải: Thông tin sản phẩm */}
                    <div className="col-md-6 form-section">
                        <h4>Thông Tin Sản Phẩm</h4>
                        <form>
                            <div className="mb-3">
                                <FormControl fullWidth component="fieldset" error={Boolean(errors.category)}>
                                    <FormLabel component="legend">Tình trạng</FormLabel>
                                    <Controller
                                        name="category"
                                        control={control}
                                        rules={{required: 'This field is required'}}
                                        render={({field}) => (
                                            <Select {...field}>
                                                {options.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        )}
                                    />
                                    {errors.category &&
                                        <FormHelperText>{errors.category.message}</FormHelperText>}
                                </FormControl>
                            </div>
                            <div className="mb-3">
                                <FormControl component="fieldset" error={Boolean(!!errors.productStatus)}>
                                    <FormLabel component="legend">Tình trạng </FormLabel>
                                    <Controller

                                        rules={{required: 'Vui lòng lựa chọn'}}
                                        {...register(
                                            'productStatus',
                                            {
                                                required: "Vui lòng lựa chọn"
                                            }
                                        )}
                                        control={control}
                                        name="productStatus"
                                        render={({field}) => (
                                            <RadioGroup {...field}

                                            >
                                                <FormControlLabel
                                                    value="Đã Sử Dụng"
                                                    control={<Radio/>}
                                                    label="Đã Sử Dụng"
                                                />
                                                <FormControlLabel
                                                    value="Mới"
                                                    control={<Radio/>}
                                                    label="Mới"
                                                />

                                            </RadioGroup>
                                        )}
                                    />
                                    {errors.productStatus &&
                                        <FormHelperText>{errors?.productStatus.message}</FormHelperText>}
                                </FormControl>
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
                                        'address',
                                        {
                                            required: "Phải nhập địa chỉ giao dịch"
                                        }
                                    )}
                                    error={!!errors.address}
                                    helperText={errors.address?.message}
                                />
                            </div>

                            <div className="mb-3">

                                <TextField
                                    id="address"
                                    fullWidth
                                    margin="normal"
                                    required
                                    label="Nhập số điện thoại"
                                    variant="outlined"
                                    {...register(
                                        'phone',
                                        {
                                            required: "Phải nhập số điện thoại"
                                        }
                                    )}
                                    error={!!errors.address}
                                    helperText={errors.address?.message}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100"
                                    onClick={handleSubmit(handleSubmitProduct)}>Đăng Bài
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default UploadPost;