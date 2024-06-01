"use client"

const Sale=()=>{
    return(
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
      `}</style>
          <div className="container my-2">
    <div className="row">
        <div className="col-md-3">
            <div>
                <a href="#" className="text-decoration-none">
                    <div className="card" style={{ width: "100%" }}>
                        <img src="https://via.placeholder.com/300x200" className="card-img-top" alt="Product Image" />
                        <div className="card-body">
                            <h5 className="card-title" style={{ color: "black" }}>Product Title</h5>
                            <p className="card-text text-secondary">This is a short description of the product</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <span className="text-danger fw-bold">$29.99</span>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
        <div className="col-md-3">
            <div>
                <a href="#" className="text-decoration-none">
                    <div className="card" style={{ width: "100%" }}>
                        <img src="https://via.placeholder.com/300x200" className="card-img-top" alt="Product Image" />
                        <div className="card-body">
                            <h5 className="card-title" style={{ color: "black" }}>Product Title</h5>
                            <p className="card-text text-secondary">This is a short description of the product</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <span className="text-danger fw-bold">$29.99</span>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
        <div className="col-md-3">
            <div>
                <a href="#" className="text-decoration-none">
                    <div className="card" style={{ width: "100%" }}>
                        <img src="https://via.placeholder.com/300x200" className="card-img-top" alt="Product Image" />
                        <div className="card-body">
                            <h5 className="card-title" style={{ color: "black" }}>Product Title</h5>
                            <p className="card-text text-secondary">This is a short description of the product</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <span className="text-danger fw-bold">$29.99</span>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
        <div className="col-md-3">
            <div>
                <a href="#" className="text-decoration-none">
                    <div className="card" style={{ width: "100%" }}>
                        <img src="https://via.placeholder.com/300x200" className="card-img-top" alt="Product Image" />
                        <div className="card-body">
                            <h5 className="card-title" style={{ color: "black" }}>Product Title</h5>
                            <p className="card-text text-secondary">This is a short description of the product</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <span className="text-danger fw-bold">$29.99</span>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
        
    </div>

    {/* đổ data xóa row mẫu từ đây đến ..... */}
    
    {/* .... đây nè */}
    {/* Phan trang */}
    <div className="row">
        <div className="col-md-12">
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center mt-4">
                    <li className="page-item disabled">
                        <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item">
                        <a className="page-link" href="#">Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</div>

        </>
    )
}
export default Sale;