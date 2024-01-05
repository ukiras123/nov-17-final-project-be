import React, { useEffect, useState } from "react";
import DefaultLayout from "../../components/Layout/defaultLayout/DefaultLayout";
import ProductCard from "../../components/card/productCard/ProductCard";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Product = () => {
  const [product, setProduct] = useState([]);
  const { catList } = useSelector((state) => state.category);
  const { slug } = useParams();
  // url==categeryname
  const { productList } = useSelector((state) => state.product);
  // console.log(catList, productList)
  useEffect(() => {
    if (catList.length > 0 && productList.length > 0) {
      const { _id } = catList.find(item => item.slug === slug)
      const products = productList.filter(item => (item.categoryId === _id));
      setProduct(products)
    }
  }, [catList, productList, slug])



  // console.table("product",product)
  return (
    <DefaultLayout>
      <div style={{
        display: "flex"
      }}>
        {
          product.map(item => <ProductCard key={item._id} {...item} />)
        }
      </div>
    </DefaultLayout>
  );
};

export default Product;
