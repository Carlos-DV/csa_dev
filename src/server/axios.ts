import axios from "axios";

// Axios defaults
const baseURL = process.env.URL_APIDEV;
const baseLogin = process.env.URL_API;

export const clientAxios = axios.create({
    baseURL,
    timeout: 90000,
    headers: {
        "Access-Control-Allow-Origin": "*"
    },
    withCredentials: true
});

export const loginAxiosInstance = axios.create({
    baseURL: baseLogin,
    timeout: 60000,
    headers: {
        "Access-Control-Allow-Origin": "*"
    },
    withCredentials: true
});

clientAxios.interceptors.request.use(function (config:any) {
    config.headers = { ...config.headers, Authorization: `Bearer ${localStorage.getItem("ANC_SECURE_UUID")}` 
};
    return config;
}, function (error) {
    return Promise.reject(error);
});


// for multiple requests
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
}

clientAxios.interceptors.response.use(function (response) {
    return response;
}, function (error) {

    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {

        if (isRefreshing) {
            return new Promise(function (resolve, reject) {
                failedQueue.push({ resolve, reject })
            }).then(token => {
                originalRequest.headers['Authorization'] = 'Bearer ' + token;
                return clientAxios(originalRequest);
            }).catch(err => {
                return Promise.reject(err);
            })
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const companyId = localStorage.getItem("compañia");
        let refreshTokenHeader = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("ANC_SECURE_UUID")}`,
                compania: companyId ? companyId : "company",
            }
        }
        return new Promise(async function (resolve, reject) {
            await loginAxiosInstance.post('/v2/cuenta/actualizar-token', { token: localStorage.getItem('ANC_RF')}, refreshTokenHeader)
                .then(({ data }) => {
                    const content = data.data;
                    // localStorage.setItem('ANC_SESSION_ID', content.id);
                    localStorage.setItem('ANC_SECURE_UUID', content.userToken);
                    localStorage.setItem("ANC_RF", data.refreshToken);
                    localStorage.setItem('ANC_AUTH_EX_AT', content.refreshTokenExpiration);

                    loginAxiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + content.userToken;
                    originalRequest.headers['Authorization'] = 'Bearer ' + content.userToken;
                    processQueue(null, content.userToken);
                    resolve(loginAxiosInstance(originalRequest));
                })
                .catch((err) => {
                    if (err.response) {
                        localStorage.removeItem("ANC_SECURE_UUID");
                        localStorage.removeItem("ANC_RF");
                        localStorage.removeItem("ANC_AUTH_EX_AT");
                        processQueue(new Error(err.response.data.Message), null);
                        reject(err);
                    }
                    else { processQueue(err, null); reject(err); }

                })
                .finally(() => { isRefreshing = false })
        })
    }

    return Promise.reject(error);
});

