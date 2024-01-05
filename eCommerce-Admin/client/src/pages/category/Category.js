import React, { useEffect } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { NewCatForm } from "../../components/category/NewCatForm";
import { useDispatch } from "react-redux";
import { fetchAllCategoryAction } from "./catAction";
import { CategoryTable } from "../../components/category/CategoryTable";
import { EditCatForm } from "../../components/category/EditCatForm";

const Category = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllCategoryAction());
  }, [dispatch]);
  return (
    <AdminLayout pageTitle="Category">
      <NewCatForm />

      <CategoryTable />
    </AdminLayout>
  );
};

export default Category;
