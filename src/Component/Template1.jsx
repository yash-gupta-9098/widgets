import AddToCartButton from "./ProductCard/AddToCartButton";
import ProductImage from "./ProductCard/ProductImage";
import ProductPrice from "./ProductCard/ProductPrice";
import ProductTitle from "./ProductCard/ProductTitle";
import ProductVariants from "./ProductCard/ProductVariants";

const Template1 = ({ product, onAddToCart, onSelectVariant }) => {
    console.log(product , "product")
    console.log(product.images.nodes , "product.images ")
    return (
      <div className="ws-product-card">
        <ProductImage src={product.images} alt={product.title} />
        <ProductTitle title={product.title} tag="h2" />
        {/* <ProductPrice price={product.price} tag="p" /> */}
        <ProductVariants 
          variants={product.variants.edges} 
          onSelectVariant={onSelectVariant}
        />
        <AddToCartButton onAddToCart={() => onAddToCart(product.id)} />
      </div>
    );
  };
  
  export default Template1;