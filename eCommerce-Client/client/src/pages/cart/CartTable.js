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
import { Link, useNavigate } from "react-router-dom";
const CartTable = ({ isOrderPage }) => {
  const { cart } = useSelector((state) => state.cart);
  const { client } = useSelector((state) => state.client);
  //sorting cart items on alphabetic order using title
  const sortedCart = [...cart].sort((a, b) =>
    a.title.toLowerCase().localeCompare(b.title.toLowerCase())
  );
  // console.log(sortedCart);
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

  const navigate = useNavigate();
  const handleOnProceed = () => {
    console.log("cart", JSON.stringify(cart));
    console.log("user", JSON.stringify(client));
    navigate("/order");
  };
  return (
    <>
      <div className='block lg:hidden'>
        {/* Small Screen Layout */}
        {sortedCart.map((item) => (
          <div
            key={item._id}
            className='border p-4 mb-4 rounded-lg'
          >
            <div className='grid grid-cols-2 gap-4'>
              {/* Product Name */}
              <div>
                <strong>Product Name:</strong>
              </div>
              <div>{item.title}</div>

              {/* Image */}
              <div>
                <strong>Image:</strong>
              </div>
              <div>
                <img
                  className='w-20 h-20 object-cover'
                  src={getFileURL(item.thumbnail)}
                  alt={item.title}
                />
              </div>

              {/* Quantity */}
              <div>
                <strong>Quantity:</strong>
              </div>
              <div className='flex items-center'>
                {!isOrderPage && (
                  <FiChevronLeft onClick={() => handleOnDecrease(item._id)} />
                )}
                {item.cartQty}
                {!isOrderPage && (
                  <FiChevronRight onClick={() => handleOnIncrease(item._id)} />
                )}
              </div>

              {/* Price */}
              <div>
                <strong>Price:</strong>
              </div>
              <div>${item.cartQty * item.salesPrice}</div>

              {/* Action */}
              {!isOrderPage && (
                <div>
                  <strong>Action:</strong>
                </div>
              )}
              <div>
                <Button onClick={() => handleOnDelete(item._id)}>Delete</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='hidden lg:block'>
        {/* Large Screen Layout */}
        <div className='overflow-x-auto'>
          <Table striped>
            {/* ... Your existing Table Head and Body for large screens ... */}

            <div className='overflow-x-auto '>
              <Table striped>
                <Table.Head>
                  <Table.HeadCell>Product name</Table.HeadCell>
                  <Table.HeadCell>Image</Table.HeadCell>
                  <Table.HeadCell>Quantity</Table.HeadCell>
                  <Table.HeadCell>Price</Table.HeadCell>
                  {!isOrderPage && (
                    <Table.HeadCell>
                      {/* <span className="sr-only">Delete</span> */} Action3
                    </Table.HeadCell>
                  )}
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
                        <Table.Cell style={{ width: "6rem" }}>
                          <div className='flex justify-between text-center '>
                            {!isOrderPage && (
                              <FiChevronLeft
                                onClick={() => handleOnDecrease(item._id)}
                              />
                            )}
                            {item.cartQty}

                            {!isOrderPage && (
                              <FiChevronRight
                                onClick={() => handleOnIncrease(item._id)}
                              />
                            )}
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          ${item.cartQty * item.salesPrice}
                        </Table.Cell>
                        {!isOrderPage && (
                          <Table.Cell>
                            <Button onClick={() => handleOnDelete(item._id)}>
                              Delete
                            </Button>
                          </Table.Cell>
                        )}
                      </Table.Row>
                    );
                  })}

                  {/* Total Price Section */}
                  <Table.Row className=' bg-blue-700 dark:border-gray-700 dark:bg-gray-800'>
                    {/* <Table.Cell
              colSpan={3}
              className='font-medium text-right'
            >
              Total Price:
            </Table.Cell>
            <Table.Cell colSpan={3}>
              $
              {cart.reduce(
                (acc, item) => (acc += item.salesPrice * item.cartQty),
                0
              )}
            </Table.Cell> */}

                    <Table.Cell
                      colSpan={3}
                      className='font-medium text-right'
                    >
                      Total Price
                    </Table.Cell>
                    <Table.Cell
                      colSpan={2}
                      className='text-lg font-extrabold'
                    >
                      $
                      {cart.reduce(
                        (acc, item) => (acc += item.salesPrice * item.cartQty),
                        0
                      )}
                    </Table.Cell>
                    {/* <Table.Cell></Table.Cell>  */}
                  </Table.Row>

                  {!isOrderPage && (
                    <Table.Row>
                      <Table.Cell
                        colSpan={4}
                        className='text-right'
                      >
                        {client._id ? (
                          <Button onClick={handleOnProceed}>
                            {" "}
                            Proceed To Checkout
                          </Button>
                        ) : (
                          <Button>
                            <Link to='/login'>Login To Checkout</Link>
                          </Button>
                        )}
                      </Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table>
            </div>
          </Table>
        </div>
      </div>
    </>
  );
};

export default CartTable;
