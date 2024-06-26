import {UserInterface} from "@/app/interface/userinterface";
import {createSlice} from "@reduxjs/toolkit";
import {fetchUsers} from "@/app/store/action/user";
import {getAllSalePost} from "@/app/store/action/sale";


var initialState = {
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
        builder.addCase(getAllSalePost.fulfilled, (state, action) => {

            // @ts-ignore
            state.listSale=action.payload.salePosts;
            // @ts-ignore
            state.maxPage=action.payload.maxPage;
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

    }

})

export default saleSlice.reducer;

