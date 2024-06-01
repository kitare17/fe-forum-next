
"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Image from 'next/image'

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
const TaskManagement = () => {
    const [openAddTask, setOpenAdd] = React.useState(false);
    const handleOpenAddTask = () => {
        setOpenAdd(true);
    };
    const handleCloseAddTask = () => {
        setOpenAdd(false);
    };
        return (
            <>
                <section className=" gradient-custom-2">
                    <div className="container ">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-md-12 col-xl-10">

                                <div className="card mask-custom">
                                    <div className="card-body p-4 text-white">

                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h1 className="text-center ">TASK MANAGEMENT</h1>
                                            <button type="button" className="btn btn-primary fw-bold text-white" onClick={handleOpenAddTask}>THÊM NHIỆM VỤ</button>
                                        </div>

                                        <table className="table text-dark mb-0">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Team Member</th>
                                                    <th scope="col">Task</th>
                                                    <th scope="col">Priority</th>
                                                    <th scope="col">Details</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="fw-normal">
                                                    <th>
                                                        <Image
                                                            src="/img/FPT1.jpg"
                                                            width={100}
                                                            height={100}
                                                            alt="Picture of the author"
                                                        />

                                                        <span className="ms-2">Alice Mayer</span>
                                                    </th>
                                                    <td className="align-middle">
                                                        <span>Call Sam For payments</span>
                                                    </td>
                                                    <td className="align-middle">
                                                        <h6 className="mb-0"><span className="badge bg-danger">Rất quan trọng</span></h6>
                                                    </td>
                                                    <td className="align-middle">

                                                        <a href="#!" data-mdb-tooltip-init title="Done">
                                                            <Image
                                                                src="https://img.icons8.com/?size=50&id=11849&format=png&color=000000"
                                                                width={30}
                                                                height={30}
                                                                alt="Picture of the author"
                                                            />
                                                        </a>
                                                        <a href="#!" data-mdb-tooltip-init title="Remove">
                                                            <Image
                                                                src="https://img.icons8.com/?size=100&id=13903&format=png&color=000000"
                                                                width={30}
                                                                height={30}
                                                                alt="Picture of the author"
                                                            /></a>
                                                    </td>
                                                </tr>
                                                <tr className="fw-normal">
                                                    <th>
                                                        <Image
                                                            src="/img/FPT1.jpg"
                                                            width={100}
                                                            height={100}
                                                            alt="Picture of the author"
                                                        />

                                                        <span className="ms-2">Alice Mayer</span>
                                                    </th>
                                                    <td className="align-middle">
                                                        <span>Call Sam For payments</span>
                                                    </td>
                                                    <td className="align-middle">
                                                        <h6 className="mb-0"><span className="badge bg-danger">Rất quan trọng</span></h6>
                                                    </td>
                                                    <td className="align-middle">

                                                        <a href="#!" data-mdb-tooltip-init title="Done">
                                                            <Image
                                                                src="https://img.icons8.com/?size=50&id=11849&format=png&color=000000"
                                                                width={30}
                                                                height={30}
                                                                alt="Picture of the author"
                                                            />
                                                        </a>
                                                        <a href="#!" data-mdb-tooltip-init title="Remove">
                                                            <Image
                                                                src="https://img.icons8.com/?size=100&id=13903&format=png&color=000000"
                                                                width={30}
                                                                height={30}
                                                                alt="Picture of the author"
                                                            /></a>
                                                    </td>
                                                </tr>

                                                <tr className="fw-normal">
                                                    <th>
                                                        <Image
                                                            src="/img/FPT1.jpg"
                                                            width={100}
                                                            height={100}
                                                            alt="Picture of the author"
                                                        />

                                                        <span className="ms-2">Alice Mayer</span>
                                                    </th>
                                                    <td className="align-middle">
                                                        <span>Call Sam For payments</span>
                                                    </td>
                                                    <td className="align-middle">
                                                        <h6 className="mb-0"><span className="badge bg-danger">Rất quan trọng</span></h6>
                                                    </td>
                                                    <td className="align-middle">

                                                        <a href="#!" data-mdb-tooltip-init title="Done">
                                                            <Image
                                                                src="https://img.icons8.com/?size=50&id=11849&format=png&color=000000"
                                                                width={30}
                                                                height={30}
                                                                alt="Picture of the author"
                                                            />
                                                        </a>
                                                        <a href="#!" data-mdb-tooltip-init title="Remove">
                                                            <Image
                                                                src="https://img.icons8.com/?size=100&id=13903&format=png&color=000000"
                                                                width={30}
                                                                height={30}
                                                                alt="Picture of the author"
                                                            /></a>
                                                    </td>
                                                </tr>
                                                <tr className="fw-normal">
                                                    <th>
                                                        <Image
                                                            src="/img/FPT1.jpg"
                                                            width={100}
                                                            height={100}
                                                            alt="Picture of the author"
                                                        />

                                                        <span className="ms-2">Alice Mayer</span>
                                                    </th>
                                                    <td className="align-middle">
                                                        <span>Call Sam For payments</span>
                                                    </td>
                                                    <td className="align-middle">
                                                        <h6 className="mb-0"><span className="badge bg-danger">Rất quan trọng</span></h6>
                                                    </td>
                                                    <td className="align-middle">

                                                        <a href="#!" data-mdb-tooltip-init title="Done">
                                                            <Image
                                                                src="https://img.icons8.com/?size=50&id=11849&format=png&color=000000"
                                                                width={30}
                                                                height={30}
                                                                alt="Picture of the author"
                                                            />
                                                        </a>
                                                        <a href="#!" data-mdb-tooltip-init title="Remove">
                                                            <Image
                                                                src="https://img.icons8.com/?size=100&id=13903&format=png&color=000000"
                                                                width={30}
                                                                height={30}
                                                                alt="Picture of the author"
                                                            /></a>
                                                    </td>
                                                </tr>

                                                <tr className="fw-normal">
                                                    <th>
                                                        <Image
                                                            src="/img/FPT1.jpg"
                                                            width={100}
                                                            height={100}
                                                            alt="Picture of the author"
                                                        />

                                                        <span className="ms-2">Kate Moss</span>
                                                    </th>
                                                    <td className="align-middle">Make payment to Bluedart</td>
                                                    <td className="align-middle">
                                                        <h6 className="mb-0"><span className="badge bg-success">Bình thường</span></h6>
                                                    </td>
                                                    <td className="align-middle">

                                                        <a href="#!" data-mdb-tooltip-init title="Done">
                                                            <Image
                                                                src="https://img.icons8.com/?size=50&id=11849&format=png&color=000000"
                                                                width={30}
                                                                height={30}
                                                                alt="Picture of the author"
                                                            />
                                                        </a>
                                                        <a href="#!" data-mdb-tooltip-init title="Remove">
                                                            <Image
                                                                src="https://img.icons8.com/?size=100&id=13903&format=png&color=000000"
                                                                width={30}
                                                                height={30}
                                                                alt="Picture of the author"
                                                            /></a>
                                                    </td>
                                                </tr>
                                                <tr className="fw-normal">
                                                    <th>

                                                        <Image
                                                            src="/img/FPT1.jpg"
                                                            width={100}
                                                            height={100}
                                                            alt="Picture of the author"
                                                        />
                                                        <span className="ms-2">Danny McChain</span>
                                                    </th>
                                                    <td className="align-middle">Office rent</td>
                                                    <td className="align-middle">
                                                        <h6 className="mb-0"><span className="badge bg-warning">Quan trọng</span></h6>
                                                    </td>
                                                    <td className="align-middle">

                                                        <a href="#!" data-mdb-tooltip-init title="Done">
                                                            <Image
                                                                src="https://img.icons8.com/?size=50&id=11849&format=png&color=000000"
                                                                width={30}
                                                                height={30}
                                                                alt="Picture of the author"
                                                            />
                                                        </a>
                                                        <a href="#!" data-mdb-tooltip-init title="Remove">
                                                            <Image
                                                                src="https://img.icons8.com/?size=100&id=13903&format=png&color=000000"
                                                                width={30}
                                                                height={30}
                                                                alt="Picture of the author"
                                                            /></a>
                                                    </td>
                                                </tr>
                                                <tr className="fw-normal">
                                                    <th>
                                                        <Image
                                                            src="/img/FPT1.jpg"
                                                            width={100}
                                                            height={100}
                                                            alt="Picture of the author"
                                                        />
                                                        <span className="ms-2">Alexa Chung</span>
                                                    </th>
                                                    <td className="align-middle">Office grocery shopping</td>
                                                    <td className="align-middle">
                                                        <h6 className="mb-0"><span className="badge bg-danger">Rất quan trọng</span></h6>
                                                    </td>
                                                    <td className="align-middle">

                                                        <a href="#!" data-mdb-tooltip-init title="Done">
                                                            <Image
                                                                src="https://img.icons8.com/?size=50&id=11849&format=png&color=000000"
                                                                width={30}
                                                                height={30}
                                                                alt="Picture of the author"
                                                            />
                                                        </a>
                                                        <a href="#!" data-mdb-tooltip-init title="Remove">
                                                            <Image
                                                                src="https://img.icons8.com/?size=100&id=13903&format=png&color=000000"
                                                                width={30}
                                                                height={30}
                                                                alt="Picture of the author"
                                                            /></a>
                                                    </td>
                                                </tr>
                                                <tr className="fw-normal">
                                                    <th className="border-0">
                                                        <Image
                                                            src="/img/FPT1.jpg"
                                                            width={100}
                                                            height={100}
                                                            alt="Picture of the author"
                                                        />
                                                        <span className="ms-2">Ben Smith</span>
                                                    </th>
                                                    <td className="border-0 align-middle">Ask for Lunch to Clients</td>
                                                    <td className="border-0 align-middle">
                                                        <h6 className="mb-0"><span className="badge bg-success">Bình thường</span></h6>
                                                    </td>
                                                    <td className="border-0 align-middle">

                                                        <a href="#!" data-mdb-tooltip-init title="Done">
                                                            <Image
                                                                src="https://img.icons8.com/?size=50&id=11849&format=png&color=000000"
                                                                width={30}
                                                                height={30}
                                                                alt="Picture of the author"
                                                            />
                                                        </a>
                                                        <a href="#!" data-mdb-tooltip-init title="Remove">
                                                            <Image
                                                                src="https://img.icons8.com/?size=100&id=13903&format=png&color=000000"
                                                                width={30}
                                                                height={30}
                                                                alt="Picture of the author"
                                                            /></a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <Modal
                                            open={openAddTask}
                                            onClose={handleCloseAddTask}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description">
                                         <Box sx={style}>
                                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                                    Thêm Nhiệm Vụ Mới
                                                </Typography>
                                                <form>
                                                    <div className="mb-3">
                                                        <label htmlFor="imageUpload" className="form-label">Hình ảnh</label>
                                                        <input type="text" className="form-control" id="TaskTitle" required />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="memberName" className="form-label">Tên Thành Viên</label>
                                                        <input type="text" className="form-control" id="memberName" required/>

                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="task" className="form-label">Nhiệm vụ</label>
                                                        <input type="text" className="form-control" id="memberName"required />

                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="TaskPriority" className="form-label">Độ ưu tiên</label>
                                                        <select className="form-select" id="TaskPriority">
                                                            <option value="rất-quan-trọng">Rất quan trọng</option>
                                                            <option value="quan-trọng">Quan trọng</option>
                                                            <option value="bình-thường">Bình thường</option>
                                                            required
                                                        </select>
                                                    </div>
                                                    <button type="submit" className="btn btn-primary text-white">Thêm</button>
                                                </form>

                                            </Box>
                                        </Modal>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }

export default TaskManagement;