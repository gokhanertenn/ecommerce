import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import cartReducer, {getTotals} from "./cartSlice";
import { productsApi } from "./productsApi";
import productsSlice, { productsFetch } from "./productsSlice";





 export const store = configureStore({
   
    reducer: {
        products:productsSlice,
        cart:cartReducer,
        [productsApi.reducerPath] : productsApi.reducer
    },
    middleware : (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(productsApi.middleware)
    

})

store.dispatch(productsFetch());
store.dispatch(getTotals());