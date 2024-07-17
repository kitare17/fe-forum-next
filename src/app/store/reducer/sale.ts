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

interface InitialState {
    isLoading: boolean,
    isError: boolean,
    saleDetail?: SaleInterface,
    listCategory?: CategoryInterface[],
    listRelatedProduct?: SaleInterface[],
    listSale: any,
    maxPage: number
}

var initialState: InitialState = {
    listSale: [],
    isLoading: false,
    isError: false,
    maxPage: 1
}


const saleSlice = createSlice({
    name: "sale",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        //GET ALL SALE POST 
        builder.addCase(getAllSalePost.fulfilled, (state, action) => {

            // @ts-ignore
            state.listSale = action.payload.salePosts;
            // @ts-ignore
            state.maxPage = action.payload.maxPage;
            state.isLoading = false;
            state.isError = false;
        })
            .addCase(getAllSalePost.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false
            })
            .addCase(getAllSalePost.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })


            //GET ONE SALE POST
            .addCase(getOneSalePost.fulfilled, (state, action) => {
                // @ts-ignore
                state.saleDetail = action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(getOneSalePost.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false
            })
            .addCase(getOneSalePost.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })

            //GET ALL CATEOGORY
            .addCase(getAllCategory.fulfilled, (state, action) => {
                // @ts-ignore
                state.listCategory = action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(getAllCategory.pending, (state, action) => {

                state.isLoading = true;
                state.isError = false
            })
            .addCase(getAllCategory.rejected, (state, action) => {
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


    }

})

export default saleSlice.reducer;

