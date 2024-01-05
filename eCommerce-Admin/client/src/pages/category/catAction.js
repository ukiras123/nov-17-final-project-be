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
import { setCatList } from "./catSlice";
import { setModalShow } from "../../system-state/systemSlice";
import { apiCreateCategory, apiGetCategories, apiUpdateCategoryAction } from "../../helper/axios";

export const addCategoryAction =
  (id, data) =>
    async (dispatch) => {
      try {
        const { result, status, message } = await apiCreateCategory(id, data);

        dispatch(fetchAllCategoryAction());
        dispatch(setModalShow(false));
      } catch (error) {
        toast.error(error.message);
      }
    };

export const updateCategoryAction =
  (id,data) =>
    async (dispatch) => {
      try {
        const { result, status, message } = await apiUpdateCategoryAction(id,data);

        dispatch(fetchAllCategoryAction());
        dispatch(setModalShow(false));
      } catch (error) {
        toast.error(error.message);
      }
    };


export const fetchAllCategoryAction = () => async (dispatch) => {
  try {
    const { result, status, message } = await apiGetCategories();
    toast[status](message);
    if (status === 'success') {
      dispatch(setCatList(result))
    }
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
    dispatch(fetchAllCategoryAction());
  } catch (error) {
    toast.error(error.message);
  }
};
