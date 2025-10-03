import axios from "axios";

export const productAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})