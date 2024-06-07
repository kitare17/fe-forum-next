"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Image from 'next/image'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    maxHeight: '90vh',
    overflowY: 'auto',

    p: 4,
};
const GroupJob = () => {

    const [openDetailToDo, setOpen] = React.useState(false);

    const handleOpenDetailToDo = () => setOpen(true);
    const handleCloseDetailToDo = () => setOpen(false);
    const [openAddWork, setOpenAdd] = React.useState(false);
    const handleOpenAddWork = () => {
        setOpenAdd(true);
    };
    const handleCloseAddWork = () => {
        setOpenAdd(false);
    };
    return (
        <div className="container mt-4 p-0 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
               <h4>Danh sách các công việc</h4>
                <button type="button" className="btn btn-primary text-white fw-bold" onClick={handleOpenAddWork}><AddCircleOutlineIcon/></button>
            </div>

            <div className="row justify-content-center">
                <div className="col-md-3">
                    <div className="card" style={{ backgroundColor: '#A9A9A9', opacity: 0.8 }} >
                        <div className="card-header bg-secondary text-white text-center">To Do</div>
                        <div className="overflow-auto" style={{ maxHeight: '450px' }}>
                            <div className="card mt-4 mb-4 mx-auto w-75" >
                                <div className="card-body">
                                    <h5 className="card-title" onClick={handleOpenDetailToDo}>Find a New Podcast for Commute</h5>
                                    <span className="badge bg-info mb-2">Công việc</span>
                                    <span className="badge bg-warning text-dark mb-2 ml-2">Rất quan trọng</span>
                                    <div className="card-text small ">Ngày bắt đầu: 2024-01-01</div>
                                    <div className="card-text small">Ngày bắt đầu: 2024-01-10</div>
                                    <div className="card-text text-muted small">Được tạo bởi: User</div>
                                    <Image
                                        src="https://img.icons8.com/?size=100&id=7yVMtODDHoSU&format=png&color=000000"
                                        width={20}
                                        height={20}
                                        alt="Picture of the author"
                                    />
                                    <Image
                                        src="https://img.icons8.com/?size=100&id=FkQHNSmqWQWH&format=png&color=000000"
                                        width={20}
                                        height={20}
                                        alt="Picture of the author"
                                    />
                                    <Image
                                        src="https://img.icons8.com/?size=100&id=Zyo5wDjgJxRW&format=png&color=000000"
                                        width={20}
                                        height={20}
                                        alt="Picture of the author"
                                    />

                                </div>
                            </div>
                            <div className="card mb-4 mx-auto w-75" >
                                <div className="card-body">
                                    <h5 className="card-title" onClick={handleOpenDetailToDo}>Book Flights</h5>
                                    <span className="badge bg-info mb-2">Công việc</span>
                                    <span className="badge bg-primary mb-2 ml-2">Quan trọng</span>
                                    <div className="card-text small">Ngày bắt đầu: 2024-01-05</div>
                                    <div className="card-text small">Ngày bắt đầu: 2024-01-12</div>
                                    <div className="card-text text-muted small">Được tạo bởi: User</div>
                                    <Image
                                        src="https://img.icons8.com/?size=100&id=7yVMtODDHoSU&format=png&color=000000"
                                        width={20}
                                        height={20}
                                        alt="Picture of the author"
                                    />
                                    <Image
                                        src="https://img.icons8.com/?size=100&id=FkQHNSmqWQWH&format=png&color=000000"
                                        width={20}
                                        height={20}
                                        alt="Picture of the author"
                                    />
                                    <Image
                                        src="https://img.icons8.com/?size=100&id=Zyo5wDjgJxRW&format=png&color=000000"
                                        width={20}
                                        height={20}
                                        alt="Picture of the author"
                                    />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card " style={{ backgroundColor: ' #81B1CC', opacity: 0.8 }}>
                        <div className="card-header text-white text-center" style={{ backgroundColor: '#4169E1	' }}>In Progress</div>
                        <div className="overflow-auto" style={{ maxHeight: '450px' }}>
                            <div className="card mt-4 mb-4 mx-auto w-75" >
                                <div className="card-body">
                                    <h5 className="card-title" onClick={handleOpenDetailToDo}>Pricing Page</h5>
                                    <span className="badge bg-success mb-2">Học tập</span>
                                    <span className="badge bg-warning text-dark mb-2 ml-2">Rất quan trọng</span>
                                    <div className="card-text small">Ngày bắt đầu: 2024-01-01</div>
                                    <div className="card-text small">Ngày bắt đầu: 2024-01-19</div>
                                    <div className="card-text text-muted small">Được tạo bởi: User</div>
                                    <Image
                                        src="https://img.icons8.com/?size=100&id=ROixPMe25k5w&format=png&color=000000"
                                        width={20}
                                        height={20}
                                        alt="Picture of the author"
                                    />
                                    <Image
                                        src="https://img.icons8.com/?size=100&id=FkQHNSmqWQWH&format=png&color=000000"
                                        width={20}
                                        height={20}
                                        alt="Picture of the author"
                                    />
                                    <Image
                                        src="https://img.icons8.com/?size=100&id=Zyo5wDjgJxRW&format=png&color=000000"
                                        width={20}
                                        height={20}
                                        alt="Picture of the author"
                                    />

                                </div>
                            </div>
                            <div className="card mb-4 mx-auto w-75" >
                                <div className="card-body">
                                    <h5 className="card-title" onClick={handleOpenDetailToDo}>Confirm Launch Date</h5>
                                    <span className="badge bg-success mb-2">Học tập</span>
                                    <span className="badge bg-secondary mb-2 ml-2">Bình thường</span>
                                    <div className="card-text small">Ngày bắt đầu: 2024-01-10</div>
                                    <div className="card-text small">Ngày bắt đầu: 2024-01-15</div>
                                    <div className="card-text text-muted small">Được tạo bởi: User</div>
                                    <Image
                                        src="https://img.icons8.com/?size=100&id=ROixPMe25k5w&format=png&color=000000"
                                        width={20}
                                        height={20}
                                        alt="Picture of the author"
                                    />
                                    <Image
                                        src="https://img.icons8.com/?size=100&id=FkQHNSmqWQWH&format=png&color=000000"
                                        width={20}
                                        height={20}
                                        alt="Picture of the author"
                                    />
                                    <Image
                                        src="https://img.icons8.com/?size=100&id=Zyo5wDjgJxRW&format=png&color=000000"
                                        width={20}
                                        height={20}
                                        alt="Picture of the author"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card" style={{ backgroundColor: '#AAD9CD', opacity: 0.8 }}>
                        <div className="card-header bg-success text-white text-center">Done</div>
                        <div className="overflow-auto" style={{ maxHeight: '450px' }}>
                            <div className="card mt-4 mb-4 mx-auto w-75" >
                                <div className="card-body ">
                                    <h5 className="card-title" onClick={handleOpenDetailToDo}>Open Position Description</h5>
                                    <span className="badge bg-warning text-dark mb-2">Đời sống</span>
                                    <span className="badge bg-secondary mb-2 ml-2">Rất quan trọng</span>
                                    <div className="card-text small">Ngày bắt đầu: 2024-01-01</div>
                                    <div className="card-text small">Ngày bắt đầu: 2024-01-15</div>
                                    <div className="card-text text-muted small">Được tạo bởi: User</div>
                                    <Image
                                        src="https://img.icons8.com/?size=100&id=ROixPMe25k5w&format=png&color=000000"
                                        width={20}
                                        height={20}
                                        alt="Picture of the author"
                                    />
                                    <Image
                                        src="https://img.icons8.com/?size=100&id=7yVMtODDHoSU&format=png&color=000000"
                                        width={20}
                                        height={20}
                                        alt="Picture of the author"
                                    />
                                    <Image
                                        src="https://img.icons8.com/?size=100&id=Zyo5wDjgJxRW&format=png&color=000000"
                                        width={20}
                                        height={20}
                                        alt="Picture of the author"
                                    />
                                </div>
                            </div>
                            <div className="card mb-4 mx-auto w-75" >
                                <div className="card-body">
                                    <h5 className="card-title" onClick={handleOpenDetailToDo}>New Homepage Design</h5>
                                    <span className="badge bg-warning text-dark mb-2">Đời sống</span>
                                    <span className="badge bg-primary mb-2 ml-2">Bình thường</span>
                                    <div className="card-text small">Ngày bắt đầu: 2024-01-01</div>
                                    <div className="card-text small">Ngày bắt đầu: 2024-01-19</div>
                                    <div className="card-text text-muted small">Được tạo bởi: User</div>
                                    <Image
                                        src="https://img.icons8.com/?size=100&id=ROixPMe25k5w&format=png&color=000000"
                                        width={20}
                                        height={20}
                                        alt="Picture of the author"
                                    />
                                    <Image
                                        src="https://img.icons8.com/?size=100&id=7yVMtODDHoSU&format=png&color=000000"
                                        width={20}
                                        height={20}
                                        alt="Picture of the author"
                                    />
                                    <Image
                                        src="https://img.icons8.com/?size=100&id=Zyo5wDjgJxRW&format=png&color=000000"
                                        width={20}
                                        height={20}
                                        alt="Picture of the author"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card " style={{ backgroundColor: '#E5B3BB', opacity: 0.8 }}>
                        <div className="card-header bg-danger text-white text-center">Cancel</div>
                        <div className="overflow-auto" style={{ maxHeight: '450px' }}>
                            <div className="card mt-4 mb-4 mx-auto w-75" >
                                <div className="card-body">
                                    <h5 className="card-title" onClick={handleOpenDetailToDo}>Conduct LinkedIn test</h5>
                                    <span className="badge bg-danger mb-2">Công việc</span>
                                    <span className="badge bg-secondary mb-2 ml-2">Rất quan trọng</span>
                                    <div className="card-text small">Ngày bắt đầu: 2024-01-01</div>
                                    <div className="card-text small">Ngày bắt đầu: 2024-01-10</div>
                                    <div className="card-text text-muted small">Được tạo bởi: User</div>
                                    <Image
                                        src="https://img.icons8.com/?size=100&id=ROixPMe25k5w&format=png&color=000000"
                                        width={20}
                                        height={20}
                                        alt="Picture of the author"
                                    />
                                    <Image
                                        src="https://img.icons8.com/?size=100&id=7yVMtODDHoSU&format=png&color=000000"
                                        width={20}
                                        height={20}
                                        alt="Picture of the author"
                                    />
                                    <Image
                                        src="https://img.icons8.com/?size=100&id=FkQHNSmqWQWH&format=png&color=000000"
                                        width={20}
                                        height={20}
                                        alt="Picture of the author"
                                    />
                                </div>
                            </div>
                            <div className="card mb-4 mx-auto w-75" >
                                <div className="card-body">
                                    <h5 className="card-title">PPC Campaign</h5>
                                    <span className="badge bg-danger mb-2">Công việc</span>
                                    <span className="badge bg-primary mb-2 ml-2">Bình thường</span>
                                    <div className="card-text small">Ngày bắt đầu: 2024-01-10</div>
                                    <div className="card-text small">Ngày bắt đầu: 2024-01-15</div>
                                    <div className="card-text text-muted small">Được tạo bởi: User</div>
                                    <Image
                                        src="https://img.icons8.com/?size=100&id=ROixPMe25k5w&format=png&color=000000"
                                        width={20}
                                        height={20}
                                        alt="Picture of the author"
                                    />
                                    <Image
                                        src="https://img.icons8.com/?size=100&id=7yVMtODDHoSU&format=png&color=000000"
                                        width={20}
                                        height={20}
                                        alt="Picture of the author"
                                    />
                                    <Image
                                        src="https://img.icons8.com/?size=100&id=FkQHNSmqWQWH&format=png&color=000000"
                                        width={20}
                                        height={20}
                                        alt="Picture of the author"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                open={openDetailToDo}
                onClose={handleCloseDetailToDo}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Render dữ liệu từ card
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>
            <Modal
                open={openAddWork}
                onClose={handleCloseAddWork}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Thêm Công Việc Mới
                    </Typography>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="WorkTitle" className="form-label">Chủ đề</label>
                            <input type="text" className="form-control" id="WorkTitle" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="WorkBadges" className="form-label">Tag</label>
                            <select className="form-select" id="WorkBadges">
                                <option value="Công việc">Công việc</option>
                                <option value="Học tập">Học tập</option>
                                <option value="Đời sống">Đời sống</option>
                                required
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="WorkPriority" className="form-label">Độ ưu tiên</label>
                            <select className="form-select" id="WorkPriority">
                                <option value="Rất quan trọng">Rất quan trọng</option>
                                <option value="Quan trọng">Quan trọng</option>
                                <option value="Bình thường">Bình thường</option>
                                required
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="WorkStatus" className="form-label">Trạng thái</label>
                            <select className="form-select" id="WorkStatus">
                                <option value="todo">To-do</option>
                                <option value="đang làm">Đang làm</option>
                                <option value="đã làm">Đã làm</option>
                                <option value="bỏ">Bỏ</option>
                                required
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="WorkStartDate" className="form-label">Ngày bắt đầu</label>
                            <input type="text" className="form-control" id="WorkStartDate" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="WorkEndDate" className="form-label">Ngày kết thúc</label>
                            <input type="text" className="form-control" id="WorkEndDate"required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="WorkCreatedBy" className="form-label">Được tạo bởi</label>
                            <input type="text" className="form-control" id="WorkCreatedBy" required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="WorkDescription" className="form-label">Mô tả </label>
                            <textarea className="form-control" id="WorkDescription"></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary text-white">Thêm</button>
                        <button ></button>
                    </form>

                </Box>
            </Modal>
        </div>
    );
}

export default GroupJob;
