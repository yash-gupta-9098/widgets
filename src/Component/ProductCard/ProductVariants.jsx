const ProductVariants = ({ variants, onSelectVariant }) => {
    
console.log(variants , "wsVariant")
    return (
      <select 
        className="ws-product-variants" 
        onChange={e => onSelectVariant(e.target.value)}
        aria-label="Product Variants"
      >
        {variants?.map((variant, index) => (       
        //    console.log(variant , "variant hello")
        //    console.log(variant.node.title , "variant hello")
          <option key={index} value={variant.node.id}>
            {variant.node.title}
          </option>
            )
        )}
      </select>
    );
  };

  
  export default ProductVariants