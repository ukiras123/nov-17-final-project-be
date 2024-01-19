import React from "react";

const Login = () => {
  return (
    <div>
      <div className=' bg-red-500 '>
        <div className='w-80 bg-slate-700 mx-auto h-28'>
          <label
            htmlFor='user'
            className='text-cyan-300 font-extrabold'
          >
            user name
          </label>
          <input
            type='text'
            id='user'
            className='rounded-2xl'
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
 