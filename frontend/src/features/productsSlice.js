import {createSlice} from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";



export const productsFetch = createAsyncThunk("products/getProducts", async () => {

    
        const response = await axios.get("http://localhost:5000/products")
        return response?.data
     

    
    
})


const productsSlice = createSlice({
    name:"products",
    initialState:{
        item:[],
        status:null,
        error:null
    },
    reducers:{

    },
    extraReducers: (builder) => {
        builder.addCase(productsFetch.pending, (state,action) => {
             
         state.status = "pending"
        }),
        builder.addCase(productsFetch.fulfilled, (state,action) => {
             
         state.status = "pending"   
         state.item = action.payload
        }),
        builder.addCase(productsFetch.rejected, (state,action) => {
             
         state.status = "rejected"
         state.error = action.payload
        })
        
    }
})

export default productsSlice.reducer