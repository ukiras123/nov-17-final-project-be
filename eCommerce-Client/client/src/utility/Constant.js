import { useDispatch } from "react-redux";
import { removeProductFromCart } from "../pages/cart/cartSlice";

export const TBL_CATEGOR = "category";
export const TBL_PRODUCT = "product";

export const InputField = [
  {
    name: "user",
    type: "email",
    label: "Email",
    require,
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    require,
  },
];

export const isCheckQty = (cartQty) => {
  alert("we run out of Stock! Check later, thank you! ");
  return cartQty;
};

// export const removeProduct = (id) => {
//   const dispatch = useDispatch();

//   dispatch(removeProductFromCart(id));
// };
