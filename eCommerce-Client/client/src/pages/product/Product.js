import React, { useEffect, useState } from "react";
import DefaultLayout from "../../components/Layout/defaultLayout/DefaultLayout";
import ProductCard from "../../components/card/productCard/ProductCard";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Product = () => {
const [product , setProduct] = useState([]); 
  const {catList} = useSelector((state)=>state.category);
const {slug} = useParams(); 
// url==categeryname
const {productList} = useSelector((state)=>state.product);
// console.log(catList, productList)
useEffect(()=>{

const {_id} = catList.find(item => item.slug === slug)

console.log("product list", productList)
const products = productList.filter(item=>(item.categoryId===_id));
console.log("products",products)


setProduct(products)

},[catList, productList ])


// console.table("product",product)
  return (
    <DefaultLayout>
      {
        product.map(item=><ProductCard key={item._id} {...item}/>)
      }
    </DefaultLayout>
  );
};

export default Product;
