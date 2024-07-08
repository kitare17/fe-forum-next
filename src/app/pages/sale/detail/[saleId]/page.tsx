"use client"
import CarouselComponent from "@/app/component/Carousel";
import Image from "next/image";
import {useParams, useRouter} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from 'react';
import {RootState} from "@/app/store";
import {getOneSalePost, getRelatedProduct} from "@/app/store/action/sale"; //import dispatch o day

//Get param

const SaleDetail = () => {
    const dipatch = useDispatch();
    const {saleId}: { saleId: string } = useParams();
    // alert(saleId)
    const {
        saleDetail,
        listRelatedProduct
    } =
        useSelector((state: RootState) => state.sale);
    useEffect(() => {
        //@ts-ignore
        dipatch(getOneSalePost(saleId));
        //@ts-ignore
        dipatch(getRelatedProduct({saleId: saleId}));

    }, [])
    return (
        <>
            <style jsx>{`


                button {
                    border: none;
                    background: none;
                }

                body {

                }

            `}</style>
            <div className="bg-light py-3">
                <script src="https://kit.fontawesome.com/a00e93d0d1.js" crossOrigin="anonymous" async></script>
                <div className="container bg-white border border-1 mt-4"
                     style={{paddingBottom: '20px', borderRadius: '1%'}}>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="row p-3">
                                <div className="col-3">
                                    <Image
                                        src="https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-6/408401133_3503012760028740_2340052329278457272_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEZpsFWgJ3ROwCsLm3UGFfiPM5N2i9QNWw8zk3aL1A1bM8xvFXHAgIHe4_pT5Qx-QkwRyiEPIN_76pKgFvl9VZ9&_nc_ohc=dW0XiD2zk_EQ7kNvgHkbj5t&_nc_ht=scontent.fdad3-5.fna&oh=00_AYBfYMhxfpk2YosCzzWQJuQppZrzUDAFyXplFmjsGSHPhQ&oe=66609E51"
                                        className="card-img-top"
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        style={{width: '100%', height: 'auto', borderRadius: '50%'}}
                                        alt="Product Image"/>
                                    {/*<img*/}
                                    {/*    src="https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-6/408401133_3503012760028740_2340052329278457272_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEZpsFWgJ3ROwCsLm3UGFfiPM5N2i9QNWw8zk3aL1A1bM8xvFXHAgIHe4_pT5Qx-QkwRyiEPIN_76pKgFvl9VZ9&_nc_ohc=dW0XiD2zk_EQ7kNvgHkbj5t&_nc_ht=scontent.fdad3-5.fna&oh=00_AYBfYMhxfpk2YosCzzWQJuQppZrzUDAFyXplFmjsGSHPhQ&oe=66609E51"*/}
                                    {/*    style={{borderRadius: '50%', width: '100%'}}/>*/}
                                </div>
                                <div className="col-9">
                                    <h5>{saleDetail?.creator?.username}</h5>
                                    <p>{saleDetail?.createdAt}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8" style={{textAlign: 'right'}}>
                            <button><i className="fa-solid fa-bars"></i></button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12"></div>
                    </div>
                    <div className="row">
                        <div className="col-md-7">
                            {saleDetail?.images && (
                                <CarouselComponent items={saleDetail.images.map(image => ({image}))}/>
                            )}
                        </div>
                        <div className="col-md-5">
                            <div className="row">
                                <div className="col-md-12">
                                    <h4>{saleDetail?.title}</h4>
                                    <p className="text-danger fw-bolder fs-4">250.0000 đ</p>
                                    <hr/>
                                    <div><i className="fa-regular fa-clock"></i> Đăng 12 ngày trước</div>
                                    <div><i className="fa-solid fa-location-dot"></i> {saleDetail?.address}</div>
                                    <div><i className="fa-solid fa-plane"></i> Xuất xứ :{saleDetail?.origin}</div>
                                    <div><i className="fa-solid fa-wand-magic-sparkles"></i> Thương hiệu
                                        : {saleDetail?.brand}</div>
                                    <hr/>
                                    <h4>Mô tả chi tiết</h4>
                                    <p>{saleDetail?.title}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-md-6">
                            <button style={{width: '100%'}}><i className="fa-regular fa-heart"></i> Thích</button>
                        </div>
                        <div className="col-md-6">
                            <button style={{width: '100%'}}><i className="fa-solid fa-message"></i> Liên hệ</button>
                        </div>
                    </div>
                </div>

                <div className="container bg-white border border-1 my-5">
                    <div className="row">
                        <div className='col-md-12 my-2'>
                            <h3>Tin rao tương tự</h3>
                            <hr/>
                        </div>
                    </div>

                    <div className="row mt-1 mb-5">
                        {[...(listRelatedProduct ?? [])].map(sale => (
                            <div className="col-md-2" key={sale._id}>
                                <div className="">
                                    <a href="#" className="text-decoration-none">
                                        <div className="card" style={{width: '100%'}}>
                                            <img src={sale?.images[0]} className="card-img-top"
                                                 alt="Product Image"/>
                                            <div className="card-body">
                                                <h5 className="card-title" style={{color: 'black'}}>{sale?.title}</h5>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span className="text-danger fw-bold">{sale?.price}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>

                        ))}

                    </div>

                </div>
            </div>

        </>
    )
}


export default SaleDetail