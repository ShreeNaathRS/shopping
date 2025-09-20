import { useCallback } from 'react';
import { useAuthorizedAxios } from './useAuthorizedAxios';
import { ERROR_SERVER, UNAUTHORIZED, UNSUCCESSFUL_AUTHENTICATION } from '../constants';

export const useAuthAxiosWithProps = ({ setLoader, setResponse, setErrorStatus, setErrorMessage }) => {
    const { authorizedAxios } = useAuthorizedAxios();

    const doAPICall = useCallback(async (method, url, params) => {
        let errorStatus = 0;
        setLoader?.(true);
        try {
            let resp;
            switch (method) {
                case 'GET':
                    resp = await authorizedAxios.get(url, { params });
                    break;
                case 'POST':
                    resp = await authorizedAxios.post(url, params);
                    break;
                case 'PUT':
                    resp = await authorizedAxios.put(url, params);
                    break;
                case 'DELETE':
                    resp = await authorizedAxios.delete(url);
                    break;
                default:
                    throw new Error(`Unsupported method: ${method}`);
            }

            setResponse?.(resp.data);
        } catch (err) {
            errorStatus = err?.response?.status || 500;
            setErrorStatus?.(errorStatus);
            console.error(err);
        } finally {
            setLoader?.(false);

            if (errorStatus === 0) {
                setErrorStatus?.(0);
                setErrorMessage?.('');
            } else if (errorStatus === 401) {
                setErrorMessage?.(UNAUTHORIZED);
            } else if (errorStatus === 403) {
                setErrorMessage?.(UNSUCCESSFUL_AUTHENTICATION);
            } else {
                setErrorMessage?.(ERROR_SERVER);
            }
        }
    }, [authorizedAxios, setLoader, setResponse, setErrorStatus, setErrorMessage]);

    return { doAPICall };
};
