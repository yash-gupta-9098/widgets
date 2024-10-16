const AddToCartButton = ({ onAddToCart }) => {
    return (
      <button 
        className="ws-add-to-cart-button" 
        onClick={onAddToCart}
        aria-label="Add to Cart"
      >
        Add to Cart
      </button>
    );
  };

  export default AddToCartButton