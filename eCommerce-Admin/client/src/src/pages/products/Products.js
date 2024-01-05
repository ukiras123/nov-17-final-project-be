import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { Button } from "react-bootstrap";
import { ProductTable } from "../../components/product/ProductTable";
import { Link } from "react-router-dom";

const Products = () => {
  return (
    <AdminLayout pageTitle="Products">
      <div className="text-end">
        <Link to="/product/new">
          <Button>Add New Product</Button>
        </Link>

        <ProductTable />
      </div>
    </AdminLayout>
  );
};

export default Products;
