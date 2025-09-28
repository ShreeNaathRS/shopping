import { useCallback } from 'react';
import { useAuthorizedAxios } from './useAuthorizedAxios';
import { ERROR_SERVER, UNAUTHORIZED, UNSUCCESSFUL_AUTHENTICATION } from '../constants';
import { useDispatch } from 'react-redux';
import { alert, reset } from '../store/slices/alertSlice';

export const useAuthAxiosWithProps = (props) => {
    const { setLoader, setResponse, setErrorStatus, setErrorMessage, onSuccess, onError } = { ...props }?? null
    const { authorizedAxios } = useAuthorizedAxios();
    const dispatch = useDispatch()

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
        } finally {
            setLoader?.(false);
            if (errorStatus === 0) {
                setErrorStatus?.(0);
                setErrorMessage?.('')
                errorMessage='';
            } else if (errorStatus === 401) {
                errorMessage=UNAUTHORIZED;
                dispatch(alert({ type: 'warning', message: 'Please login!' }))
            } else if (errorStatus === 403) {
                errorMessage=UNSUCCESSFUL_AUTHENTICATION;
                dispatch(alert({ type: 'warning', message: 'Please login!' }))
            } else {
                errorMessage=ERROR_SERVER;
            }
            if(errorStatus!==0){
                setErrorMessage?.(errorMessage)
                onError?.({
                    error,
                    errorMessage
                })
                setTimeout(()=>dispatch(reset()), 2500)
            }
        }
    }, [authorizedAxios, setLoader, setResponse, setErrorStatus, setErrorMessage, onError, onSuccess, dispatch]);

    return { doAPICall };
};
