import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {GlobalState} from '../../../../GlobalState'
import './detailproduct.css'
const DetailProduct = () => {
    const params =useParams()
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const [detailsProduct,setDetailProduct] = useState(null)


    useEffect(() => {
      console.log('params:', params);
      console.log('products:', products);
      if (params && params.id && products.length > 0) {
          const foundProduct = products.find(product => product._id === params.id);
          setDetailProduct(foundProduct || null);
      }
  }, [params, products]);
    console.log("details",detailsProduct);
    if(detailsProduct=== null) return null;
  return (
    <div className='detail'>
      <img src={detailsProduct.images} alt=''/>
      <div className="box-detail">
        <div className="row">
            <h2>{detailsProduct.title}</h2>
            <h6>{detailsProduct.product_id}</h6>
        </div>
        <span>${detailsProduct.price}</span>
        <span>{detailsProduct.description}</span>
        <p>{detailsProduct.content}</p>
        <p>Sold:{detailsProduct.sold}</p>
        <Link to='/cart' className='cart'>Buy Now</Link>
      </div>
    </div>
  )
}

export default DetailProduct
