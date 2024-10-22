import React from 'react'
import ProductTemplate from './ProductTemplate'

function ProductCard({id , product , wsSettings 

}) {

  return (    
    <li key={id} className='ws_card_wrapper'>
      <ProductTemplate product={product} 
      wsSettings={wsSettings}

      />
    </li>
    
    
  )
}

export default ProductCard



