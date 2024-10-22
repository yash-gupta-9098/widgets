const ProductPrice = ({ priceRange, tag: Tag }) => {
  console.log(priceRange , "priceRanges")
  console.log(priceRange.minVariantPrice?.amount , "priceRange.minVariantPrices?.amount.")
    return (
      <div className="ws-price-wrapper">

        {priceRange.maxVariantPrice.amount > priceRange.minVariantPrice.amount ? 
              (<Tag className="ws-product-price">
                ${parseFloat(priceRange.minVariantPrice.amount).toFixed(2)}
              </Tag>
              -
              <Tag className="ws-product-price">
                ${parseFloat(priceRange.maxVariantPrice.amount).toFixed(2)}
              </Tag>
              )
              : 
              (<Tag className="ws-product-price">
                ${parseFloat(priceRange.minVariantPrice.amount).toFixed(2)}
              </Tag>
              )
        }
      </div>
    );
  };

  
  export default ProductPrice;