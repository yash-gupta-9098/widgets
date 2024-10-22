import React, { useEffect, useState } from 'react';
// import Template1 from "./Template1";  // Assuming Template1 is the product card template
import "../App.css"
import { Heading } from './Text/Heading';
import 'swiper/css';
import ProductCard from './ProductCard';
const storefrontAccessToken = 'da7f59fb8c1243a59a17bc02673cc9fd'; 
const shopUrl = 'https://yash-demo-store-evm.myshopify.com/api/2024-10/graphql.json';


const wsSettings = window?.__wsGnrlSetts
// {
//   "template": "template2",
//   "no_of_products": "15",
//   "heading_title_align": "left",
//   "heading_font_size": "22",
//   "heading_font_color": "ff0000",
//   "show_product_title": "true",
//   "product_title_align": "center",
//   "product_title_font_size": "15",
//   "product_title_font_color": "000000",
//   "enable_truncate_title": "true",
//   "truncate_title": "30",
//   "enable_add_to_cart": "true",
//   "add_to_cart_text": "Add to Cart",
//   "addcart_button_background": "000000",
//   "show_price": "true",
//   "price_font_size": "15",
//   "price_font_color": "000000",
//   "ori_price_font_color": "FF5C5C",
//   "imgsize": "320X320",
//   "product_view": "grid",
//   "product_view_type": "",
//   "setting_status": "advanced",
//   "enable_redirection": "false",
//   "products_per_slider": "4",
//   "design_version": "2",
//   "price_align": "center",
//   "show_compare_price": "true",
//   "shopify_product_review": "false",
//   "review_publickey": "",
//   "yotpo_review_publickey": "",
//   "yotpo_review_instanceid": "",
//   "hover_image": "true",
//   "hide_ofs": "false",
//   "addcart_button_font": "FFFFFF",
//   "price_tax": "",
//   "hide_oos_variants": "true",
//   "custom_css": "",
//   "not_allow_decimal": "false",
//   "currency_before": "$",
//   "currency_after": "",
//   "addcart_confirmation_msg": "Added to cart!",
//   "viewcart_confirmation_msg": "View cart",
//   "countinue_confirmation_msg": "Continue shopping.",
//   "or_confirmation_msg": "or",
//   "shopify_product_convertor": "false",
//   "tax_type": "fixed",
//   "outofstock_msg": "Product is out of stock.",
//   "wiser_wishlist_option": "false",
//   "wiserlist_icon_color": "373333",
//   "thankyoupage_viewtype": "grid",
//   "allow_comma_inprice": "false",
//   "mobile_product_view": "grid",
//   "mobile_products_per_slider": "1",
//   "ipad_products_per_slider": "2",
//   "enable_addtocart_msg": "true",
//   "show_price_reverse": "false",
//   "sold_out_btn_txt": "Sold out",
//   "badge_on_off": "true",
//   "badge_text": "Sale",
//   "badge_align": "top_left",
//   "show_product_vendor": "true",
//   "product_vendor_font_size": "15",
//   "product_vendor_font_color": "dad000"
// }


const wsSettingUpdateByStyle = {
  "--ws-no-of-products" : wsSettings?.no_of_products || "10", 
  "--ws--heading-title-align": wsSettings?.heading_title_align || "center",
  "--ws--heading-font-size": wsSettings?.heading_font_size ?  `${wsSettings?.heading_font_size}px` : "22px",
  "--ws--heading-font-color":wsSettings?.heading_font_color ?  `#${wsSettings.heading_font_color}`  : "#000",  
  "--ws-product-title-align": wsSettings?.product_title_align || "center",  
  "--ws--product-title-font-size": wsSettings?.product_title_font_size ?  `${wsSettings?.product_title_font_size}px` : "18px",
  "--ws--product-title-font-color":wsSettings?.product_title_font_color ?  `#${wsSettings.product_title_font_color}`  : "#000",
  "--ws--price-font-size": wsSettings?.price_font_size ?  `${wsSettings?.price_font_size}px` : "18px",
  "--ws--price-font-color":wsSettings?.price_font_color ?  `#${wsSettings.price_font_color}`  : "#000",
  "--ws--ori-price-font-color":wsSettings?.ori_price_font_color ?  `#${wsSettings.ori_price_font_color}`  : "#000",
  "--ws-price-align": wsSettings?.price_align || "center",
  "--ws--addcart-button-background":wsSettings?.addcart_button_background ?  `#${wsSettings.addcart_button_background}`  : "#212121",
  "--ws--addcart-button-font-color":wsSettings?.addcart_button_font ?  `#${wsSettings.addcart_button_font}`  : "#fff",
  "--ws--wishlist-button-color":wsSettings?.wiserlist_icon_color ?  `#${wsSettings.wiserlist_icon_color}`  : "#ff0000",
  "--ws--vendor-font-color":wsSettings?.product_vendor_font_color ?  `#${wsSettings.product_vendor_font_color}`  : "#212121",
  "--ws--vendor-font-size": wsSettings?.product_vendor_font_size ?  `${wsSettings?.product_vendor_font_size}px` : "18px",
// ori_price_font_color iska  font size ki setting bhi bnaye  please ;

  "--ws-products-per-slider" : wsSettings?.products_per_slider || "4",
}; 



for (const [property, value] of Object.entries(wsSettingUpdateByStyle)) {
  document.documentElement.style.setProperty(property, value);
} 



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




  return (
    <div className="ws-widget-section">
        <Heading text="NewArrivals" as="h2" className="ws_widgets_heading"/>
        <ul className="ws-items-wrapper">
         { console.log(products) }
          {products.map(product => (     
            <ProductCard
              key={product.id}
              product={product}
              wsSettings={wsSettings}
            />
            
          ))}
        </ul>
    </div>
  );
};

export default WiserWidgets;
