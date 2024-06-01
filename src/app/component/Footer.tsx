import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <div className="container-fluid bg-warning text-dark footer mt-0 py-1 wow fadeIn" data-wow-delay="0.1s">
            <div className="row justify-content-center">
                <div className="container py-5">
                    <div className="row g-5">
                        <div className="col-4 offset-1 col-sm-2">
                            <h5>Links</h5>
                            <ul className="list-unstyled">
                                <li><Link href="#">Trang chủ</Link></li>
                                <li><Link href="#">Giới thiệu</Link></li>
                                <li><Link href="#">Diễn đàn</Link></li>
                                <li><Link href="#">Liên hệ</Link></li>
                            </ul>
                        </div>
                        <div className="col-7 col-sm-5">
                            <h5>Về chúng tôi</h5>
                            <address>
                                Khu Đô Thị FPT, Hòa Hải<br/>
                                Ngũ Hành Sơn, Đà Nẵng<br/>
                                VIETNAM<br/>
                                <i className="fa fa-phone fa-lg"></i>: +84123456789<br/>
                                <i className="fa fa-fax fa-lg"></i>: +84123456789<br/>
                                <i className="fa fa-envelope fa-lg"></i>: <a href="example@fpt.edu.vn">
                                example@fpt.edu.vn</a>
                            </address>
                        </div>
                        <div className="col-12 col-sm-4 align-self-center">
                            <div className="d-flex pt-6">
                                {/*<Link href={"/"}>*/}
                                {/*    <Image src="https://img.icons8.com/?size=39&id=13963&format=png" alt={"logo"}></Image>*/}
                                {/*</Link>*/}
                                {/*<Link href={"/"}>*/}
                                {/*    <Image src="https://img.icons8.com/?size=39&id=118497&format=png" alt={"logo"}></Image>*/}
                                {/*</Link>*/}
                                {/*<Link href={"/"}>*/}
                                {/*    <Image src="https://img.icons8.com/?size=39&id=V5cGWnc9R4xj&format=png" alt={"logo"}></Image>*/}
                                {/*</Link>*/}
                                {/*<Link href={"/"}>*/}
                                {/*    <Image src="https://img.icons8.com/?size=39&id=32323&format=png" alt={"logo"}></Image>*/}
                                {/*</Link>*/}
            
                                
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <p>© Copyright 2024 by FU-Forum</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
