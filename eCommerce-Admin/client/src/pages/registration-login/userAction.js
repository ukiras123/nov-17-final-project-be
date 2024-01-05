import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../config/firebase-config";
import { setUser } from "./userSlice";


import { apiGetAdminInfo, loginUser, apiRegisterUser } from "../../helper/axios";

export const createNewAdminAuth = async (obj) => {
  try {

    // Refactor to make API CALL
    const respPending = apiRegisterUser(obj)
    console.log(respPending)
    toast.promise(respPending, {
      pending: "Please wait ... ",
    });

    const { status, message } = await respPending;
    toast[status](message);
  } catch (error) {
    console.log("I am error")
    toast.error(error.message);
  }
};


export const createAdminUser = async (userInfo, id) => {
  try {
    //addDoc
    await setDoc(doc(db, "users", id), userInfo);
    toast.success("New admin user has been created. You may login now!");
  } catch (error) {
    toast.error(error.message);
  }
};

export const loginAdminUser =
  (obj) =>
    async (dispatch) => {
      try {
        const respPending = loginUser(obj)
        toast.promise(respPending, {
          pending: "Please wait ... ",
        });

        const { status, message, token } = await respPending;
        toast[status](message);
        if (status === 'success') {
          // We will get token, what to do with it?
          localStorage.setItem("accessJWT", token.accessJWT)
          localStorage.setItem("refreshJWT", token.refreshJWT)

          dispatch(getAdminUserInfo())
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

export const getAdminUserInfo =
  () =>
    async (dispatch) => {
      try {
        const { user } = await apiGetAdminInfo();
        if (user) {
          dispatch(setUser(user))
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

export const getUserProfile = (uid) => async (dispatch) => {
  try {
    //get user from firebase database
    const userSap = await getDoc(doc(db, "users", uid));

    console.log(userSap);
    if (userSap.exists()) {
      dispatch(setUser({ ...userSap.data(), uid }));
    }
  } catch (error) {
    toast.error(error.message);
  }
};
