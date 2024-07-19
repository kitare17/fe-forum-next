import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/store";
import { togglePostInWishlist, getWishlist } from "@/app/store/action/wishlist";
import { SaleInterface } from "@/app/interface/SaleInterface";
import { FormatCurrency } from "@/app/constant/Fomart";
import FindComponent from "../compoment/FindComponent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { toast } from 'react-toastify';

const ListSalePost = ({ array, categories, onCategorySelect }: { array: SaleInterface[], categories: any[], onCategorySelect: (categoryId: string) => void }) => {
    const dispatch = useDispatch<AppDispatch>();
    const wishlist = useSelector((state: RootState) => state.wishlist.wishlistData);
    const wishlistItems = wishlist?.postLiked || [];
    const userId = useSelector((state: RootState) => state.auth.user?.userEmailId);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (userId) {
            dispatch(getWishlist(userId));
        }
    }, [dispatch, userId]);

    const handleToggleWishlist = async (postId: string) => {
        if (!userId) {
            toast.error("Please login to add items to your wishlist");
            return;
        }
        setIsProcessing(true);
        try {
            await dispatch(togglePostInWishlist({ userId, salePostId: postId })).unwrap();
            toast.success(wishlistItems.some(item => item._id === postId) ? "Removed from wishlist" : "Added to wishlist");
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    const isPostLiked = (postId: string) => {
        return wishlistItems.some(item => item._id === postId);
    };

    return (
        <>

            <div className="container my-4">
                <div className="row">
                    {array.map((sale, index) => (
                        <div className="col-md-3 mb-4" key={index}>
                            <div className="card h-100 shadow-sm">
                                <Link href={`/pages/sale/detail/${sale._id}`} legacyBehavior>
                                    <a>
                                        <Image
                                            src={sale.images[0]}
                                            className="card-img-top"
                                            width={0}
                                            height={0}
                                            sizes="100vw"
                                            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                            alt="Product Image"
                                        />
                                    </a>
                                </Link>
                                <div className="card-body d-flex flex-column">
                                    <Link href={`/pages/sale/detail/${sale._id}`} legacyBehavior>
                                        <a>
                                            <h5 className="card-title">{sale.title}</h5>
                                        </a>
                                    </Link>
                                    <p className="card-text text-secondary">{sale.productStatus}</p>
                                    <div className="mt-auto d-flex justify-content-between align-items-center">
                                        <span className="text-danger fw-bold">{FormatCurrency(sale.price)}</span>
                                        <button
                                            className="btn btn-outline-primary"
                                            onClick={() => handleToggleWishlist(sale._id ? sale._id : "undefined")}
                                            disabled={isProcessing}
                                            title={userId ? "Toggle wishlist" : "Login to use wishlist"}
                                        >
                                            <FontAwesomeIcon icon={isPostLiked(sale._id ? sale._id : "undefined") ? solidHeart : regularHeart} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ListSalePost;
