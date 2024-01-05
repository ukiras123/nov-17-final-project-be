import React from "react";

const CategoryCard = () => {
  return (
    <>
      {/* Product List Section: Categories Grid */}
      <div className='bg-white dark:text-gray-100 dark:bg-gray-900'>
        <div className='container xl:max-w-7xl mx-auto px-4 py-16 lg:px-8 lg:py-32'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            <a
              href='javascript(void)'
              className='sm:col-span-2 md:col-span-1 block group relative transition ease-out active:opacity-75 overflow-hidden'
            >
              <img
                src='https://cdn.tailkit.com/media/placeholders/photo-PDX_a_82obo-700x700.jpg'
                alt='Product img'
                className='transform transition ease-out group-hover:scale-110'
              />
              <div className='absolute inset-0 bg-black bg-opacity-25 transition ease-out group-hover:bg-opacity-0' />
              <div className='p-4 flex items-center justify-center absolute inset-0'>
                <div className='py-3 px-4 bg-white bg-opacity-95 rounded-3xl text-sm font-semibold uppercase tracking-wide transition ease-out group-hover:text-white group-hover:bg-blue-600 dark:bg-gray-900/90 dark:border-gray-800'>
                  Electronics
                </div>
              </div>
            </a>
            <a
              href='javascript(void)'
              className='block group relative transition ease-out active:opacity-75 overflow-hidden'
            >
              <img
                src='https://cdn.tailkit.com/media/placeholders/photo-1SAnrIxw5OY-700x700.jpg'
                alt='Product img'
                className='transform transition ease-out group-hover:scale-110'
              />
              <div className='absolute inset-0 bg-black bg-opacity-25 transition ease-out group-hover:bg-opacity-0' />
              <div className='p-4 flex items-center justify-center absolute inset-0'>
                <div className='py-3 px-4 bg-white bg-opacity-95 rounded-3xl text-sm font-semibold uppercase tracking-wide transition ease-out group-hover:text-white group-hover:bg-blue-600 dark:bg-gray-900/90 dark:border-gray-800'>
                  Computers
                </div>
              </div>
            </a>
            <a
              href='javascript(void)'
              className='block group relative transition ease-out active:opacity-75 overflow-hidden'
            >
              <img
                src='https://cdn.tailkit.com/media/placeholders/photo-gUPiTDBdRe4-700x700.jpg'
                alt='Product img'
                className='transform transition ease-out group-hover:scale-110'
              />
              <div className='absolute inset-0 bg-black bg-opacity-25 transition ease-out group-hover:bg-opacity-0' />
              <div className='p-4 flex items-center justify-center absolute inset-0'>
                <div className='py-3 px-4 bg-white bg-opacity-95 rounded-3xl text-sm font-semibold uppercase tracking-wide transition ease-out group-hover:text-white group-hover:bg-blue-600 dark:bg-gray-900/90 dark:border-gray-800'>
                  Clothes
                </div>
              </div>
            </a>
            <a
              href='javascript(void)'
              className='sm:col-span-2 md:col-span-1 block group relative transition ease-out active:opacity-75 overflow-hidden'
            >
              <img
                src='https://cdn.tailkit.com/media/placeholders/photo-ALpEkP29Eys-700x700.jpg'
                alt='Product img'
                className='transform transition ease-out group-hover:scale-110'
              />
              <div className='absolute inset-0 bg-black bg-opacity-25 transition ease-out group-hover:bg-opacity-0' />
              <div className='p-4 flex items-center justify-center absolute inset-0'>
                <div className='py-3 px-4 bg-white bg-opacity-95 rounded-3xl text-sm font-semibold uppercase tracking-wide transition ease-out group-hover:text-white group-hover:bg-blue-600 dark:bg-gray-900/90 dark:border-gray-800'>
                  Smart Home
                </div>
              </div>
            </a>
            <a
              href='javascript(void)'
              className='block group relative transition ease-out active:opacity-75 overflow-hidden'
            >
              <img
                src='https://cdn.tailkit.com/media/placeholders/photo-164_6wVEHfI-700x700.jpg'
                alt='Product img'
                className='transform transition ease-out group-hover:scale-110'
              />
              <div className='absolute inset-0 bg-black bg-opacity-25 transition ease-out group-hover:bg-opacity-0' />
              <div className='p-4 flex items-center justify-center absolute inset-0'>
                <div className='py-3 px-4 bg-white bg-opacity-95 rounded-3xl text-sm font-semibold uppercase tracking-wide transition ease-out group-hover:text-white group-hover:bg-blue-600 dark:bg-gray-900/90 dark:border-gray-800'>
                  Shoes
                </div>
              </div>
            </a>
            <a
              href='javascript(void)'
              className='block group relative transition ease-out active:opacity-75 overflow-hidden'
            >
              <img
                src='https://cdn.tailkit.com/media/placeholders/photo-wW7XbWYoqK8-700x700.jpg'
                alt='Product img'
                className='transform transition ease-out group-hover:scale-110'
              />
              <div className='absolute inset-0 bg-black bg-opacity-25 transition ease-out group-hover:bg-opacity-0' />
              <div className='p-4 flex items-center justify-center absolute inset-0'>
                <div className='py-3 px-4 bg-white bg-opacity-95 rounded-3xl text-sm font-semibold uppercase tracking-wide transition ease-out group-hover:text-white group-hover:bg-blue-600 dark:bg-gray-900/90 dark:border-gray-800'>
                  Wearables
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      {/* END Product List Section: Categories Grid */}
    </>
  );
};

export default CategoryCard;
