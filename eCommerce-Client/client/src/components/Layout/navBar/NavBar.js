import { useEffect, useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { catList } = useSelector((state) => state.category);

  useEffect(() => {
    // console.log(category);
  }, []);
  const [display, setDisplay] = useState();

  const inputMid = [
    {
      to: "/category",
      title: "category",
      name: "Categories",
    },
    // {
    //   to: "/features",
    //   title: "features",
    //   name: "Features",
    // },
    // {
    //   to: "/about-us",
    //   title: "Aboutus",
    //   name: "About us",
    // },
    // {
    //   to: "/Contact",
    //   title: "contactus",
    //   name: "Contact us",
    // },
  ];

  const inputSign = [
    {
      to: "/signin",

      title: "signin",
      name: "Sign in",
    },
    {
      to: "/signup",
      title: "signup",
      name: "Sign up",
    },
    {
      to: "/cart",
      title:"cart",
      name:"Cart"
    }
  ];

  return (
    <div className='bg-gray-900'>
      <div className='px-6 py-5 mx-auto  sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8'>
        <div className='relative flex items-center justify-around md:justify-between'>
          <div className='flex items-center w-full'>
            {/* this is for large Screen only  */}
            <Link
              to='/'
              aria-label='Company'
              title='Company'
              className='inline-flex items-center mr-8'
            >
              <svg
                className='w-8 text-teal-accent-400'
                viewBox='0 0 24 24'
                strokeLinejoin='round'
                strokeWidth='4'
                strokeLinecap='round'
                strokeMiterlimit='10'
                stroke='currentColor'
                fill='none'
                color='#ffffff'
              >
                <rect
                  x='3'
                  y='1'
                  width='7'
                  height='12'
                />
                <rect
                  x='3'
                  y='17'
                  width='7'
                  height='6'
                />
                <rect
                  x='14'
                  y='1'
                  width='7'
                  height='6'
                />
                <rect
                  x='14'
                  y='11'
                  width='7'
                  height='12'
                />
              </svg>
              <span className='ml-2 text-xl font-bold tracking-wide text-gray-100 uppercase'>
                Ecom Client
              </span>
            </Link>
            <ul className='items-center justify-center w-full gap-6 space-x-4 lg:flex'>
              {inputMid.map((navConfig, id) => (
                <li key={id}>
                  <NavLink
                    {...navConfig}
                    key={id}
                    className='font-medium relative items-center clear-both group hidden lg:flex tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400'
                  >
                    {navConfig.name}
                    {navConfig.title === "category" && (
                      <>
                      <ul className='clearboth absolute top-7 left-3'>
                        {catList.map((item, id) => (
                          <li
                            className='clearboth invisible group-hover:visible font-normal first-letter:uppercase hover:bg-blue-500 hover:px-3 hover:rounded-2xl'
                            key={id}
                          >
                            <Link to={`/category/${item.slug}`}>{item.title}</Link>
                          </li>
                        ))}
                      </ul>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}

              <li>
                <input
                  type='text'
                  name='search'
                  placeholder='Search'
                  className='w-52  md:w-64 lg:w-96 rounded-lg'
                />
              </li>
            </ul>
          </div>
          <ul className='flex items-center  space-x-8 lg:flex'>
            <li>
              <NavLink
                to='/signin'
                className='text-white items-center hidden lg:flex'
              >
                <FiLogIn />
                <span className='ml-2'>Login</span>
              </NavLink>
            </li>
          </ul>
          {/* large screen navbar ends here  */}
          <div className='lg:hidden'>
            <button
              aria-label='Open Menu'
              title='Open Menu'
              className='p-2 -mr-1  transition duration-200 rounded focus:outline-none focus:shadow-outline'
              onClick={() => setIsMenuOpen(true)}
            >
              <svg
                className='w-5 text-white'
                viewBox='0 0 24 24'
              >
                <path
                  fill='currentColor'
                  d='M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z'
                />
                <path
                  fill='currentColor'
                  d='M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z'
                />
                <path
                  fill='currentColor'
                  d='M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z'
                />
              </svg>
            </button>

            {/* this is when menu is open  */}
            {isMenuOpen && (
              <div className='absolute z-10 top-0 left-0 w-full'>
                <div className='p-5 bg-white border rounded shadow-sm'>
                  <div className='flex  items-center justify-between mb-4'>
                    <div>
                      <NavLink
                        href='/'
                        aria-label='Company'
                        title='Company'
                        className='inline-flex items-center'
                      >
                        <svg
                          className='w-8 text-deep-purple-accent-400'
                          viewBox='0 0 24 24'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeMiterlimit='10'
                          stroke='currentColor'
                          fill='none'
                        >
                          <rect
                            x='3'
                            y='1'
                            width='7'
                            height='12'
                          />
                          <rect
                            x='3'
                            y='17'
                            width='7'
                            height='6'
                          />
                          <rect
                            x='14'
                            y='1'
                            width='7'
                            height='6'
                          />
                          <rect
                            x='14'
                            y='11'
                            width='7'
                            height='12'
                          />
                        </svg>
                        <span className='ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase'>
                          Ecom Client
                        </span>
                      </NavLink>
                    </div>
                    <div>
                      <button
                        aria-label='Close Menu'
                        title='Close Menu'
                        className='p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline'
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg
                          className='w-5 text-gray-600'
                          viewBox='0 0 24 24'
                        >
                          <path
                            fill='currentColor'
                            d='M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z'
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <nav>
                    {/* this is for mobile and small devices screen only  */}
                    <ul className='space-y-4'>
                      {inputMid.map((item, id) => (
                        <li key={id}>
                          <NavLink
                            {...item}
                            key={id}
                            className='font-bold tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400'
                          >
                            {item.name}
                            {item.title === "category" && (
                              <ul>
                                {catList.map((item, id) => (
                                  <li
                                    className='m-2 font-normal first-letter:uppercase hover:bg-blue-500'
                                    key={id}
                                  >
                                    <Link to={item.name}>{item.name}</Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </NavLink>
                        </li>
                      ))}

                      {inputSign.map((item, id) => (
                        <li key={id}>
                          <NavLink
                            {...item}
                            key={id}
                            className={
                              item.title === "signin"
                                ? "font-medium tracking-wide mt-2 text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                                : "inline-flex items-center justify-center w-full h-12 p-6 font-medium tracking-wide text-white  transition duration-200 rounded shadow-md bg-black hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                            }
                          >
                            {item.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
