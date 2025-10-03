import axios from "axios";

export const productAxios = axios.create({
    // baseURL: `https://ec2-13-201-97-47.ap-south-1.compute.amazonaws.com:9000/swift-cart`,
    baseURL: import.meta.env.VITE_API_URL
})

export const localAxios = axios.create({
    baseURL: 'http://localhost:9000/swift-cart',
})

