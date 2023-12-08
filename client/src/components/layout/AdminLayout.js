import React from "react";
import Header from "./Header";
import { Footer } from "./Footer";
import { Link } from "react-router-dom";
import { SideMenu } from "../side-menu/SideMenu";

const AdminLayout = ({ children, pageTitle }) => {
  return (
    <div className="admin-layout d-flex">
      <div className="left w-25 bg-dark text-light">
        <SideMenu />
      </div>
      <div className="right w-75">
        <Header />

        <h1 className="py-3">{pageTitle}</h1>
        <hr />
        <main className="main">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
