import { productsApi,useGetAllProductsQuery } from "../features/productsApi"
import { useDispatch, useSelector } from "react-redux";
import  {addToCart}  from "../features/cartSlice";





const Home = () => {



  const dispatch = useDispatch();

  const handleAddToCart = (product) => {

    dispatch(addToCart(product));
    
  }



  const {data ,error,isLoading} = useGetAllProductsQuery()

  
  return (
    <div className='home-container'>
      {isLoading ? (
        <p>Loading...</p>
      ): error ? (
        <p>Hata var....</p>
      ):(

        <>
       <h2>new arrivals</h2>
       
       <div className='products'>

        {
          data.map( product => <div key={product.id} className= "product">

           <h3>{product.name}</h3>
           <img src={product.Image}></img>
            <div className="details">
 
              <span>{product.desc}</span>
              <span>{product.price}</span>

              
           </div>
           

           <button onClick={() =>handleAddToCart(product)} >Add to Card</button>
          </div>  )
        }
        
       </div>
      
        </>
      )
                 
      }
    </div>
  )
}

export default Home
