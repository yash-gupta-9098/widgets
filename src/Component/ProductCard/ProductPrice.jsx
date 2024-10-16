const ProductPrice = ({ price, tag: Tag }) => {
    return (
      <Tag className="ws-product-price">
        ${price.toFixed(2)}
      </Tag>
    );
  };

  
  export default ProductPrice;