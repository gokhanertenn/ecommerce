import { createSlice } from "@reduxjs/toolkit";
import { json } from "react-router-dom";
import { toast } from "react-toastify";




const cartSlice = createSlice({

    name:"cart",
    initialState:{
        cartItems:localStorage.getItem("cartItems") 
        ? JSON.parse(localStorage.getItem("cartItems")) : [],
        cartTotalQuantity:0,
        cartTotalAmount:0,
    },
    reducers: {
        addToCart(state,action)  {
            const itemIndex = state.cartItems.findIndex(
              (item) => item.id === action.payload.id
            )
            if(itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1;
                toast.info(`increased ${state.cartItems[itemIndex].name} cart quantity` , {
                    position:"bottom-left"
                })
            } else {
                const tempProduct = {...action.payload, cartQuantity: 1 }
                state.cartItems.push(tempProduct)
                toast.success( `${action.payload.name} to card`  , {
                    position:"bottom-left"
                })
            }
          localStorage.setItem("cartItems" , JSON.stringify(state.cartItems))
        },
        removeFromCart(state,action) {
           const nextCartItems = state.cartItems.filter(
                cartItem => cartItem.id !== action.payload.id
            )

            state.cartItems = nextCartItems;
            localStorage.setItem("cartItem" , JSON.stringify(state.cartItems))

            toast.error(`${action.payload.name} removed from card`) , {
                position:"bottom-left",
            }
        },
        decreaseCart(state,action) {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
              )
              if(state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1
              }
        },
        increaseCart(state,action) {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            )
            if (state.cartItems[itemIndex].cartQuantity < 100) {
                state.cartItems[itemIndex].cartQuantity += 1
            }
        },
        clearCart(state,action) {
            state.cartItems = [],
            localStorage.setItem("cartItem" , JSON.stringify(state.cartItems))
        },
        getTotals(state,action) {
            let {total, quantity} = state.cartItems.reduce((cartTotal,cartItem) => {
                 
                const {price, cartQuantity} = cartItem;
                const itemTotal = price * cartQuantity;

                cartTotal.total += itemTotal
                cartTotal.quantity += cartQuantity

                return cartTotal

            }, {
                total:0,
                quantity:0
            })

            state.cartTotalQuantity = quantity
            state.cartTotalAmount = total

        }
}
})

export const { addToCart, removeFromCart,decreaseCart,increaseCart,clearCart,getTotals } = cartSlice.actions;

export default cartSlice.reducer