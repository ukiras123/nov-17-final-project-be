
import { setProductList } from "./ProductSlice";
import { toast } from "react-toastify";
import { apiGetProducts } from "../../helper/axios";

export const fetchAllProduct = () => async (dispatch) => {
  try {
    //read all data from TBL_CATEGORY
   const {result} = await apiGetProducts();
    dispatch(setProductList(result));
    // console.log(productList);
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
};
