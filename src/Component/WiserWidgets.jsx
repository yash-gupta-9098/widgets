import React, { useEffect, useState } from 'react';
// import Template1 from "./Template1";  // Assuming Template1 is the product card template
import "../App.css"
import { Heading } from './Text/Heading';
import 'swiper/css';
import ProductCard from './ProductCard';
const storefrontAccessToken = 'da7f59fb8c1243a59a17bc02673cc9fd'; 
const shopUrl = 'https://yash-demo-store-evm.myshopify.com/api/2024-10/graphql.json';

// Function to query Shopify Storefront API
async function queryShopify(query) {
  const response = await fetch(shopUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      'Accept-Language': 'en'
    },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();
  return data;
}

const WiserWidgets = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const query = `
   {
  products(first: 10, query: "published_status:published", reverse: true) {
    edges {
      node {
        id
        title
        handle
        tags
        vendor
        productType
        totalInventory
        publishedAt
        media(first: 10) {
          edges {
            node {
              alt
              previewImage {
                url
                altText
              }
            }
          }
        }
        variants(first: 50) {
          edges {
            node {
              id
              title
              availableForSale
              selectedOptions {
                name
                value
              }
              price {
                amount
                currencyCode
              }
            }
          }
        }      
        priceRange {
          maxVariantPrice {
            amount
            currencyCode
          }
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
}`;

    queryShopify(query).then((data) => {
      console.log(data , "data new api ")
      if (data?.data?.products?.edges) {
        setProducts(data.data.products.edges);
      }
    });
  }, []);

  // const handleAddToCart = (productId) => {
  //   console.log(`Product ${productId} added to cart`);
  // };

  // const handleSelectVariant = (variant) => {
  //   console.log(`Selected variant: ${variant}`);
  // };



  return (
    <div className="ws-widget-section">
        <Heading text="NewArrivals" as="h2" className="ws_widgets_heading"/>
        <ul className="ws-items-wrapper">
         { console.log(products) }
          {products.map(product => (     
            <ProductCard
              key={product.id}
              product={product}
              
            />
            
          ))}
        </ul>
    </div>
  );
};

export default WiserWidgets;
