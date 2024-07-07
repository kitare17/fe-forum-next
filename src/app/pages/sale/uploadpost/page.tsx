"use client"
import CarouselComponent from "@/app/component/Carousel";
import Image from "next/image";
import {useParams, useRouter} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from 'react';
import {RootState} from "@/app/store";

 
 //Get param
 
const UploadPost = () => {
    const dipatch = useDispatch();
   
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
                    <h4>Upload Hình Ảnh và Video Sản Phẩm</h4>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="productImage" className="form-label">Hình Ảnh Sản Phẩm</label>
                            <input type="file" className="form-control" id="productImage" accept="image/*" multiple />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="productVideo" className="form-label">Video Sản Phẩm</label>
                            <input type="file" className="form-control" id="productVideo" accept="video/*" multiple />
                        </div>
                    </form>
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
                                <input className="form-check-input" type="radio" name="condition" id="newCondition" value="new" />
                                <label className="form-check-label" htmlFor="newCondition">Mới</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="condition" id="usedCondition" value="used" />
                                <label className="form-check-label" htmlFor="usedCondition">Đã Sử Dụng</label>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Tiêu Đề Sản Phẩm</label>
                            <input type="text" className="form-control" id="title" placeholder="Nhập tiêu đề sản phẩm" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Mô Tả Chi Tiết</label>
                            <textarea className="form-control" id="description" rows="3" placeholder="Nhập mô tả chi tiết"></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Giá Tiền</label>
                            <input type="number" className="form-control" id="price" placeholder="Nhập giá tiền" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="brand" className="form-label">Thương Hiệu</label>
                            <input type="text" className="form-control" id="brand" placeholder="Nhập thương hiệu" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="origin" className="form-label">Xuất Xứ</label>
                            <input type="text" className="form-control" id="origin" placeholder="Nhập xuất xứ" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Địa Chỉ Giao Dịch</label>
                            <input type="text" className="form-control" id="address" placeholder="Nhập địa chỉ giao dịch" />
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