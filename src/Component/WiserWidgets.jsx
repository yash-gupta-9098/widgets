import React, { useEffect, useState } from 'react';
import Template1 from "./Template1";  // Assuming Template1 is the product card template

const storefrontAccessToken = 'da7f59fb8c1243a59a17bc02673cc9fd'; 
const shopUrl = 'https://yash-demo-store-evm.myshopify.com/api/2023-10/graphql.json';

// Function to query Shopify Storefront API
async function queryShopify(query) {
  const response = await fetch(shopUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      'Accept-Language': 'ar'
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
    nodes {
      id
      title
      handle
      tags
      vendor
      productType
      totalInventory
      publishedAt
      images(first: 2) {
        nodes {
          url(transform: {maxHeight: 640, maxWidth: 640})
        }
      }
      media(first: 10) {
        nodes {
          mediaContentType
          previewImage {
            url
            altText
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
          }
        }
      }
    }
  }
}`;

    queryShopify(query).then((data) => {
      if (data?.data?.products?.nodes) {
        setProducts(data.data.products.nodes);
      }
    });
  }, []);

  const handleAddToCart = (productId) => {
    console.log(`Product ${productId} added to cart`);
  };

  const handleSelectVariant = (variant) => {
    console.log(`Selected variant: ${variant}`);
  };

  return (
    <div className="ws-widget">
      {products.map(product => (
        <Template1
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
          onSelectVariant={handleSelectVariant}
        />
      ))}
    </div>
  );
};

export default WiserWidgets;
