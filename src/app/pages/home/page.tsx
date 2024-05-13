const HomePage = () => {
    return(
        < >
            <div className="container-fluid p-0 wow fadeIn" data-wow-delay="0.1s">
                <div
                    id="header-carousel"
                    className="carousel slide"
                    data-bs-ride="carousel"
                >
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="w-100" src="img/FPT1.jpg" alt="Image"/>
                            <div className="carousel-caption">
                                <div className="container">
                                    <div className="row justify-content-center">
                                        <div className="col-lg-8">
                                            <h1 className="display-1 text-white mb-5 animated slideInDown">
                                                Diễn đàn học tập dành riêng cho sinh viên FU
                                            </h1>
                                            <a href="" className="btn btn-warning text-dark py-sm-3 px-sm-4 fw-bold">
                                                Khám phá ngay
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img className="w-100" src="img/FPT2.jpg" alt="Image"/>
                            <div className="carousel-caption">
                                <div className="container">
                                    <div className="row justify-content-center">
                                        <div className="col-lg-7">
                                            <h1 className="display-1 text-white mb-5 animated slideInDown">
                                                Đặt câu hỏi ngay nếu bạn cần giải đáp
                                            </h1>
                                            <a href="" className="btn btn-warning py-sm-3 px-sm-4 fw-bold">
                                                Khám phá ngay
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#header-carousel"
                        data-bs-slide="prev"
                    >
            <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
            ></span>
                        <span className="visually-hidden">Trước</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#header-carousel"
                        data-bs-slide="next"
                    >
            <span
                className="carousel-control-next-icon"
                aria-hidden="true"
            ></span>
                        <span className="visually-hidden">Tiếp</span>
                    </button>
                </div>
            </div>
            <div className="container-fluid top-feature py-5 pt-lg-0">
                <div className="container py-5 pt-lg-0">
                    <div className="row gx-0">
                        <div className="col-lg-4 wow fadeIn" data-wow-delay="0.1s">
                            <div
                                className="bg-white shadow d-flex align-items-center h-100 px-5"
                                style={{minHeight: "160px"}}
                            >
                                <div className="d-flex">
                                    <div className="flex-shrink-0 btn-lg-square rounded-circle bg-light">
                                        <img src="https://img.icons8.com/?size=50&id=35218&format=png" alt=""/>
                                    </div>
                                    <div className="ps-3">
                                        <h4>Hoàn toàn miễn phí</h4>
                                        <span>
                      FU-Forum là diễn đàn học tập hoàn toàn miễn phí
                    </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 wow fadeIn" data-wow-delay="0.3s">
                            <div
                                className="bg-white shadow d-flex align-items-center h-100 px-5"
                                style={{minHeight: "160px"}}
                            >
                                <div className="d-flex">
                                    <div className="flex-shrink-0 btn-lg-square rounded-circle bg-light">
                                        <img src="https://img.icons8.com/?size=60&id=cjUb4tRvBCNt&format=png" alt=""/>
                                    </div>
                                    <div className="ps-3">
                                        <h4>Hỏi&Đáp</h4>
                                        <span>
                      Bạn có thắc mắc, hãy đặt câu hỏi ngay, FU-Forum sẽ giúp
                      bạn đi tìm lời giải.
                    </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 wow fadeIn" data-wow-delay="0.5s">
                            <div
                                className="bg-white shadow d-flex align-items-center h-100 px-5"
                                style={{minHeight: "160px"}}
                            >
                                <div className="d-flex">
                                    <div className="flex-shrink-0 btn-lg-square rounded-circle bg-light">
                                        <img src="https://img.icons8.com/?size=60&id=63312&format=png" alt=""/>
                                    </div>
                                    <div className="ps-3">
                                        <h4>24/7</h4>
                                        <span>
                      FU-Forum luôn sẵn sàng mỗi khi bạn cần. Đừng ngần ngại,
                      chúng tớ luôn ở đây vì bạn.
                    </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-5 align-items-end">
                        <div
                            className="col-lg-3 col-md-5 wow fadeInUp"
                            data-wow-delay="0.1s"
                        >
                            <img
                                className="img-fluid rounded"
                                style={{height: "450px"}}
                                data-wow-delay="0.1s"
                                src="img/about.jpg"
                            />
                        </div>
                        <div
                            className="col-lg-6 col-md-7 wow fadeInUp"
                            data-wow-delay="0.3s"
                        >
                            <h1 className="display-1 mb-0"> 35000 </h1>
                            <p className="text-warning mb-4 fs-4 fw-bold">sinh viên FU</p>
                            <h1 className="display-5 mb-4">
                                Tại 5 cơ sở
                            </h1>
                            <p className="mb-4">
                                Trải dài từ Bắc tới Nam, sinh viên từ 5 cơ sở FU bao gồm Hà Nội, Hồ Chí Minh, Đà Nẵng,
                                Quy Nhơn, Cần Thơ đều có một mục tiêu chung "PASS MÔN". Vì thế, FU-Forum tạo nên diễn
                                đàn này để chúng ta cùng nhau học tập, hỏi đáp và lưu trữ tài nguyên. Đừng ngại ngần,
                                hãy chia sẻ nếu bạn có kiến thức gì hay ho nhé!
                            </p>
                            <a className="btn btn-warning py-3 px-4 fw-bold" href="">
                                Khám phá ngay
                            </a>
                        </div>
                        <div
                            className="col-lg-3 col-md-12 wow fadeInUp"
                            data-wow-delay="0.5s"
                        >
                            <div className="row g-5">
                                <div className="col-12 col-sm-6 col-lg-12">
                                    <div className="border-start ps-4">
                                        <i className="fa fa-award fa-3x text-success mb-3"></i>
                                        <h4 className="mb-3">PASS</h4>
                                        <span>
                    Thuật ngữ mà mọi sinh viên FU đều muốn sở hữu mỗi khi kỳ thi Final khẽ gõ cửa. Dấu hiệu của một học kỳ ấm no, hạnh phúc.
                    </span>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-lg-12">
                                    <div className="border-start ps-4">
                                        <i className="fa fa-exclamation-triangle fa-3x text-danger mb-3"></i>
                                        <h4 className="mb-3">NOT PASS</h4>
                                        <span>
                     Thuật ngữ mang đến sự mất mát, đau thương cho mọi thế hệ sinh viên FU. "Ting ting" - "Phí học lại của bạn là 2M3"
                    </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="container-fluid facts my-5 py-5"
                data-parallax="scroll"
                data-image-src="img/FPT3.jpg"
            >
                <div className="container py-5">
                    <div className="row g-5">
                        <div
                            className="col-sm-6 col-lg-3 text-center wow fadeIn"
                            data-wow-delay="0.1s"
                        >
                            <h1 className="display-4 text-white" data-toggle="counter-up">
                                100%
                            </h1>
                            <span className="fs-5 fw-semi-bold text-light">
                Năng lượng
              </span>
                        </div>
                        <div
                            className="col-sm-6 col-lg-3 text-center wow fadeIn"
                            data-wow-delay="0.3s"
                        >
                            <h1 className="display-4 text-white" data-toggle="counter-up">
                                100%
                            </h1>
                            <span className="fs-5 fw-semi-bold text-light">
                Kiến thức
              </span>
                        </div>
                        <div
                            className="col-sm-6 col-lg-3 text-center wow fadeIn"
                            data-wow-delay="0.5s"
                        >
                            <h1 className="display-4 text-white" data-toggle="counter-up">
                                100%
                            </h1>
                            <span className="fs-5 fw-semi-bold text-light">
                Kỹ năng
              </span>
                        </div>
                        <div
                            className="col-sm-6 col-lg-3 text-center wow fadeIn"
                            data-wow-delay="0.7s"
                        >
                            <h1 className="display-4 text-white" data-toggle="counter-up">
                                100%
                            </h1>
                            <span className="fs-5 fw-semi-bold text-light">
                PASS
              </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-5 align-items-center">
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                            <p className="fs-5 fw-bold text-warning">Chọn FU-Forum ? </p>
                            <h1 className="display-5 mb-4">
                                Lựa chọn hàng đầu của sinh viên FU
                            </h1>
                            <p className="mb-4">
                                Có rất nhiều lý do khiến sinh viên FU nên đăng ký tài khoản FU-Forum. Nơi đây là diễn
                                đàn học tập, hoàn toàn miễn phí, các bạn có thể hỏi và đáp với nhau. Đặc biệt, các bạn
                                có thể chia sẻ những kiến thức hay những tài liệu hay cho các bạn thông qua FU-Forum. Rủ
                                bạn bè cùng vào FU-Forum để học tập thôi nào!!!
                            </p>
                            <a className="btn btn-warning py-3 px-4 fw-bold" href="">
                                Khám phá ngay
                            </a>
                        </div>
                        <div className="col-lg-6">
                            <div className="row g-4 align-items-center">
                                <div className="col-md-6">
                                    <div className="row g-4">
                                        <div className="col-12 wow fadeIn" data-wow-delay="0.3s">
                                            <div
                                                className="text-center rounded py-5 px-4"
                                                style={{boxShadow: "0 0 45px rgba(0,0,0,.08)"}}
                                            >
                                                <div
                                                    className="btn-square bg-light rounded-circle mx-auto mb-4"
                                                    style={{width: "90px", height: "90px"}}
                                                >
                                                    <img src="https://img.icons8.com/?size=50&id=35218&format=png"
                                                         alt=""/>
                                                </div>
                                                <h4 className="mb-0">100% Miễn phí</h4>
                                            </div>
                                        </div>
                                        <div className="col-12 wow fadeIn" data-wow-delay="0.5s">
                                            <div
                                                className="text-center rounded py-5 px-4"
                                                style={{boxShadow: "0 0 45px rgba(0,0,0,.08)"}}
                                            >
                                                <div
                                                    className="btn-square bg-light rounded-circle mx-auto mb-4"
                                                    style={{width: "90px", height: "90px"}}
                                                >
                                                    <img src="https://img.icons8.com/?size=60&id=yIGiaaLl7bsg&format=png"
                                                         alt=""/>
                                                </div>
                                                <h4 className="mb-0">Kết nối cộng đồng sinh viên FU</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 wow fadeIn" data-wow-delay="0.7s">
                                    <div
                                        className="text-center rounded py-5 px-4"
                                        style={{boxShadow: "0 0 45px rgba(0,0,0,.08)"}}
                                    >
                                        <div
                                            className="btn-square bg-light rounded-circle mx-auto mb-4"
                                            style={{width: "90px", height: "90px"}}
                                        >
                                            <img src="https://img.icons8.com/?size=60&id=16081&format=png" alt=""/>
                                        </div>
                                        <h4 className="mb-0">Hỏi & Đáp nhanh chóng, tiện lợi </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="container-fluid quote my-5 py-5"
                data-parallax="scroll"
                data-image-src="img/carousel-2.jpg"
            >

            </div>

            <div className="container-xxl py-5">
                <div className="container">
                    <div
                        className="text-center mx-auto wow fadeInUp"
                        data-wow-delay="0.1s"
                        style={{maxWidth: "500px"}}
                    >
                        <p className="fs-5 fw-bold text-warning">Về chúng tôi</p>
                        <h1 className="display-5 mb-5">Các thành viên</h1>
                    </div>
                    <div className="row g-4">
                        <div
                            className="col-lg-3 col-md-6 wow fadeInUp"
                            data-wow-delay="0.1s"
                        >
                            <div className="team-item rounded">
                                <img className="img-fluid" style={{height: "450px"}} src="img/Khoa.jpg" alt=""/>
                                <div className="team-text">
                                    <h4 className="mb-0">Nguyễn Anh Khoa </h4>
                                    <p className="text-warning">K16 - Kỹ thuật phần mềm</p>
                                    <div className="team-social d-flex">
                                        <a className="" href="">
                                            <img src="https://img.icons8.com/?size=32&id=13963&format=png"></img>
                                        </a>
                                        <a className="" href="">
                                            <img src="https://img.icons8.com/?size=32&id=32323&format=png"></img>
                                        </a>
                                        <a className="" href="">
                                            <img src="https://img.icons8.com/?size=32&id=118497&format=png"></img>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="col-lg-3 col-md-6 wow fadeInUp"
                            data-wow-delay="0.3s"
                        >
                            <div className="team-item rounded">
                                <img className="img-fluid" style={{height: "450px"}} src="img/Anh.png" alt=""/>
                                <div className="team-text">
                                    <h4 className="mb-0">Nguyễn Ngọc Anh</h4>
                                    <p className="text-warning">K16 - Kỹ thuật phần mềm</p>
                                    <div className="team-social d-flex">
                                    <a className="" href="">
                                            <img src="https://img.icons8.com/?size=32&id=13963&format=png"></img>
                                        </a>
                                        <a className="" href="">
                                            <img src="https://img.icons8.com/?size=32&id=32323&format=png"></img>
                                        </a>
                                        <a className="" href="">
                                            <img src="https://img.icons8.com/?size=32&id=118497&format=png"></img>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="col-lg-3 col-md-6 wow fadeInUp"
                            data-wow-delay="0.5s"
                        >
                            <div className="team-item rounded">
                                <img className="img-fluid" style={{height: "450px"}} src="img/Yen.jpg" alt=""/>
                                <div className="team-text">
                                    <h4 className="mb-0">Lương Tôn Hải Yến</h4>
                                    <p className="text-warning">K16 - Kỹ thuật phần mềm</p>
                                    <div className="team-social d-flex">
                                    <a className="" href="">
                                            <img src="https://img.icons8.com/?size=32&id=13963&format=png"></img>
                                        </a>
                                        <a className="" href="">
                                            <img src="https://img.icons8.com/?size=32&id=32323&format=png"></img>
                                        </a>
                                        <a className="" href="">
                                            <img src="https://img.icons8.com/?size=32&id=118497&format=png"></img>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="col-lg-3 col-md-6 wow fadeInUp"
                            data-wow-delay="0.5s"
                        >
                            <div className="team-item rounded">
                                <img className="img-fluid" style={{height: "450px"}} src="img/Quang.jpg" alt=""/>
                                <div className="team-text">
                                    <h4 className="mb-0">Nguyễn Minh Quang</h4>
                                    <p className="text-warning">K16 - Kỹ thuật phần mềm</p>
                                    <div className="team-social d-flex">
                                    <a className="" href="">
                                            <img src="https://img.icons8.com/?size=32&id=13963&format=png"></img>
                                        </a>
                                        <a className="" href="">
                                            <img src="https://img.icons8.com/?size=32&id=32323&format=png"></img>
                                        </a>
                                        <a className="" href="">
                                            <img src="https://img.icons8.com/?size=32&id=118497&format=png"></img>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
export default HomePage;