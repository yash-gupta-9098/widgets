import React, { useEffect, useState } from 'react'
import {Heading} from "./Text/Heading";
import {WiserButton} from "./Actions/WiserButton"
import {Image} from "./Image/Image.jsx"
import {Select} from '../Component/Select/Select'
import {SkeletonBodyText} from "../Component/Skeleton/SkeletonBodyText";
import { Suspense, lazy } from 'react';
import {ProductPrice} from "../Component/Price/ProductPrice";
import ProductImage from './Image/ProductImage.jsx';

function ProductTemplate({product ,
     wsSettings
    }) {

        console.log(product , "product kjkjlkjlk")
        // console.log(product.node.media , "product.media")
  const [price , setPrice] = useState("");
  const [comparePrice , setComparePrice] = useState("");
  const [imageUrl  , setImageUrl] = useState(product?.node.media.edges);
  const [vid , setVid] = useState("")

  useEffect(()=>{
    setImageUrl(product?.node.media.edges);  
    console.log(product?.node.variants.edges , "product.variants.edges")
    console.log(product?.node.variants.edges.length , "product.variants.edges.length ")
    if (product?.node.variants.edges.length <= 1) {
      // If there's one or zero options, use the product price and compareAtPrice directly
      const variant = product?.node.variants.edges[0].node; // Assuming the first variant if there's no selection
      setPrice(variant.price);
      setComparePrice(variant.compareAtPrice?.amount || ""); // Handle cases where compareAtPrice may not exist
  }
  }, [product])

  const ws_add_click = () => {
    const SelectVidForadd = vid.split("/").pop();
    console.log(SelectVidForadd);
    if (!SelectVidForadd) {
      console.error("Invalid product ID");
      return;
    }
    let formData = {
      items: [
        {
          id: 41175192273035,
          quantity: 1,
        },
      ],
    };
    fetch("https://meghna-demo-store.myshopify.com/" + "cart/add.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
      body: JSON.stringify(formData),
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error("Response not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className='ws_card_header'>
        <div className="ws_image_wrapper">
          <div className="ws_card_image_container"> 
            
              <ProductImage images={imageUrl} />
              
            
          </div>
        </div>
    </div>
    <div className='ws_card_info ws_card_buttom'>     

              <div className='ws_card_info_top'>

      {
      wsSettings?.show_product_title && (
        <Heading text={product.node.title} as="h4" className="ws_Product_title"/>
      )
    } 

         {
         wsSettings?.show_price && price && (typeof price !== 'undefined') && (  
            <div className="ws_product_price_wrapper">  
              <ProductPrice comparePrice= {comparePrice} price={price} wsSettings={wsSettings} options={product?.node.variants.edges}/>
            </div>
         )
        }
          
        <div className='ws_Product_option_wrapper'>
          <Select vid ={vid} comparePrice={comparePrice} setComparePrice={setComparePrice} setVid={setVid} imageUrl={imageUrl} setImageUrl={setImageUrl} id={product.id}  price={price}  setPrice={setPrice} options={product?.node.variants.edges} placeholder="Select The Variant"/>
        </div>
      </div>
      {
        wsSettings?.enable_add_to_cart && (
          <WiserButton  text={wsSettings?.add_to_cart_text} type="submit" role="button" className="ws_Product_Button" onClick={ws_add_click} />
        )
      }
      
      
    </div>

    </>
  )
}

export default ProductTemplate


