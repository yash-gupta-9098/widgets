import React from 'react'
import { Heading } from '../Text/Heading'

export function ProductPrice({price , comparePrice , wsSettings , options}) {

    let cmPrice = "";

    // let minMaxPrice = ShowMinMaxPrice(options);

        // console.log(minMaxPrice[0], minMaxPrice[1] , "minMaxPrice");
    // if( wsSettings?.general_setting.not_allow_decimal =="false" && wsSettings.general_setting.allow_comma_inprice =="false"){
        // cmPrice = comparePrice
    //     console.log(cmPrice , "false, false")
    // }
    // else  {
    //     if(wsSettings.general_setting.allow_comma_inprice == "true"){
    //     cmPrice = convertToCommaPrice(comparePrice)
    //     console.log(cmPrice , "true, allaow")
    //     }
    //     else if (wsSettings.general_setting.not_allow_decimal == "true"){
    //         console.log(cmPrice , "true ")
    //         cmPrice = parseInt(parseFloat(comparePrice).toFixed(2))
    //     }
    // } 

    
   
  return (
    <>

        {
            // minMaxPrice[0] == minMaxPrice[1] && (
                <Heading text={window?.ShopifyWsObj.wsGetMnyFrmt(price.amount * 100)} as="p"  className="ws_Product_Price"/>
                // )
        }

            {/* <Heading text={`from ${minMaxPrice[0] } - ${minMaxPrice[1]} `} as="p"  className="ws_Product_Price" />
        


     {  comparePrice && (typeof comparePrice !== 'undefined') && (comparePrice > price) && (
            <Heading text={cmPrice} as="p"  className="ws_Product_Price"/>
     )} */}

   
    

    
    </>
  )
}



function convertToCommaPrice(decimalPrice) {
    // Convert the decimal price to a string
    let priceString = decimalPrice.toString();
  
    // Split the string into parts before and after the decimal point
    let parts = priceString.split(".");
  
    // Add commas to the part before the decimal point
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
    // Join the parts back together with a comma as the decimal separator
    return parts.join(",");
  }



  function ShowMinMaxPrice(options){
    const availableVariants = options.filter(variant => variant.availableForSale);
    console.log(availableVariants)
    const prices = availableVariants.flatMap((variant) =>
        parseFloat(variant.price),
    );
//   const compareAtPrice = availableVariants.flatMap((variant) =>
//     parseFloat(variant.compareAtPrice),
//   );

  const NoRepeted = new Set(prices);

//   console.log(NoRepeted, "prices");
  const lowestValue = Math.min(...prices);
  const highestValue = Math.max(...prices);
//   const lowestCompareAtValue = Math.min(...compareAtPrice);
//   const highestCompareAtValue = Math.max(...compareAtPrice); 

  return [lowestValue  , highestValue ]

}
