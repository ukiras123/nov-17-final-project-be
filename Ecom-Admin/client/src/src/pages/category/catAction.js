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

export const addCategoryAction =
  ({ slug, ...rest }) =>
  async (dispatch) => {
    try {
      const pending = setDoc(doc(db, TBL_CATEGOR, slug), rest, { merge: true });
      toast.promise(pending, {
        pending: "please wait",
        success: "Category database has been upadated",
        error: "Unable to process your request, Pelase try again later",
      });
      dispatch(fetchAllCategoryAction());
      dispatch(setModalShow(false));
    } catch (error) {
      toast.error(error.message);
    }
  };

export const fetchAllCategoryAction = () => async (dispatch) => {
  try {
    //read all data from the TBL_CATEGORY
    const q = query(collection(db, TBL_CATEGOR));
    const catSanp = await getDocs(q);

    const catList = [];

    catSanp.forEach((doc) => {
      const slug = doc.id;
      const data = doc.data();

      catList.push({ ...data, slug });
    });
    dispatch(setCatList(catList));
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
