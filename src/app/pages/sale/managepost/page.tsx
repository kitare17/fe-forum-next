"use client"

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/app/store';
import { getAllSalePost, updateSalePost, deleteSalePost, getAllSalePostByUserId } from '@/app/store/action/sale';
import { SaleInterface } from '@/app/interface/SaleInterface';
import { toast } from 'react-toastify';
import { Table, Button, Pagination, Modal } from 'react-bootstrap';

const ManagePosts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userSalePosts, userPostsMaxPage, isLoading } = useSelector((state: RootState) => state.sale);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const userId = useSelector((state: RootState) => state.auth.user?.userEmailId);
  useEffect(() => {
    dispatch(getAllSalePostByUserId({ userId: userId }));
  }, [dispatch, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleToggleHide = async (post: SaleInterface) => {
    try {
      await dispatch(updateSalePost({ ...post, isLock: !post.isLock })).unwrap();
      toast.success(`Post ${post.isLock ? 'unhidden' : 'hidden'} successfully`);
    } catch (error) {
      toast.error('Failed to update post');
    }
  };

  const handleToggleSold = async (post: SaleInterface) => {
    try {
      await dispatch(updateSalePost({ ...post, isSold: !post.isSold })).unwrap();
      toast.success(`Post marked as ${post.isSold ? 'unsold' : 'sold'}`);
    } catch (error) {
      toast.error('Failed to update post');
    }
  };

  const handleDelete = async () => {
    if (postToDelete) {
      try {
        await dispatch(deleteSalePost(postToDelete)).unwrap();
        toast.success('Post deleted successfully');
        setShowDeleteModal(false);
        setPostToDelete(null);
      } catch (error) {
        toast.error('Failed to delete post');
      }
    }
  };

  return (
    <div className="container mt-4">
      <h1>Manage Posts</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userSalePosts.map((post: SaleInterface) => (
            <tr key={post._id}>
              <td>{post.title}</td>
              <td>
                {post.isLock ? 'Hidden' : 'Visible'} | 
                {post.isSold ? 'Sold' : 'Available'}
              </td>
              <td>
                <Button variant="warning" onClick={() => handleToggleHide(post)}>
                  {post.isLock ? 'Unhide' : 'Hide'}
                </Button>
                <Button variant="info" className="ml-2" onClick={() => handleToggleSold(post)}>
                  {post.isSold ? 'Mark as Unsold' : 'Mark as Sold'}
                </Button>
                <Button variant="danger" className="ml-2" onClick={() => {
                  setPostToDelete(post._id || null);
                  setShowDeleteModal(true);
                }}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        {[...Array(userPostsMaxPage)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManagePosts;