import axios from "axios";
const BASE_URL =
  process.env.REACT_APP_API_URL + "/api/v1" || "http://localhost:3005/api/v1";
const axiosProcessor = async ({ method, url, body = {} }) => {
  // const headers = {
  //     Authorization: isPrivate ? (withRefreshToken ? localStorage.getItem("refreshJWT") : localStorage.getItem("accessJWT")) : ""
  // }
  // console.log("Auth", headers)
  try {
    // console.log({
    //     method: method,
    //     url,
    //     data: body,

    // })
    const { data } = await axios({
      method: method,
      url,
      data: body,
    });
    // console.log(data);
    return data;
  } catch (error) {
    // console.log("Error ---->", error)
    // if (error?.response?.data?.message === 'jwt expired') {
    //     console.log("I am epire, dsfads")
    //     // refresh token call
    //     // New token lai sessin ma rakh
    //     const { status, accessJWT } = await apiGetNewAccessToken();
    //     if (status === "success") {
    //         localStorage.setItem("accessJWT", accessJWT)
    //     }
    //     return axiosProcessor({ method, url, body })
    // }
    return {
      status: "error",
      message: error?.response?.data?.message || error.message,
    };
  }
};

// export const apiGetNewAccessToken = () => {
//     // post axios
//     return axiosProcessor({
//         method: "get",
//         url: `${BASE_URL}/admin/get-accessjwt`,
//         withRefreshToken: true,
//         isPrivate: true
//     })
// }

// export const apiRegisterUser = (data) => {
//     // post axios
//     return axiosProcessor({
//         method: "post",
//         body: data,
//         url: `${BASE_URL}/admin/registration`,
//     })
// }

export const loginUser = (data) => {
  // post axios
  // console.log({ data });
  return axiosProcessor({
    method: "post",
    body: data,
    url: `${BASE_URL}/client/login`,
  });
};

// export const apiLogoutUser = () => async dispatch => {
//     const accessJWT = localStorage.getItem("accessJWT")
//     const refreshJWT = localStorage.getItem("refreshJWT")
//     sessionStorage.removeItem("accessJWT")
//     localStorage.removeItem("refreshJWT")
//     // post axios
//     await axiosProcessor({
//         method: "post",
//         body: {
//             "accessJWT": accessJWT,
//             "refreshJWT": refreshJWT
//         },
//         url: `${BASE_URL}/admin/logout`,
//     })
//     dispatch(setUser({}))
// }

// export const apiGetClientUserInfo = (email) => {
//   // console.log("here");
//   // post axios
//   return axiosProcessor({
//     method: "get",
//     body: email,
//     url: `${BASE_URL}/client`,
//     // isPrivate: true,
//   });
// };

// Replace with your actual base URL

export const apiGetClientUserInfo = async (email) => {
  try {
    // console.log(email);
    const response = await axios.get(`http://localhost:3005/api/v1/client`, {
      params: {
        e: email,
        // c: "3c3a9540-3c82-428f-8b66-15e979852801",
      },
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Throw the error to be handled by the caller
  }
};

// export const verifyUser = (data) => {
//     // post axios
//     return axiosProcessor({
//         method: "post",
//         body: data,
//         url: `${BASE_URL}/admin/account-verification`,
//     })

// }

export const apiGetCategories = () => {
  return axiosProcessor({
    method: "get",
    url: `${BASE_URL}/category`,
  });
};

// Product API

// export const apiCreateProduct = (data) => {
//     return axiosProcessor({
//         method: "post",
//         url: `${BASE_URL}/product`,
//         body: data,
//         isPrivate: true
//     })
// }

export const apiGetProducts = () => {
  return axiosProcessor({
    method: "get",
    url: `${BASE_URL}/product`,
  });
};

export const createOrder = (orderObj) => {
  return axiosProcessor({
    method: "post",
    body: orderObj,
    url: `${BASE_URL}/order`,
  });
};

// export const apiUpdateProduct = (id, data) => {
//     return axiosProcessor({
//         method: "put",
//         url: `${BASE_URL}/product/${id}`,
//         body: data,
//         isPrivate: true
//     })
// }
