import {UserInterface} from "@/app/interface/userinterface";
import {createSlice} from "@reduxjs/toolkit";
import {fetchUsers} from "@/app/store/action/user";
import {
    createProduct,
    getAllCategory,
    getAllSalePost,
    getOneSalePost,
    getRelatedProduct
} from "@/app/store/action/sale";
import {SaleInterface} from "@/app/interface/SaleInterface";
import {CategoryInterface} from "@/app/interface/CategoryInterface";
import { createSlice } from "@reduxjs/toolkit";
import { getAllCategory, getAllSalePost, getAllSalePostByUserId, getOneSalePost, searchProduct, getProductsByCategory, deleteSalePost, updateSalePost } from "@/app/store/action/sale";
import { SaleInterface } from "@/app/interface/SaleInterface";
import { CategoryInterface } from "@/app/interface/CategoryInterface";

interface InitialState {
    isLoading: boolean,
    isError: boolean,
    saleDetail?: SaleInterface,
    listCategory?: CategoryInterface[],
    listRelatedProduct?: SaleInterface[],
    listSale: any,
    maxPage: number
    allSalePosts: SaleInterface[],
    userSalePosts: SaleInterface[],
    allPostsMaxPage: number,
    userPostsMaxPage: number
}

var initialState: InitialState = {
    allSalePosts: [],
    userSalePosts: [],
    isLoading: false,
    isError: false,
    allPostsMaxPage: 1,
    userPostsMaxPage: 1
}


const saleSlice = createSlice({
    name: "sale",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {

        builder
            // GET ALL SALE POST
            .addCase(getAllSalePost.fulfilled, (state, action) => {
                state.allSalePosts = action.payload.salePosts;
                state.allPostsMaxPage = action.payload.maxPage;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(getAllSalePost.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getAllSalePost.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })

            // GET ALL SALE POST BY USER ID
            .addCase(getAllSalePostByUserId.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getAllSalePostByUserId.fulfilled, (state, action) => {
                state.userSalePosts = action.payload.salePosts;
                state.userPostsMaxPage = action.payload.maxPage;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(getAllSalePostByUserId.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })


            // Find SALE POST
            .addCase(searchProduct.fulfilled, (state, action) => {
                state.allSalePosts = action.payload.salePosts;
                state.allPostsMaxPage = action.payload.maxPage;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(searchProduct.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(searchProduct.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })

        //GET ONE SALE POST
            // GET ONE SALE POST
            .addCase(getOneSalePost.fulfilled, (state, action) => {
                state.saleDetail = action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(getOneSalePost.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getOneSalePost.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })

            // GET ALL CATEGORY
            .addCase(getAllCategory.fulfilled, (state, action) => {
                state.listCategory = action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(getAllCategory.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getAllCategory.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })

            // GET PRODUCTS BY CATEGORY
            .addCase(getProductsByCategory.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getProductsByCategory.fulfilled, (state, action) => {
                state.allSalePosts = action.payload.salePosts;
                state.allPostsMaxPage = action.payload.maxPage;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(getProductsByCategory.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })


            //GET RELATED PRODUCT
            .addCase(getRelatedProduct.fulfilled, (state, action) => {
                // @ts-ignore
                state.listRelatedProduct = action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(getRelatedProduct.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false
            })
            .addCase(getRelatedProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
            //CREATE PRODUCT
            .addCase(createProduct.fulfilled, (state, action) => {
                // @ts-ignore
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(createProduct.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })

            // DELETE SALE POST
            .addCase(deleteSalePost.fulfilled, (state, action) => {
                state.allSalePosts = state.allSalePosts.filter((post: SaleInterface) => post._id !== action.payload);
                state.userSalePosts = state.userSalePosts.filter((post: SaleInterface) => post._id !== action.payload);
            })
            // UPDATE SALE POST
            .addCase(updateSalePost.fulfilled, (state, action) => {
                // Update in both lists
                const allIndex = state.allSalePosts.findIndex((post: SaleInterface) => post._id === action.payload._id);
                if (allIndex !== -1) {
                    state.allSalePosts[allIndex] = action.payload;
                }
                const userIndex = state.userSalePosts.findIndex((post: SaleInterface) => post._id === action.payload._id);
                if (userIndex !== -1) {
                    state.userSalePosts[userIndex] = action.payload;
                }
            })

    }

})

export default saleSlice.reducer;

