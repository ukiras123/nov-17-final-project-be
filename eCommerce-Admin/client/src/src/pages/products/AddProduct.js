import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { NewProductForm } from "../../components/product/NewProductForm";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const AddProduct = () => {
  return (
    <AdminLayout pageTitle="AddProduct">
      <Link to="/products">
        <Button variant="secondary"> &lt; Back</Button>
      </Link>
      <NewProductForm />
    </AdminLayout>
  );
};

export default AddProduct;
