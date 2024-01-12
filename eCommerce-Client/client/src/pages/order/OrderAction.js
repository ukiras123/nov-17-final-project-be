import { toast } from "react-toastify";
import { createOrder } from "../../helper/axios";

export const orderProceed = (orderObj) => async (dispatch) => {
  try {
    const res = await createOrder(orderObj);

    toast.success("Done");
    console.log(res);
  } catch (error) {
    console.log("error", error);
    toast.error(error.message);
  }
};
