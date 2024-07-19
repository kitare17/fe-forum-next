"use client"

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/app/store';
import { getWishlist, togglePostInWishlist } from '@/app/store/action/wishlist';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { FormatCurrency } from '@/app/constant/Fomart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';

interface WishlistItem {
  _id: string;
  title: string;
  detail: string;
  images: string[];
  price: number;
  productStatus: string;
}

interface WishlistData {
  _id: string;
  userId: string;
  postLiked: WishlistItem[];
}

const Wishlist = () => {
  const dispatch = useDispatch<AppDispatch>();
  //@ts-ignore
  const wishlistData = useSelector((state: RootState) => state.wishlist.wishlistData);
  const loading = useSelector((state: RootState) => state.wishlist.loading);
  const error = useSelector((state: RootState) => state.wishlist.error);
  const userId = useSelector((state: RootState) => state.auth.user?.userEmailId);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (userId) {
      dispatch(getWishlist(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);


  

  const handleRemoveFromWishlist = async (postId: string) => {
    if (!userId) {
      toast.error("Please login to manage your wishlist");
      return;
    }
    setIsProcessing(true);
    try {
      await dispatch(togglePostInWishlist({ userId, salePostId: postId })).unwrap();
      toast.success("Removed from wishlist");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) return <div className="text-center my-5">Loading...</div>;

  const wishlistItems = wishlistData?.postLiked || [];

  return (
    
    <div className="container my-5">
      <h2 className="mb-4">My Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <div className="text-center">
          <p>Your wishlist is empty.</p>
          <Link href="/pages/sale" className="btn btn-primary mt-3">
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="row">
          {wishlistItems.map((item) => (
            <div className="col-md-3 mb-4" key={item._id}>
              <div className="card h-100 shadow-sm">
                <Image
                  src={item.images[0]}
                  className="card-img-top"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  alt={item.title}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text text-secondary">{item.productStatus}</p>
                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <span className="text-danger fw-bold">{FormatCurrency(item.price)}</span>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => handleRemoveFromWishlist(item._id)}
                      disabled={isProcessing}
                      title="Remove from wishlist"
                    >
                      <FontAwesomeIcon icon={solidHeart} />
                    </button>
                  </div>
                </div>
                <Link href={`/pages/sale/detail/${item._id}`} className="btn btn-primary mt-2">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;