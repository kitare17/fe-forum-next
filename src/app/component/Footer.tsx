
export default function Footer() {
    return (
        <div className="container-fluid bg-warning text-dark footer mt-0 py-1 wow fadeIn" data-wow-delay="0.1s">
            <div className="row justify-content-center">
                <div className="container py-5">
                    <div className="row g-5">
                        <div className="col-4 offset-1 col-sm-2">
                            <h5>Links</h5>
                            <ul className="list-unstyled">
                                <li><a href="#">Trang chủ</a></li>
                                <li><a href="#">Giới thiệu</a></li>
                                <li><a href="#">Diễn đàn</a></li>
                                <li><a href="#">Liên hệ</a></li>
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
                                <a className="" href="">
                                    <img src="https://img.icons8.com/?size=39&id=13963&format=png"></img>
                                    </a>
                                <a className="" href="">
                                    <img src="https://img.icons8.com/?size=39&id=118497&format=png"></img>
                                    </a>
                                <a className="" href="">
                                    <img src="https://img.icons8.com/?size=39&id=V5cGWnc9R4xj&format=png"></img>
                                    </a>
                                <a className="" href="">
                                    <img src="https://img.icons8.com/?size=39&id=32323&format=png"></img>
                                    </a>
            
                                
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <p>© Copyright 2024 by Hải Yến dễ thương</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
