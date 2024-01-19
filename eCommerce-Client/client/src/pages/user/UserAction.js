import { toast } from "react-toastify";
import { apiGetClientUserInfo, loginUser } from "../../helper/axios";
import { setClient } from "./UserSlice";

export const loginClientUser = (form, navigate) => async (dispatch) => {
  try {
    const res = loginUser(form);
    const { email } = form;
    toast.promise(res, {
      pending: "Please Wait ...",
    });
    const { status, message, token } = await res;

    toast[status](message);
    if (status === "success") {
      localStorage.setItem("accessJWT", token.accessJWT);
      localStorage.setItem("refreshJWT", token.refreshJWT);
      console.log("here");
      dispatch(getClientUserInfo(email));
      navigate("/");

      // const data = await apiGetClientUserInfo(email);
      // console.log(result);
    }
    // const result = apiGetClientUserInfo();
    // const { status, message, token } = await result;

    // toast[status](message);
  } catch (error) {
    toast.error("error", error);
  }
};

export const getClientUserInfo = (email) => async (dispatch) => {
  try {
    // console.log(email);
    const { client } = await apiGetClientUserInfo(email);
    console.log("data", client);
    dispatch(setClient(client));
  } catch (error) {
    toast.error(error.message);
    // console.log(error);
  }
};
