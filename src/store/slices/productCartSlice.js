import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    user: null,
    products: [],
    createdAt: ''
}

const counterSlice = createSlice({
    name: 'productCartCounter',
    initialState,
    reducers: {
        sync: (state, action)=>{
            return action.payload
        },
        clearCart: state=>{
            return {
                ...state,
                products: []
            }
        }
    }
})

export const { sync, clearCart } = counterSlice.actions
const productCartReducer = counterSlice.reducer
export default productCartReducer