import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const counterSlice = createSlice({
    name: 'productCartCounter',
    initialState,
    reducers: {
        add: (state, action) => {
            const { id, category, subCategory } = action.payload;
            const index = state.findIndex(
                item => item.id === id && item.category === category && item.subCategory === subCategory
            );

            if (index === -1) {
                const newState = [...state, { ...action.payload, qty: 1 }];
                return newState;
            } else {
                const updatedState = state.map((product, i) =>
                    i === index ? { ...product, qty: product.qty + 1 } : product
                );
                return updatedState;
            }
        },
        remove: (state, action)=>{
            const {id, category, subCategory} = action.payload
            let newState = [...state]
            const removeIndex = newState.findIndex(s=>s.id === id && s.category === category && s.subCategory === subCategory)
            if(newState.length && removeIndex>=0) {
                if(newState[removeIndex].qty && newState[removeIndex].qty>1){
                    newState = state.map((product, i) =>
                    i === removeIndex ? { ...product, qty: product.qty - 1 } : product
                );
                } else {
                    newState.splice(removeIndex, 1)
                }
                return newState
            } 
            return state
        },
        clearCart: ()=>{
            return initialState
        }
    }
})

export const { add, remove, clearCart } = counterSlice.actions
const productCartReducer = counterSlice.reducer
export default productCartReducer