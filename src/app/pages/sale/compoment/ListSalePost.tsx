import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {SaleInterface} from "@/app/interface/SaleInterface";
import {FormatCurrency} from "@/app/constant/Fomart";

const ListSalePost = ({array}: { array: SaleInterface[] }) => {
    return (
        <>
            <style jsx>{`
                /* CSS để tạo hiệu ứng hover */
                .card:hover {
                    transform: translateY(-5px);
                    transition: transform 0.2s;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                }


                /* Đảm bảo rằng liên kết bao quanh toàn bộ thẻ không bị gạch chân */
                .card a {
                    text-decoration: none;
                    color: inherit;
                }

                .navbar-custom {
            background-color: #4CAF50; /* Màu nền xanh lá */
        }
        .navbar-brand,
        .nav-link {
            color: white !important; /* Màu chữ trắng */
        }
        .search-bar {
            width: 50%; /* Độ rộng của thanh tìm kiếm */
        }
        .dropdown-menu a:hover {
            background-color: #4CAF50; /* Màu nền khi hover */
            color: white !important; /* Màu chữ khi hover */
        }
            `}</style>
            <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
          </ul>
          <form className="d-flex mx-auto search-bar">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-light" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
            <div className="container my-2">
                <div className="row">

                        {
                            [...array ?? []].map((sale, index) => {
                                return (
                                    <div className="col-md-3 mt-2 mb-2" key={index}>
                                        <Link href="#" className="text-decoration-none">
                                            <div className="card" style={{width: "100%"}}>
                                                <Image src={sale.images[0]}
                                                       className="card-img-top"
                                                       width={0}
                                                       height={0}
                                                       sizes="100vw"
                                                       style={{width: '100%', height: 'auto'}}
                                                       alt="Product Image"/>
                                                <div className="card-body">
                                                    <h5 className="card-title" style={{color: "black"}}>{sale.title}</h5>
                                                    <p className="card-text text-secondary">{sale.productStatus}</p>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <span className="text-danger fw-bold">{FormatCurrency(sale.price)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })}


            </div>
            </div>
        </>
    );
};

export default ListSalePost;