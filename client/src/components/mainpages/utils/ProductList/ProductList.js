import React, {  useState } from 'react'
import './productlist.css'
import BtnRendered from './BtnRendered';
const ProductList = ({product,isAdmin}) => {
  const [isChecked, setIsChecked] = useState(product.checked);
 
  if (!product) {
    return <div>No product available</div>;
  }
  const handleCheckboxChange = () => {
    setIsChecked(prevChecked => {
      const newChecked = !prevChecked;
      product.checked = newChecked; // Update the product's checked property
      console.log(product);
      return newChecked;
    });
  };
  
  return (
    <div className='product_card'  key={product._id}>
      {
        isAdmin && <input type='checkbox'checked={product.checked} onChange={handleCheckboxChange}></input>
      }
        <img src={product.images} alt={product.title}/>

        <div className='product_box'>
            <h2 title={product.title}>{product.title}</h2>
            <span>${product.price}</span>
            <p>{product.description}</p>
        </div>
      <BtnRendered product={product} isAdmin ={isAdmin}/>
    </div>
  )
}

export default ProductList
