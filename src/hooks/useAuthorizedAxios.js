import { productAxios } from "../service";
import { store } from '../store/store'

export const useAuthorizedAxios = () => {
    
    productAxios.interceptors.request.use(
        request => {
            const token = store.getState().loggedInUser.token;
            if (token) {
                request.headers.Authorization = `Bearer ${token}`;
            }
            return request;
        },
        (error) => Promise.reject(error)
    );
    productAxios.interceptors.response.use(
        response => response,
        (error) => {
            if (error.response && error.response.status === 401) {
                store.dispatch({ type: 'loggedInUser/logout' });
            }
            return Promise.reject(error);
        }
    );

    return { authorizedAxios: productAxios };
};