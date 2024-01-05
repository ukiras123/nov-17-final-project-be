import React from "react";

const CardBtn = ({ children }) => {
  return (
    <div className='border px-3 py-1 text-xs rounded-lg mr-1 bg-slate-50 transition-all ease-out duration-75 hover:bg-blue-500 hover:text-white'>
      {children}
    </div>
  );
};

export default CardBtn;
