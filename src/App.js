import React, { useEffect, useState } from 'react';
const storefrontAccessToken = 'da7f59fb8c1243a59a17bc02673cc9fd'; // Use the token you obtained
const shopUrl = 'https://yash-demo-store-evm.myshopify.com/api/2023-10/graphql.json';

async function queryShopify(query) {
  const response = await fetch(shopUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      'Accept-Language': 'en' // Setting Arabic as language
    },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();
  return data;
}

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const query = `
    {
      products(
        first: 10, 
        query: "published_status:published",  
        reverse: true
      ) {
        nodes {
          id
          title
          handle
          tags
          vendor
          productType
          totalInventory
          publishedAt
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
      setProducts(data.data.products.nodes);
    });
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.title}</h2>
            <p>Vendor: {product.vendor}</p>
            <p>Type: {product.productType}</p>
            <p>Tags: {product.tags.join(', ')}</p>
            <p>Total Inventory: {product.totalInventory}</p>
            <p>Published: {new Date(product.publishedAt).toLocaleDateString()}</p>
            <h3>Variants:</h3>
            <ul>
              {product.variants.edges.map((variant) => (
                <li key={variant.node.id}>
                  {variant.node.title} - {variant.node.availableForSale ? 'In stock' : 'Out of stock'}
                  <br />
                  Options: {variant.node.selectedOptions.map(option => `${option.name}: ${option.value}`).join(', ')}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

