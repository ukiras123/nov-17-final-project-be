import React, { useState } from "react";
import DefaultLayout from "../../components/Layout/defaultLayout/DefaultLayout";
import { InputField } from "../../utility/Constant";
import { loginUser } from "../../helper/axios";
import { useDispatch } from "react-redux";
import { loginClientUser } from "./UserAction";
import { useNavigate } from "react-router-dom";
const SignIn = () => {
  const [form, setForm] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    dispatch(loginClientUser(form, navigate));
  };

  return (
    <>
      <DefaultLayout>
        <div className='h-[100dvh] bg-gradient-to-tr from-gre from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% pt-24 px-24 '>
          <div className='w-full mx-auto md:w-3/12'>
            <h1 className='font-extrabold tracking-wide text-[3rem] xs:text-[2.1rem] bg-gradient-to-r from-blue-600 to-black bg-clip-text text-transparent '>
              Ecom Client
            </h1>
            <form onSubmit={handleOnSubmit}>
              {InputField.map((item, id) => {
                return (
                  <>
                    <div className='w-full  flex items-center justify-between gap-6 '>
                      <label
                        htmlFor={item.label}
                        className='mb-2 flex justify-center items-center'
                      >
                        {item.label}
                      </label>
                      <input
                        {...item}
                        key={id}
                        onChange={handleOnChange}
                        className='mb-2 rounded-lg  self-stretch items-end justify-end'
                      />
                    </div>
                  </>
                );
              })}

              <div className=' flex justify-center p-3 '>
                <button
                  type='submit'
                  className='text-center mx-auto border-[3px] p-3 rounded-lg w-28 tracking-wide'
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default SignIn;
