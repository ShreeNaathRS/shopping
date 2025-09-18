import axios from "axios";

export const productAxios = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/swift-cart`
})

export const localAxios = axios.create({
    baseURL: 'http://localhost:9000/swift-cart',
})

