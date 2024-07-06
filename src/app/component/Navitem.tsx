"use client"
import Link from 'next/link';
import { useState } from 'react';

export default function Navitem() {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleSetActiveItem = (item: string) => {
    setActiveItem(item);
  };

  return (
    <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3" id="sidenav-main">
      <div className="sidenav-header">
        <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
        <a className="navbar-brand m-0">
          <img src="https://img.icons8.com/?size=60&id=flgyO0XZfexw&format=png" alt="Logo" />
          <span className="ms-1 text-lg font-weight-bold text-danger">FU-Forum</span>
        </a>
      </div>
      <hr className="horizontal dark mt-0" />
      <div className="collapse navbar-collapse w-auto max-height-vh-100 h-100" id="sidenav-collapse-main">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link href="../admin/dashboard">
              <div className={`nav-link ${activeItem === '/admin/dashboard' ? 'active' : ''}`} onClick={() => handleSetActiveItem('/admin/dashboard')}>
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                  <img src="https://img.icons8.com/?size=24&id=6690&format=png&color=000000"></img>
                </div>
                <span className='nav-link-text ms-1'>Thống kê</span>
              </div>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="../admin/manageAccount">
              <div className={`nav-link ${activeItem === '/admin/manageAccount' ? 'active' : ''}`} onClick={() => handleSetActiveItem('/admin/manageAccount')}>
                <div className="icon icon-shape icon-sm shadow border-radius-md  bg-white text-center me-1 d-flex align-items-center justify-content-center">
                  <img src='https://img.icons8.com/?size=24&id=11727&format=png&color=000000'></img>
                </div>
                <span className="nav-link-text ms-1 ">Quản lý tài khoản</span>
              </div>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="../admin/managePost">
              <div className={`nav-link ${activeItem === '/admin/managePost' ? 'active' : ''}`} onClick={() => handleSetActiveItem('/admin/managePost')}>
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                  <img src='https://img.icons8.com/?size=24&id=m7Jh7zduA1Zv&format=png&color=000000'></img>
                </div>
                <span className="nav-link-text ms-1 ">Quản lý bài viết</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
