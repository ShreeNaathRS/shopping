import { useSelector } from "react-redux";
import { productAxios } from "../service";

export const useAuthorizedAxios = () => {
    const { token } = useSelector((state) => state.loggedInUser);
    productAxios.interceptors.request.handlers = [];
    productAxios.interceptors.request.use(
        (config) => {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    return { authorizedAxios: productAxios };
};