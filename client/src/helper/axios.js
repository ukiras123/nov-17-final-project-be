import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api/v1"
const axiosProcessor = async ({ method, url, body = {}, isPrivate = false, withRefreshToken = false }) => {
    const headers = {
        Authorization: isPrivate ? (withRefreshToken ? localStorage.getItem("refreshJWT") : sessionStorage.getItem("accessJWT")) : ""
    }
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
                sessionStorage.setItem("accessJWT", accessJWT)
            }
            return axiosProcessor({ method, url, body, isPrivate, withRefreshToken })
        }
        return {
            status: 'error',
            message: error.message
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