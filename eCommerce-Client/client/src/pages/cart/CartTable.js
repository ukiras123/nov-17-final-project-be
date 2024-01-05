import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "flowbite-react";
import { getFileURL } from "../../utility";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { decreaseProductQty, increaseProductQty } from "./cartSlice";
const CartTable = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const handleOnIncrease = (_id) => {
    dispatch(increaseProductQty({ _id }));
  };
  const handleOnDecrease = (_id) => {
    dispatch(decreaseProductQty({ _id }));
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
          {cart.map((item) => {
            return (
              <Table.Row
                key={item._id}
                className='bg-white dark:border-gray-700 dark:bg-gray-800'
              >
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  {item.title}
                </Table.Cell>
                <Table.Cell>
                  {" "}
                  <img
                    width='100px'
                    src={getFileURL(item.thumbnail)}
                    alt='product name'
                  />
                </Table.Cell>
                <Table.Cell className='flex'>
                  {" "}
                  <FiChevronLeft onClick={() => handleOnDecrease(item._id)} />
                  {item.qty}
                  <FiChevronRight
                    onClick={() => handleOnIncrease(item._id)}
                  />{" "}
                </Table.Cell>
                <Table.Cell>${item.qty * item.salesPrice}</Table.Cell>
                <Table.Cell>
                  <a
                    href='#'
                    className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'
                  >
                    Delete
                  </a>
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
