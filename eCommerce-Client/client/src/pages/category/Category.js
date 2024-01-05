import React from "react";
import CategoryComponent from "../../components/category/Category.Component";
import DefaultLayout from "../../components/Layout/defaultLayout/DefaultLayout";

const Category = () => {
  return (
    <DefaultLayout pageTitle={"Category"}>
      <div className='bg-gradient-to-r from-grey from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% pt-8  px-24'>
        <CategoryComponent />
      </div>
    </DefaultLayout>
  );
};

export default Category;
