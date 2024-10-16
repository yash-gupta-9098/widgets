const ProductImage = ({ src , alt }) => {
  console.log(src , "src djkhjkh")
  if (!src || !src.nodes || !Array.isArray(src.nodes) || src.nodes.length === 0) {
    console.warn('Invalid src or missing nodes in ProductImage:', src);

    // Return SVG placeholder if the src is invalid
    return (
      <svg className="placeholder-svg" preserveAspectRatio="xMidYMid slice" width="448" height="448" viewBox="0 0 448 448" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0)">
          <path d="M448 0H0v448h448V0Z" fill="#F2F2F2"></path>
          <path d="m354.53 158.19-33.31-35.87a59.971 59.971 0 0 0-32.2-18.01l-20.99-4.2c-2.72-.49-5.45-.93-8.17-1.33v-.01l-.01.01v-.01c-1.29-.21-2.58-.31-3.88-.29-1.3.01-2.6.14-3.88.38l-7.25 1.36-7.08 1.33c-4.54.85-9.13 1.28-13.72 1.27-4.59 0-9.19-.42-13.72-1.27l-7.08-1.33-7.25-1.36c-1.28-.24-2.58-.37-3.88-.38-1.3-.02-2.6.08-3.88.29v.01l-.01-.01c-2.73.4-5.46.83-8.17 1.33l-20.99 4.2a59.971 59.971 0 0 0-32.2 18.01l-33.31 35.87c-3.03 3.26-2.81 8.37.48 11.36l32.37 29.43c3.16 2.87 8.02 2.76 11.04-.26l9.48-9.48c1.89-1.89 5.12-.55 5.12 2.12v136.76c0 4.42 3.58 8 8 8h128c4.42 0 8-3.58 8-8V191.36c0-2.67 3.23-4.01 5.12-2.12l9.48 9.48a7.994 7.994 0 0 0 11.04.26l32.37-29.43c3.29-2.99 3.51-8.1.48-11.36Z" fill="#D6912B"></path>
          {/* Additional SVG paths */}
        </g>
      </svg>
    );
  }

  return (
    <>
      {src && src.nodes.map((image, index) => (
        <img
          key={index}
          className="ws-product-image"
          src={image.url} // Assuming each image object has a `url` property
          alt={alt}
          loading="lazy"
          decoding="async"
          width="300"
          height="300"
        />
      ))}

    
    </>
  );
};

export default ProductImage;


