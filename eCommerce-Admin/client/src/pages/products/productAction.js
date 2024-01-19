import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { TBL_CATEGOR } from "../../utils/constant";
import { db } from "../../config/firebase-config";
import { setModalShow } from "../../system-state/systemSlice";
import { apiCreateCategory, apiCreateProduct, apiGetCategories, apiGetProducts, apiUpdateCategoryAction, apiUpdateProduct } from "../../helper/axios";
import { setProductList } from "./productSlice";

export const addProductAction =
  (id, data) =>
    async (dispatch) => {
      try {
        const { result, status, message } = await apiCreateProduct(id, data);
        toast[status](message)
        dispatch(fetchAllProductAction());
        dispatch(setModalShow(false));
      } catch (error) {
        toast.error(error.message);
      }
    };


export const fetchAllProductAction = () => async (dispatch) => {
  try {
    const { result, status, message } = await apiGetProducts();
    toast[status](message);
    if (status === 'success') {
      dispatch(setProductList(result))
    }
  } catch (error) {
    toast.error(error.message);
  }
};

export const updateProductAction =
  (id,data) =>
    async (dispatch) => {
      try {
        const { result, status, message } = await apiUpdateProduct(id,data);
        toast[status](message)
        dispatch(fetchAllProductAction());
        dispatch(setModalShow(false));
      } catch (error) {
        toast.error(error.message);
      }
    };



export const deleteCat = (slug) => (dispatch) => {
  try {
    const pending = deleteDoc(doc(db, TBL_CATEGOR, slug));

    toast.promise(pending, {
      pending: "Please wait while deleting..",
      success: "Category has been deleted",
      error:
        "Unable to delete the category, please try again later or contact admin",
    });

    dispatch(setModalShow(false));
    // dispatch(fetchAllCategoryAction());
  } catch (error) {
    toast.error(error.message);
  }
};
