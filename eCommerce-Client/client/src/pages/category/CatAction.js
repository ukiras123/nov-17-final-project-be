import { toast } from "react-toastify";
import { setCatList } from "./CatSlice";
import { apiGetCategories } from "../../helper/axios";

export const fetchAllCategories = () => async (dispatch) => {
  try {
  
    const {result} = await apiGetCategories();
    dispatch(setCatList(result));
    // console.log(catList);
  } catch (error) {
    toast.error(error.message);
  }
};
