import { useCallback } from 'react';
import { useAuthorizedAxios } from './useAuthorizedAxios';
import { ERROR_SERVER, UNAUTHORIZED, UNSUCCESSFUL_AUTHENTICATION } from '../constants';

export const useAuthAxiosWithProps = (props) => {
    const { setLoader, setResponse, setErrorStatus, setErrorMessage, onSuccess, onError } = { ...props }?? null
    const { authorizedAxios } = useAuthorizedAxios();

    const doAPICall = useCallback(async (method, url, params) => {
        let errorStatus = 0;
        let errorMessage = '';
        let error;
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
            onSuccess?.(resp.data)
            return resp.data
        } catch (err) {
            errorStatus = err?.response?.status || 500;
            error=err
            setErrorStatus?.(errorStatus);
            console.error(err);
            throw err
        } finally {
            setLoader?.(false);
            if (errorStatus === 0) {
                setErrorStatus?.(0);
                setErrorMessage?.('')
                errorMessage='';
            } else if (errorStatus === 401) {
                errorMessage=UNAUTHORIZED;
            } else if (errorStatus === 403) {
                errorMessage=UNSUCCESSFUL_AUTHENTICATION;
            } else {
                errorMessage=ERROR_SERVER;
            }
            if(errorStatus!==0){
                setErrorMessage?.(errorMessage)
                onError?.({
                    error,
                    errorMessage
                })
            }
        }
    }, [authorizedAxios, setLoader, setResponse, setErrorStatus, setErrorMessage, onError, onSuccess]);

    return { doAPICall };
};
