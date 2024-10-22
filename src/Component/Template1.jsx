import { useState } from "react";
import AddToCartButton from "./ProductCard/AddToCartButton";
import ProductImage from "./ProductCard/ProductImage";
import ProductPrice from "./ProductCard/ProductPrice";
import ProductTitle from "./ProductCard/ProductTitle";
import ProductVariants from "./ProductCard/ProductVariants";




const Template1 = ({ product, onAddToCart, onSelectVariant}) => {
 
  const [selectedVariant, setSelectedVariant] = useState(product.variants.edges[0].node);
  const [selectedImage, setSelectedImage] = useState(product.images.nodes?.url);
    console.log(product , "product")
    console.log(product.images.nodes , "product.images ")
    const handleVariantChange = (e) => {
      const variantId = e.target.value;
      const newVariant = product.variants.edges.find(v => v.node.id === variantId).node;
      setSelectedVariant(newVariant);
      // If the variant has an image, update the image
      const variantImage = product.media.nodes.find(media => media.mediaContentType === "IMAGE" && media.previewImage.altText === newVariant.title);
      if (variantImage) {
        setSelectedImage(variantImage.previewImage.url);
      } else {
        setSelectedImage(product.images.nodes[0]?.url);
      }
    }; 

    return (
      <div className="ws-product-card">
        <ProductImage src={selectedImage} alt={selectedVariant.title} />
        <ProductTitle title={product.title} tag="h2" />
        <ProductPrice priceRange={product.priceRange} tag="p" />
        <ProductVariants 
          variants={product.variants.edges} 
          onSelectVariant={handleVariantChange}
        />
        <AddToCartButton onAddToCart={() => onAddToCart(product.id)} />
      </div>
    );
  };
  
  export default Template1;