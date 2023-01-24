import React, { useEffect } from 'react'

import  { useSelector } from "react-redux";

import { Link  } from "react-router-dom";

import { removeFromCart,increaseCart, decreaseCart,clearCart, getTotals } from '../features/cartSlice';

import { useDispatch } from 'react-redux';



const Cart = ( )  => {

  const dispatch = useDispatch();

const cart = useSelector((state) => state.cart)


useEffect(() => {
  
 dispatch(getTotals()) 

},[cart, dispatch])


const handleRemove = (cartItem) => {

  dispatch(removeFromCart(cartItem));
}

const handleİncrement = (cartItem) => {
  
  dispatch(decreaseCart(cartItem))
}
const handleDecrement = (cartItem) => {
  
  dispatch(increaseCart(cartItem))
}

const handleClear = () => {
  dispatch(clearCart())
}

console.log(cart)
  return (
    <div className='cart-container'>
      <h4>Shopping Cart</h4>
        {
          cart.cartItems.length === 0 ? (
             
             <div className='cart-empty'>

               <h2>Cart Currently Empty</h2>
               <div className='start-shopping'>
                 <Link to="/">
                 <svg xmlns="http://www.w3.org/2000/svg"
                  width="16" height="16" fill="currentColor" 
                  class="bi bi-arrow-left" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" 
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.
                  708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 
                  8.5H14.5A.5.5 0 0 0 15 8z"/>
                 </svg>
                  <span>Alışverişe başla</span>
                 
                 </Link>


               </div>
             </div>

          ) :(
            <>
            <div className='title'>
              <h3 className='product-title'>Product</h3>
              <h3 className='price'>Price</h3>
              <h3 className='Quantity'>Quantity</h3>
              <h3 className='total'>Total</h3>
            </div>

            <div className='cart-items'>

              {
                cart.cartItems?.map((cartItem) => (

                  <div className='cart-item'>
                    <div className='cart-product'>
                     <img src={cartItem.Image} alt = {cartItem.name}></img>
                     <div>
                      <h3>{cartItem.name}</h3>
                      <p>{cartItem.desc}</p>
                      <button onClick={() => handleRemove(cartItem) } >Remove</button>
                    </div>
                    </div>
                    <div className='cart-product-price'>${cartItem.price}</div>
                    <div className='cart-product-quantity'>
                      <button  onClick={() => handleDecrement(cartItem)}>+</button>
                      <div className='count'>{cartItem.cartQuantity}</div>
                      <button onClick={() => handleİncrement(cartItem)}>-</button>
                    </div>
                    <div className='cart-product-total-price'>
                      ${cartItem.price * cartItem.cartQuantity}
                    </div>
                  </div>
                  
                ))}
            </div>
            <div className='cart-summary'>
            <button className='clear-cart'  onClick = {() => handleClear()}>temizle</button>       
            <div className='cart-checkout'>
               <div className='subtotal'>
                <span>Sub Total</span>
                <span className='amount'>${cart.cartTotalAmount}</span>
               </div>
               <p>Taxes and shipping calcuted at checkout</p>
               <button>Check out</button>
               <div className='continue-shopping'>
                 <Link to="/">
                 <svg xmlns="http://www.w3.org/2000/svg"
                  width="16" height="16" fill="currentColor" 
                  class="bi bi-arrow-left" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" 
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.
                  708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 
                  8.5H14.5A.5.5 0 0 0 15 8z"/>
                 </svg>
                  <span>Alışverişe başla</span>
                 
                 </Link>


               </div>
            </div>
            </div>
            </>
          
          )
        }
    </div>
  )
}

export default Cart
