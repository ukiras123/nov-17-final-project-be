import React from "react";
import CardBtn from "../../Button/CardBtn";
import { getFileURL } from "../../../utility";
import { addProductToCart } from "../../../pages/cart/cartSlice";
import { useDispatch } from "react-redux";

const ProductCard = ({
  thumbnail,
  title,
  description,
  salesPrice,
  price,
  _id,
  qty,
}) => {
  //Product add to cart
  //data need to send product id and quantity
  const dispatch = useDispatch();
  const handleOnClick = () => {
    dispatch(
      addProductToCart({ thumbnail, title, cartQty: 1, qty, _id, salesPrice })
    );
  };
  return (
    <div>
      <div className='card bg-slate-50 w-[280px] h-[350px] m-1 rounded-lg  shadow-2xl'>
        <div className='top'>
          <img
            className='w-[280px] object-fit rounded-t'
            src={getFileURL(thumbnail)}
            alt='img'
          />
        </div>
        <div className='bottom flex flex-col justify-center items-start p-3 bg-'>
          <div className='title font-semibold text-base uppercase my-1'>
            {title}
          </div>
          <div className='category text-xs font-light my-1'>{description}</div>

          <div className='pricing flex items-center'>
            <div className='price '>${salesPrice}</div>
            <div className='ml-2 text-xs '>
              $<del>{price}</del>
            </div>
          </div>
          <div className='flex items-center my-2'>
            <CardBtn onClick={handleOnClick}>Add to Cart</CardBtn>
          </div>
        </div>
      </div>

      {/* {productList.map((item, id) => (
        <div className='products card flex flex-row bg-slate-50 w-full'>
          <div className='card-title'>
            <span className=' font-medium'>{item.title}</span>
          </div>
          <div className='card-side'>
            <div className='w-72'>
              <img
                src={item.thumbnail}
                alt='images '
                srcset=''
                className='w-full '
              />
            </div>

            <p className='font-black'> {item.description}</p>
          </div>
        </div>
      ))} */}
    </div>
  );
};

export default ProductCard;
