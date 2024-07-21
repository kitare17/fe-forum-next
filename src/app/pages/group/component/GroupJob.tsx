"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Image from 'next/image'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FormCreateWork from "@/app/pages/group/component/FormAddWork";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getTaskGroup} from "@/app/store/action/group";
import {RootState} from "@/app/store";
import {createDayToStringTask} from "@/app/constant/Fomart";
import {GroupTaskInterface} from "@/app/interface/GroupTaskInterface";

import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import FormEditWork from './FormEditWork';
import ReportIcon from '@mui/icons-material/Report';
import {IconButton, Tooltip} from '@mui/material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    maxHeight: '90vh',
    overflowY: 'auto',

    p: 4,
};
const GroupJob = ({groupId}: { groupId: string }) => {


    //state task  detail work
    const [taskDetail, setTaskDetail] = React.useState<GroupTaskInterface | undefined>(undefined);

    const [openDetailToDo, setOpen] = React.useState(false);

    const handleOpenDetailToDo = (task: GroupTaskInterface | undefined) => {
        setOpen(true);
        setTaskDetail(task);

    }
    const handleCloseDetailToDo = () => {
        setOpen(false);
        setTaskDetail(undefined)
    }
    const dispatch = useDispatch();
    const {
        listTodoTask,
        listCancel,
        listDone,
        listPending,
        isLoading,
        isError,
        isUpdate
    } = useSelector((state: RootState) => state.group);
    useEffect(() => {
        //@ts-ignore
        dispatch(getTaskGroup({groupId}));
    }, [isUpdate]);


    //state create work

    const [openCreateWork, setOpenCreateWordForm] = React.useState(false);
    const [openEditWork, setOpenEditWorkForm] = React.useState(false);
    const handleOpenAddWork = () => {
        setOpenCreateWordForm(true);

    };
    const handleOpenEditWork = (task: GroupTaskInterface | undefined) => {
        setOpenEditWorkForm(true);
        setTaskDetail(task)

    };

    //priority of task


    const PriorityTask = ({priority}: { priority: string }) => {
        var colorPriority = "#FFFF00";

        switch (priority) {
            case "Quan trọng":
                colorPriority = "#FF0000";
                break;
            case "Trung bình":
                colorPriority = "#FFFF00";
                break;
            case "Thấp":
                colorPriority = "#00FF00";
                break;
        }

        return (
            <span
                className="badge text-dark mb-2 ml-2"
                style={{backgroundColor: colorPriority}}
            >{priority}</span>
        )
    }

    return (
        <div className="container mt-4 p-0 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4>Danh sách các công việc</h4>
                <button type="button" className="btn btn-primary text-white fw-bold" onClick={handleOpenAddWork}>
                    <AddCircleOutlineIcon/></button>
            </div>


            {/*todo task list*/}
            <div className="row justify-content-center">
                <div className="col-md-3">
                    <div className="card" style={{backgroundColor: '#A9A9A9', opacity: 0.8}}>
                        <div className="card-header bg-secondary text-white text-center">Nhiệm vụ</div>
                        <div className="overflow-auto" style={{maxHeight: '500px'}}>
                            {listTodoTask.map(
                                (task) => {
                                    return (
                                        <div className="card mt-4 mb-4 mx-auto w-75" key={task._id}>
                                            <div className="card-body">
                                                <h5 className="card-title"
                                                    onClick={() => handleOpenDetailToDo(task)}>{task.title}</h5>
                                                {/*<span*/}
                                                {/*    className="badge bg-warning text-dark mb-2 ml-2">Độ ưu tiên: {task.label}</span>*/}
                                                <PriorityTask priority={task.label}/>
                                                <div className="card-text small ">
                                                    <b>Ngày bắt đầu:</b>
                                                    <br/>
                                                    {createDayToStringTask(task.startDate)}
                                                </div>
                                                <div className="card-text small">
                                                    <b>Ngày kết thúc:</b>
                                                    <br/>
                                                    {createDayToStringTask(task.endDate)}
                                                    {
                                                        new Date(task.endDate) < new Date() ?
                                                            <Tooltip title="Task quá thời hạn">
                                                                <IconButton>
                                                                    <ReportIcon style={{color: "red"}}/>
                                                                </IconButton>
                                                            </Tooltip>
                                                            : <></>
                                                    }
                                                </div>
                                                {/*<div className="card-text text-muted small">Được tạo bởi: </div>*/}

                                                <Button
                                                    variant="contained"
                                                    startIcon={<EditCalendarIcon/>}
                                                    onClick={() => handleOpenEditWork(task)}
                                                >

                                                </Button>
                                            </div>
                                        </div>
                                    )
                                }
                            )}

                        </div>
                    </div>
                </div>


                {/*pendding list*/}

                <div className="col-md-3">
                    <div className="card " style={{backgroundColor: ' #81B1CC', opacity: 0.8}}>
                        <div className="card-header text-white text-center" style={{backgroundColor: '#4169E1	'}}>
                            Đang làm
                        </div>
                        <div className="overflow-auto" style={{maxHeight: '500px'}}>
                            {listPending.map(
                                (task) => {
                                    return (
                                        <div className="card mt-4 mb-4 mx-auto w-75" key={task._id}>
                                            <div className="card-body">
                                                <h5 className="card-title"
                                                    onClick={() => handleOpenDetailToDo(task)}>{task.title}</h5>
                                                <PriorityTask priority={task.label}/>
                                                <div className="card-text small ">
                                                    <b>Ngày bắt đầu:</b>
                                                    <br/>
                                                    {createDayToStringTask(task.startDate)}
                                                </div>
                                                <div className="card-text small">
                                                    <b>Ngày kết thúc:</b>
                                                    <br/>
                                                    {createDayToStringTask(task.endDate)}
                                                    {
                                                        new Date(task.endDate) < new Date() ?
                                                            <Tooltip title="Task quá thời hạn">
                                                                <IconButton>
                                                                    <ReportIcon style={{color: "red"}}/>
                                                                </IconButton>
                                                            </Tooltip>
                                                            : <></>
                                                    }

                                                </div>
                                                <Button
                                                    variant="contained"
                                                    startIcon={<EditCalendarIcon/>}
                                                    onClick={() => handleOpenEditWork(task)}
                                                >

                                                </Button>


                                            </div>
                                        </div>
                                    )
                                }
                            )}
                        </div>
                    </div>
                </div>


                {/*done list*/}

                <div className="col-md-3">
                    <div className="card" style={{backgroundColor: '#AAD9CD', opacity: 0.8}}>
                        <div className="card-header bg-success text-white text-center">Hoàn thành</div>
                        <div className="overflow-auto" style={{maxHeight: '500px'}}>
                            {listDone.map(
                                (task) => {
                                    return (
                                        <div className="card mt-4 mb-4 mx-auto w-75" key={task._id}>
                                            <div className="card-body">
                                                <h5 className="card-title"
                                                    onClick={() => handleOpenDetailToDo(task)}>{task.title}</h5>

                                                <PriorityTask priority={task.label}/>
                                                <div className="card-text small ">
                                                    <b>Ngày bắt đầu:</b>
                                                    <br/>
                                                    {createDayToStringTask(task.startDate)}
                                                </div>
                                                <div className="card-text small">
                                                    <b>Ngày kết thúc:</b>
                                                    <br/>
                                                    {createDayToStringTask(task.endDate)}
                                                </div>
                                                <Button
                                                    variant="contained"
                                                    startIcon={<EditCalendarIcon/>}
                                                    onClick={() => handleOpenEditWork(task)}
                                                >

                                                </Button>
                                            </div>
                                        </div>
                                    )
                                }
                            )}
                        </div>
                    </div>
                </div>

                {/*cancel list*/}

                <div className="col-md-3">
                    <div className="card " style={{backgroundColor: '#E5B3BB', opacity: 0.8}}>
                        <div className="card-header bg-danger text-white text-center">Đã hủy</div>
                        <div className="overflow-auto" style={{maxHeight: '500px'}}>
                            {listCancel.map(
                                (task) => {
                                    return (
                                        <div className="card mt-4 mb-4 mx-auto w-75" key={task._id}>
                                            <div className="card-body">
                                                <h5 className="card-title"
                                                    onClick={() => handleOpenDetailToDo(task)}>{task.title}</h5>
                                                <PriorityTask priority={task.label}/>
                                                <div className="card-text small ">
                                                    <b>Ngày bắt đầu:</b>
                                                    <br/>
                                                    {createDayToStringTask(task.startDate)}
                                                </div>
                                                <div className="card-text small">
                                                    <b>Ngày kết thúc:</b>
                                                    <br/>
                                                    {createDayToStringTask(task.endDate)}
                                                </div>
                                                <Button
                                                    variant="contained"
                                                    startIcon={<EditCalendarIcon/>}
                                                    onClick={() => handleOpenEditWork(task)}
                                                >

                                                </Button>

                                            </div>
                                        </div>
                                    )
                                }
                            )}
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
                        {taskDetail?.title} ({createDayToStringTask(taskDetail?.startDate ?? "")} - {createDayToStringTask(taskDetail?.endDate ?? "")})
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        <b>Chi tiết:</b> {taskDetail?.detail}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        <b>Người được giao:</b>
                        {[...(taskDetail?.assignee??[])].map(item => (
                        <li key={item._id}>
                            <b>{item.username}</b>
                        </li>
                    ))}
                    </Typography>
                </Box>
            </Modal>
            <FormCreateWork openCreateWork={openCreateWork} groupId={groupId}
                            setOpenCreateWordForm={setOpenCreateWordForm}/>
            <FormEditWork openEditWork={openEditWork} groupId={groupId}
                          taskDetail={taskDetail}
                          setOpenEditWorkForm={setOpenEditWorkForm}/>
        </div>
    );
}

export default GroupJob;
