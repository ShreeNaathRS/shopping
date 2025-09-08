import axios from "axios";

const productAxios = axios.create({
    // baseURL: 'http://localhost:3500/products'
    baseURL: `${process.env.REACT_APP_API_URL}/swift-cart`,
    headers: {
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJTaHJlZSIsInJvbGVzIjpbIkFETUlOIl0sImlzcyI6Imh0dHA6Ly9lYzItMTUtMjA3LTk4LTE3Ny5hcC1zb3V0aC0xLmNvbXB1dGUuYW1hem9uYXdzLmNvbTo5MDAwL3N3aWZ0LWNhcnQvdG9rZW4iLCJleHAiOjE3NTY1ODg5NzJ9.gYBUx5V1dc9HVB2zkRXhb8WqpPOSwUo8v9q4GpgUGDI",
        "Content-Type": "application/json"
    }
})

export default productAxios;