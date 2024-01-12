import React, { useEffect, useRef, useState } from "react";
import DefaultLayout from "../../components/Layout/defaultLayout/DefaultLayout";
import CartTable from "../cart/CartTable";
import { Button, Label, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { orderProceed } from "./OrderAction";
// import { setOrderList } from "./OrderSlice";
function Order() {
  const [address, setAddress] = useState("");
  const { cart } = useSelector((state) => state.cart);
  const { client } = useSelector((state) => state.client);
  const dispatch = useDispatch();
  const handleOrderSubmission = () => {
    setAddress(inputRef.current.value);
    address.length &&
      dispatch(
        orderProceed({
          clientDetails: client,
          cartInformation: cart,

          shippingAddress: address,
        })
      );
  };
  const autoCompleteRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current
    );
  }, []);
  return (
    <DefaultLayout pageTitle={"Cart"}>
      <CartTable isOrderPage={true} />
      {/* Shipping */}
      <div className='flex w-100 flex-col gap-4'>
        <div className='flex w-90 justify-center items-center gap-4 flex-col'>
          <div>
            <div className='mb-2 block'>
              <Label
                htmlFor='address'
                value='Address'
              />
            </div>
            <TextInput
              id='address'
              type='string'
              width={"100%"}
              placeholder='56 lake cres, '
              required
              shadow
              ref={inputRef}
            />
          </div>
          <div>
            <Button
              type='submit'
              onClick={handleOrderSubmission}
            >
              Place an Order
            </Button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Order;
