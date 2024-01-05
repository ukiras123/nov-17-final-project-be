import { useEffect, useRef } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../card/productCard/ProductCard";
import { fetchAllProduct } from "../../../pages/product/ProductAction";

function Carousel({ title }) {
  const { productList } = useSelector((state) => state.product);
  const content = useRef();

  const dispatch = useDispatch();
  useEffect(() => {
    !productList.length && dispatch(fetchAllProduct());
    // console.log(content.cu rrent.scrollWidth);
  }, [productList, dispatch]);
  // console.log(display);
  const scrollLeft = () => {
    if (content.current) {
      content.current.scrollLeft -= 300;
    }
  };

  const scrollRight = () => {
    if (content.current) {
      content.current.scrollLeft += 300;
    }
  };

  return (
    <div className='relative w-full bg-gradient-to-r from-gre from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%'>
      <div className='text-center py-4  text-xl font-bold'>{title}</div>
      <div className='absolute right-0 top-5 '>
        <button
          onClick={scrollLeft}
          className='p-2 m-2 rounded-full bg-white'
        >
          <FiChevronLeft />
        </button>
        <button
          onClick={scrollRight}
          className='p-2 m-2 rounded-full bg-white'
        >
          <FiChevronRight />
        </button>
      </div>
      <div
        id='content'
        ref={content}
        className='carousel p-6  flex flex-nowrap items-center justify-start overflow-x-auto scroll-smooth  scrollbar-hide'
      >
        <div className='inline-flex items-start mx-auto mg:items-center md: justify-center lg:justify-center lg:items-center '>
          {productList.map(
            (item, _id) =>
              item.status === "active" && (
                <ProductCard
                  {...item}
                  key={_id}
                />
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default Carousel;
