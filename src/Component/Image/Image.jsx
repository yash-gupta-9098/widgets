import { useEffect } from "react";

function modifyImageUrlForWidth(originalUrl, width) {
  const urlParts = originalUrl.split('_');
  const baseUrl = urlParts[0];
  const fileExtension = originalUrl.split('.').pop();
  return `${baseUrl}_${width}x${width}.${fileExtension}`;
}

// Example usage:





export function Image({size, src, alt , type , className}){
console.log(src , "src");

  // const modifiedUrl165 = modifyImageUrlForWidth(src, 165);
  // const modifiedUrl330 = modifyImageUrlForWidth(src, 330);
  // const modifiedUrl535 = modifyImageUrlForWidth(src, 535);
  // const modifiedUrl750 = modifyImageUrlForWidth(src, 750);
  
  
  // const srcSet = `${modifiedUrl165} 165w,
  //                 ${modifiedUrl330} 330w,
  //                 ${modifiedUrl535} 535w,
  //                 ${src} 960w`; 

    return  (
        <img className={`${className}`}
        alt={alt}
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }} 
        // srcSet = {srcSet}       
        src={src}
        width={100}
        height={100}
      />
    )


}