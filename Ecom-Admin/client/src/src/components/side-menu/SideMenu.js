import React from "react";
import { Link } from "react-router-dom";

export const SideMenu = () => {
  const links = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Category",
      path: "/categories",
    },
    {
      label: "Product",
      path: "/products",
    },
    {
      label: "Payment Option",
      path: "/payment-options",
    },
    {
      label: "Orders",
      path: "/orders",
    },
    {
      label: "Buyers",
      path: "/buyers",
    },
    {
      label: "Reviews",
      path: "/reviews",
    },
  ];
  return (
    <nav className="">
      <div className="top mt-4 text-center">Admin Account</div>
      <hr />
      <div className="sideMenu d-flex justify-content-center ">
        <ul className="list-unstyled">
          {links.map(({ label, path }) => (
            <li key={label} className="py-3">
              <Link to={path} className="nav-link fs-5">
                {label}
              </Link>
            </li>
          ))}

          <hr />
          <li className="py-3">
            <Link to="/admin" className="nav-link fs-5">
              Admins
            </Link>
          </li>
          <li className="py-3">
            <Link to="/profile" className="nav-link fs-5">
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
