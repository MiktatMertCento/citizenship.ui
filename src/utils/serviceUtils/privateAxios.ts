import axios, {AxiosError} from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import publicAxios from "./publicAxios.ts";

const privateAxios = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
});

privateAxios.interceptors.request.use(
    async config => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

const refreshAuthLogic = async (failedRequest: AxiosError) => {
    const refreshToken = localStorage.getItem('refreshToken');

    return publicAxios.post("/AuthUser/CreateTokenByRefreshToken", {refreshToken})
        .then(async tokenRefreshResponse => {
            if (failedRequest.response === undefined)  return Promise.reject();
            failedRequest.response.config.headers.Authorization = 'Bearer ' + tokenRefreshResponse.data.data.accessToken;
            if (tokenRefreshResponse.status === 200) {
                localStorage.setItem('accessToken', tokenRefreshResponse.data.data.accessToken);
                localStorage.setItem('refreshToken', tokenRefreshResponse.data.data.refreshToken);
                return Promise.resolve();
            } else {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                console.log("yenileme olmadı");
                return Promise.reject();
            }
        }).catch(() => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            console.log("yenileme olmadı");
            return Promise.reject();
        });
};

// Instantiate the interceptor
createAuthRefreshInterceptor(privateAxios, refreshAuthLogic, {statusCodes: [498]});

export default privateAxios;
