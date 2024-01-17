import axios from "axios";
import { setUser } from "../pages/registration-login/userSlice";
const BASE_URL = process.env.REACT_APP_API_URL + "/api/v1" || "http://localhost:3000/api/v1"
const axiosProcessor = async ({ method, url, body = {}, isPrivate = false, withRefreshToken = false }) => {
    const headers = {
        Authorization: isPrivate ? (withRefreshToken ? localStorage.getItem("refreshJWT") : localStorage.getItem("accessJWT")) : ""
    }
    console.log("Auth", headers)
    try {
        const { data } = await axios({
            method: method,
            url,
            data: body,
            headers
        });
        return data
    } catch (error) {
        console.log("Error ---->", error)
        if (error?.response?.data?.message === 'jwt expired') {
            console.log("I am epire, dsfads")
            // refresh token call
            // New token lai sessin ma rakh 
            const { status, accessJWT } = await apiGetNewAccessToken();
            if (status === "success") {
                localStorage.setItem("accessJWT", accessJWT)
            }
            return axiosProcessor({ method, url, body, isPrivate, withRefreshToken })
        }
        return {
            status: 'error',
            message:error?.response?.data?.message ||  error.message
        }
    }
}

export const apiGetNewAccessToken = () => {
    // post axios
    return axiosProcessor({
        method: "get",
        url: `${BASE_URL}/admin/get-accessjwt`,
        withRefreshToken: true,
        isPrivate: true
    })
}

export const apiRegisterUser = (data) => {
    // post axios
    return axiosProcessor({
        method: "post",
        body: data,
        url: `${BASE_URL}/admin/registration`,
    })
}

export const loginUser = (data) => {
    // post axios
    return axiosProcessor({
        method: "post",
        body: data,
        url: `${BASE_URL}/admin/login`,
    })
}

export const apiLogoutUser = () => async dispatch => {
    const accessJWT = localStorage.getItem("accessJWT")
    const refreshJWT = localStorage.getItem("refreshJWT")
    sessionStorage.removeItem("accessJWT")
    localStorage.removeItem("refreshJWT")
    // post axios
    await axiosProcessor({
        method: "post",
        body: {
            "accessJWT": accessJWT,
            "refreshJWT": refreshJWT
        },
        url: `${BASE_URL}/admin/logout`,
    })
    dispatch(setUser({}))
}


export const apiGetAdminInfo = () => {
    // post axios
    return axiosProcessor({
        method: "get",
        url: `${BASE_URL}/admin`,
        isPrivate: true
    })
}

export const verifyUser = (data) => {
    // post axios
    return axiosProcessor({
        method: "post",
        body: data,
        url: `${BASE_URL}/admin/account-verification`,
    })

}


export const apiGetCategories = () => {
    
    return axiosProcessor({
        method: "get",
        url: `${BASE_URL}/category`,
        isPrivate: true
    })
}

export const apiCreateCategory = (data) => {
    return axiosProcessor({
        method: "post",
        url: `${BASE_URL}/category`,
        body: data,
        isPrivate: true
    })
}


export const apiUpdateCategoryAction = (id, data) => {
    return axiosProcessor({
        method: "put",
        url: `${BASE_URL}/category/${id}`,
        body: data,
        isPrivate: true
    })
}

// Product API

export const apiCreateProduct = (data) => {
    return axiosProcessor({
        method: "post",
        url: `${BASE_URL}/product`,
        body: data,
        isPrivate: true
    })
}

export const apiGetProducts = () => {
    return axiosProcessor({
        method: "get",
        url: `${BASE_URL}/product`,
        isPrivate: true
    })
}

export const apiUpdateProduct = (id, data) => {
    return axiosProcessor({
        method: "put",
        url: `${BASE_URL}/product/${id}`,
        body: data,
        isPrivate: true
    })
}
