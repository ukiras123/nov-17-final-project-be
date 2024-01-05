import React from "react";
import { NavBar } from "../navBar/NavBar";

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      {/* <SideBarWithNav></SideBarWithNav> */}
      <main className='main '>{children}</main>
    </div>
  );
};

export default DefaultLayout;
