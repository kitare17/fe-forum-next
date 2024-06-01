"use client"
import CarouselComponent from "@/app/component/Carousel";

const SaleDetail = () => {

    return (
        <>
         <style jsx>{`
        

        button {
          border: none;
          background: none;
        }
      `}</style>
        <script src="https://kit.fontawesome.com/a00e93d0d1.js" crossOrigin="anonymous"></script>
            <div className="container bg-light my-3" style={{ paddingBottom: '20px', borderRadius: '1%' }}>
  <div className="row">
    <div className="col-md-3">
      <div className="row">
        <div className="col-md-3">
          <img src="https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-6/408401133_3503012760028740_2340052329278457272_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEZpsFWgJ3ROwCsLm3UGFfiPM5N2i9QNWw8zk3aL1A1bM8xvFXHAgIHe4_pT5Qx-QkwRyiEPIN_76pKgFvl9VZ9&_nc_ohc=dW0XiD2zk_EQ7kNvgHkbj5t&_nc_ht=scontent.fdad3-5.fna&oh=00_AYBfYMhxfpk2YosCzzWQJuQppZrzUDAFyXplFmjsGSHPhQ&oe=66609E51" style={{ borderRadius: '50%', width: '100%' }} />
        </div>
        <div className="col-md-9">
          <h5>Nguyễn Minh Quang</h5>
          <p>21-03-2024 10h30</p>
        </div>
      </div>
    </div>
    <div className="col-md-9" style={{ textAlign: 'right' }}>
      <button><i className="fa-solid fa-bars"></i></button>
    </div>
  </div>

  <div className="row">
    <div className="col-md-12"> </div>
  </div>
  <div className="row">
    <div className="col-md-7">
    <CarouselComponent />
    </div>
    <div className="col-md-5">
      <div className="row">
        <div className="col-md-12">
          <h4>Đồng hồ orient mặt 40mm màu vàng hồng còn mới 98% dùng siêu lướt</h4>
          <p className="text-danger fw-bolder fs-4">250.0000 đ</p>
          <hr />
          <div><i className="fa-regular fa-clock"></i> Đăng 12 ngày trước</div>
          <div><i className="fa-solid fa-location-dot"></i> 03 Hoàng Văn Thụ, Đại học FPT lỏ</div>
          <div><i className="fa-solid fa-plane"></i> Xuất xứ : Nhật bủn</div>
          <div><i className="fa-solid fa-wand-magic-sparkles"></i> Tình trạng : Mới 99%</div>
          <hr />
          <h4>Mô tả chi tiết</h4>
          <p>lahd laks dlkas dk asd la ngajlfnlasnd à kabf jkaf asndjl asnd nasflkaksnf jlafn alsna sndka nsd asd sad asjd sad
            sdjashdashd lasjd salfj laksdja lksf kasfn lkfnaslaksjf ksalj lksajd ajd lkasjd kas djasjdsa
            asd hasdhalfh ak fjeiowefaeidghu ag hafu haofhalfhw hahf odf sf af asd asd asasd
            asdsdasddsada
          </p>
        </div>
      </div>
    </div>
  </div>
  <hr />
  <div className="row">
    <div className="col-md-6">
      <button style={{ width: '100%' }}><i className="fa-regular fa-heart"></i> Thích</button>
    </div>
    <div className="col-md-6">
      <button style={{ width: '100%' }}><i className="fa-solid fa-message"></i> Liên hệ</button>
    </div>
  </div>
</div>
        
        </>
    )
}


export default SaleDetail