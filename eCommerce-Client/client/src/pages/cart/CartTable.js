import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "flowbite-react";
import { getFileURL } from "../../utility";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import {
  decreaseProductQty,
  increaseProductQty,
  removeProductFromCart,
} from "./cartSlice";
import Button from "../../components/Button/Button";
const CartTable = () => {
  const { cart } = useSelector((state) => state.cart);
  //sorting cart items on alphabetic order using title

  const sortedCart = [...cart].sort((a, b) =>
    a.title.toLowerCase().localeCompare(b.title.toLowerCase())
  );
  console.log(sortedCart);
  const dispatch = useDispatch();
  const handleOnIncrease = (_id) => {
    dispatch(increaseProductQty({ _id }));
  };
  const handleOnDecrease = (_id) => {
    // const filterQty = cart.map((item) => {
    //   if (item._id === _id) {
    //     return item.cartQty - 1;
    //   }
    // });
    const { cartQty } = cart.find((item) => item._id === _id);
    // console.log(filterQty);
    // console.log(Object ? filterQty.cartQty : undefined);
    if (cartQty - 1 === 0) {
      dispatch(removeProductFromCart({ _id }));
    }
    dispatch(decreaseProductQty({ _id }));
  };
  const handleOnDelete = (_id) => {
    dispatch(removeProductFromCart({ _id }));
  };
  return (
    <div className='overflow-x-auto'>
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Product name</Table.HeadCell>
          <Table.HeadCell>Image</Table.HeadCell>
          <Table.HeadCell>Quantity</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>
            {/* <span className="sr-only">Delete</span> */} Action
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className='divide-y'>
          {sortedCart.map((item) => {
            return (
              <Table.Row
                key={item._id}
                className='bg-white dark:border-gray-700 dark:bg-gray-800'
              >
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  {item.title}
                </Table.Cell>
                <Table.Cell>
                  <img
                    width='100px'
                    src={getFileURL(item.thumbnail)}
                    alt='product name'
                  />
                </Table.Cell>
                <Table.Cell className='flex'>
                  {" "}
                  <FiChevronLeft onClick={() => handleOnDecrease(item._id)} />
                  {item.cartQty}
                  <FiChevronRight
                    onClick={() => handleOnIncrease(item._id)}
                  />{" "}
                </Table.Cell>
                <Table.Cell>${item.cartQty * item.salesPrice}</Table.Cell>
                <Table.Cell>
                  <Button onClick={() => handleOnDelete(item._id)}>
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default CartTable;
