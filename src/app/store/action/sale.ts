import {SaleInterface} from "@/app/interface/SaleInterface";
import * as Types from "../../constant/ActionType"
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";
import {CategoryInterface} from "@/app/interface/CategoryInterface";


export const getAllSalePost = createAsyncThunk(
    Types.SAlE_SHOW_ALL,
    async ({page}: { page: number }) => {
        try {
            const response = await axios.get(`http://localhost:3001/saleposts/`);
            const data = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.SAlE_SHOW_ALL);

        }
    }
);

export const getAllSalePostByUserId = createAsyncThunk(
    Types.SALE_SHOW_ALL_BY_USER,
    async ({userId}: { userId: string }) => {
        try {
            const response = await axios.get(`http://localhost:3001/saleposts/${userId}`);
            const data = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.SAlE_SHOW_ALL);
            throw error;
        }
    }
);


export const getOneSalePost = createAsyncThunk(
    Types.SAlE_SHOW_ONE,
    async (saleId: string) => {
        try {
            const response = await axios.get(`http://localhost:3001/saleposts/${saleId}`);
            const data: SaleInterface = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.SAlE_SHOW_ONE);

        }
    }
);


export const getAllCategory = createAsyncThunk(
    Types.CATEGORY_SHOW_ALL,
    async () => {
        try {
            const response = await axios.get(`http://localhost:3001/categories`);
            const data: CategoryInterface[] = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.CATEGORY_SHOW_ALL);

        }
    }
);
export const getRelatedProduct = createAsyncThunk(
    Types.SAlE_GET_RELATED_PRODUCT,
    async ({saleId}: { saleId: string }) => {
        try {
            const response = await axios.get(`http://localhost:3001/saleposts/related/${saleId}`);
            const data: [SaleInterface] = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.SAlE_GET_RELATED_PRODUCT);

        }
    }
);

export const createProduct = createAsyncThunk(
    Types.SAlE_CREATE_PRODUCT,
    async ({product, creator}: { product: SaleInterface, creator: string }) => {
        try {
            const response = await axios.post(`http://localhost:3001/saleposts`, {
                "title": product.title,
                "detail": product.detail,
                "images": product.images,
                "price": product.price,
                "productStatus": product.productStatus,
                "brand": product.brand,
                "origin": product.origin,
                "address": product.address,
                "category": product.category,
                "creator": creator,
                "isLock": false,
                "isSold": false
            });
            const data = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.SAlE_CREATE_PRODUCT);

        }
    }
);


// Trong file action/sale.ts
export const getProductsByCategory = createAsyncThunk(
    'SALE_GET_BY_CATEGORY',
    async ({slugId, page}: { slugId: string, page: number }) => {
        try {
            const response = await axios.get(`http://localhost:3001/saleposts/filter/${slugId}?page=${page}`);
            return response.data;
        } catch (error) {
            console.log("Error: SALE_GET_BY_CATEGORY");
            throw error;
        }
    }
);


export const searchProduct = createAsyncThunk(
    Types.SAlE_SEARCH,
    async ({ten, page}: { ten: string, page: string }) => {
        try {
            const response = await axios.get(` http://localhost:3001/search/${ten}?page=${page}`);
            const data = response.data;
            return data;
        } catch (error) {
            console.log("Error: " + Types.SAlE_SEARCH);

        }
    }
);


export const updateSalePost = createAsyncThunk(
    'SALE_UPDATE',
    async (updatedPost: SaleInterface) => {
        try {
            const response = await axios.put(`http://localhost:3001/saleposts/${updatedPost._id}`, updatedPost);
            return response.data;
        } catch (error) {
            console.log("Error: SALE_UPDATE");
            throw error;
        }
    }
);

export const deleteSalePost = createAsyncThunk(
    'SALE_DELETE',
    async (postId: string) => {
        try {
            await axios.delete(`http://localhost:3001/saleposts/${postId}`);
            return postId;
        } catch (error) {
            console.log("Error: SALE_DELETE");
            throw error;
        }
    }
);