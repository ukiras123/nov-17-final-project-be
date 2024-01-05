import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { EditProductForm } from "../../components/product/EditProductForm";

const EditProduct = () => {
  return (
    <div>
      <AdminLayout pageTitle={"Edit Product"}>
        <Link to='/products'>
          <Button variant='secondary'> &lt; Back</Button>
        </Link>
        <EditProductForm />
      </AdminLayout>
    </div>
  );
};

export default EditProduct;
