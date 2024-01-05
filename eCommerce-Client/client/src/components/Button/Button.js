import React from "react";

const Button = ({ children }) => {
  return (
    <div>
      <button className='py-3 px-4 bg-white bg-opacity-95 rounded-3xl text-sm font-semibold uppercase tracking-wide mb-5 transition duration-100 ease-out hover:text-white hover:bg-blue-600 dark:bg-gray-900/90 dark:border-gray-800'>
        {children}
      </button>
    </div>
  );
};

export default Button;
