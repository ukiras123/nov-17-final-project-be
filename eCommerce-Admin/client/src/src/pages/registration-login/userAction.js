import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "../../config/firebase-config";
import { setUser } from "./userSlice";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const createNewAdminAuth = async (obj) => {
  try {
    //crate user auth in frirebase
    const respPending = createUserWithEmailAndPassword(
      auth,
      obj.email,
      obj.password
    );

    toast.promise(respPending, {
      pending: "Please wait ... ",
    });

    const { user } = await respPending;

    if (user?.uid) {
      //store user info in firstore
      createAdminUser(obj, user.uid);
    }
  } catch (error) {
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
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const authSnapPromise = signInWithEmailAndPassword(auth, email, password);

      toast.promise(authSnapPromise, {
        pending: "Please wait...",
      });

      const { user } = await authSnapPromise;

      if (user?.uid) {
        // get user data from the database and add to the redux
        dispatch(getUserProfile(user?.uid));
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
