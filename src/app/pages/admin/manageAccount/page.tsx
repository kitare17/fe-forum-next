"use client"
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Avatar
} from "@mui/material";
import {
  Edit as EditIcon,
  Visibility as ViewIcon,
  Lock as LockIcon,
  LockOpen as UnlockIcon,
  Search as SearchIcon,
} from "@mui/icons-material";

interface User {
  id: number;
  userName: string;
  email: string;
  phone: string;
  status: string;
  role: string; // New field for role
}

const ManageAccount: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      userName: "John Michael",
      email: "john@creative-tim.com",
      phone: "123-456-7890",
      status: "Online",
      role: "Admin", // Example role
    },
    {
      id: 2,
      userName: "Alexa Liras",
      email: "alexa@creative-tim.com",
      phone: "234-567-8901",
      status: "Offline",
      role: "User", // Example role
    },
    {
      id: 3,
      userName: "Laurent Perrier",
      email: "laurent@creative-tim.com",
      phone: "345-678-9012",
      status: "Online",
      role: "User", // Example role
    },
    {
      id: 4,
      userName: "Michael Levi",
      email: "michael@creative-tim.com",
      phone: "456-789-0123",
      status: "Online",
      role: "Admin", // Example role
    },
    {
      id: 5,
      userName: "Richard Gran",
      email: "richard@creative-tim.com",
      phone: "567-890-1234",
      status: "Offline",
      role: "User", // Example role
    },
    {
      id: 6,
      userName: "Miriam Eric",
      email: "miriam@creative-tim.com",
      phone: "678-901-2345",
      status: "Offline",
      role: "User", // Example role
    },
  ]);

  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showViewModal, setShowViewModal] = useState<boolean>(false); // State for view modal
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handleSaveEdit = () => {
    // Perform save logic here
    // For example, update the user information in the state or make an API call
    // After saving, close the modal
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handleView = (user: User) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setSelectedUser(null);
  };

  const handleStatusChange = (id: number) => {
    const updatedUsers = users.map((user) => {
      if (user.id === id) {
        user.status = user.status === "Online" ? "Offline" : "Online";
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  return (
    <>
      <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg">
        <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur">
          <div className="container-fluid py-1 px-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                <li className="breadcrumb-item text-sm">
                  <a className="opacity-5 text-dark" href="javascript:;">Pages</a>
                </li>
                <li className="breadcrumb-item text-sm text-dark active" aria-current="page">
                  Quản lý tài khoản
                </li>
              </ol>
              <h6 className="font-weight-bolder mb-0">Quản lý tài khoản</h6>
            </nav>
            <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
              <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                <TextField
                  fullWidth
                  placeholder="Type here..."
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <ul className="navbar-nav justify-content-end">
                <li className="nav-item d-flex align-items-center">
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                  >
                    <Avatar alt="Admin" src="https://img.icons8.com/?size=24&id=82751&format=png&color=000000" />
                  </IconButton>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container-fluid py-4">
          <Paper className="card mb-4">
            <div className="card-header pb-4">
              <Typography variant="h5">Quản lý tài khoản</Typography>
            </div>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>STT</TableCell>
                    <TableCell>Tên người dùng</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>SDT</TableCell>
                    <TableCell>Vai trò</TableCell> {/* New column for Role */}
                    <TableCell align="center">Sửa/Xem</TableCell>
                    <TableCell align="center">Khóa/Mở khóa</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user, index) => (
                    <TableRow key={user.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Typography variant="body2">{user.userName}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{user.email}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{user.phone}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{user.role}</Typography> {/* Display Role */}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => handleEdit(user)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleView(user)}>
                          <ViewIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => handleStatusChange(user.id)}
                          color={user.status === "Online" ? "primary" : "secondary"}
                        >
                          {user.status === "Online" ? <UnlockIcon /> : <LockIcon />}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>

        {/* View Modal */}
        <Dialog open={showViewModal} onClose={handleCloseViewModal}>
          <DialogTitle>Xem chi tiết tài khoản</DialogTitle>
          <DialogContent>
            {selectedUser && (
              <div>
                <Typography variant="body2">
                  <strong>Tên người dùng:</strong> {selectedUser.userName}
                </Typography>
                <Typography variant="body2">
                  <strong>Email:</strong> {selectedUser.email}
                </Typography>
                <Typography variant="body2">
                  <strong>SDT:</strong> {selectedUser.phone}
                </Typography>
                <Typography variant="body2">
                  <strong>Vai trò:</strong> {selectedUser.role}
                </Typography>
                <Typography variant="body2">
                  <strong>Trạng thái:</strong> {selectedUser.status}
                </Typography>
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseViewModal} color="primary">
              Đóng
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Modal */}
        <Dialog open={showEditModal} onClose={handleCloseEditModal}>
          <DialogTitle>Chỉnh sửa người dùng</DialogTitle>
          <DialogContent>
            {selectedUser && (
              <div>
                <TextField
                  autoFocus
                  margin="dense"
                  label="User Name"
                  type="text"
                  fullWidth
                  value={selectedUser.userName}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      userName: e.target.value,
                    })
                  }
                />
                <TextField
                  margin="dense"
                  label="Email"
                  type="email"
                  fullWidth
                  value={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      email: e.target.value,
                    })
                  }
                />
                <TextField
                  margin="dense"
                  label="Phone"
                  type="text"
                  fullWidth
                  value={selectedUser.phone}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      phone: e.target.value,
                    })
                  }
                />
                <TextField
                  margin="dense"
                  label="Role"
                  type="text"
                  fullWidth
                  value={selectedUser.role}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      role: e.target.value,
                    })
                  }
                />
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditModal} color="primary">
              Đóng
            </Button>
            <Button onClick={handleSaveEdit} color="primary">
              Lưu thay đổi
            </Button>
          </DialogActions>
        </Dialog>
      </main>
    </>
  );
};

export default ManageAccount;
