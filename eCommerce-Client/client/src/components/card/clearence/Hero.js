import React from "react";
import Button from "../../Button/Button";

const Hero = () => {
  return (
    <div className='bg-gradient-to-r from-grey from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% pt-24 px-24'>
      <div className='button flex flex-col flex-wrap  justify-center items-center '>
        <Button>Final Clearence </Button>
        <p className='text-bold font-extrabold text-3xl'>
          OMG IT'S UP TO 70% OFF!!
        </p>
        <p className='italic'>Shop Like You Mean It. </p>
        <p className='font-extralight text-sm '>
          Limited time only. Selected styles marked down as shown.
        </p>
      </div>

      {/* <div className='flex  mx-auto '>
        <div className='w-full mx-auto flex justify-evenly flex-wrap gap-2 '>
          {productList.map((item, id) => (
            <div
              key={id}
              className=' bg-slate-600 w-56 h-72 rounded-tr-xl overflow-hidden mb-4'
            >
              <div className='w-full'>
                <img
                  className='w-full h-36'
                  src={item.thumbnail}
                  alt='Images'
                />
              </div>
              <h2 className='mx-3 text-slate-200 font-semibold uppercase  text-lg '>
                {item.title}
              </h2>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div> */}

      {/* <Carousel1>
          {productList.map((item) => (
            <div className='columns-2'>
              <img
                src={item.thumbnail}
                alt='img'
                srcset=''
              />
            </div>
          ))}
        </Carousel1> */}

      {/* <div className='container mx-auto'>
        <Carousel>
          {productList.map((item) => (
            <img
              src={item.thumbnail}
              alt='img'
              srcset=''
            />
          ))}
        </Carousel>
      </div> */}
    </div>
  );
};

export default Hero;
