import { useDispatch, useSelector } from 'react-redux'
import { sync } from '../store/slices/productCartSlice'
import { useAuthAxiosWithProps } from './useAuthAxiosWithProps';
import { useCallback } from 'react';

export const useCartActions = ({ setCartUpdateLoader }) => {

    const productCartSlice = useSelector(state=>state.cart)
    const { userId } = useSelector(state=>state.loggedInUser)
    const dispatch = useDispatch()
    const onCartUpdateSucess = useCallback(cartUpdateResponse => dispatch(sync(cartUpdateResponse)), [dispatch])
    const { doAPICall: postUpdateCart } = useAuthAxiosWithProps( { setLoader: setCartUpdateLoader, onSuccess: onCartUpdateSucess } );

    const handleSaveCart = product => {
        if(productCartSlice.id){
            addProduct(product)
        } else{
            saveCartAndProduct(product)
        }
    }

    const addProduct = async (product) => {
        let cartProductIndex, updatedProducts = [];
        let cartProduct = productCartSlice.products.find((cartProduct,index)=>{
            if(cartProduct.product.id===product.id){
                cartProductIndex = index;
                return true
            }
            return false
        })
        if(cartProduct?.qty){
            cartProduct = {
                ...cartProduct,
                qty: cartProduct.qty + 1,
                price: cartProduct.product.price * (cartProduct.qty + 1)
            }
            updatedProducts = [
                ...productCartSlice.products.slice(0,cartProductIndex), 
                cartProduct, 
                ...productCartSlice.products.slice(cartProductIndex+1)
            ]
        } else {
            updatedProducts = [...productCartSlice.products]
            updatedProducts.push({product, qty:1, price: product.price})
        }
        updateCart(updatedProducts)
    }

    const removeProduct = async (product) => {
        let cartProductIndex, updatedProducts = [];
        let cartProduct = productCartSlice.products.find((cartProduct, index)=>{
            if(cartProduct.product.id===product.id){
                cartProductIndex = index;
                return true
            }
            return false
        })
        if(cartProduct?.qty>1){
            cartProduct = {
                ...cartProduct,
                qty: cartProduct.qty - 1,
                price: cartProduct.product.price * (cartProduct.qty - 1)
            }
            updatedProducts = [
                ...productCartSlice.products.slice(0,cartProductIndex), 
                cartProduct, 
                ...productCartSlice.products.slice(cartProductIndex+1)
            ]
        } else if(cartProduct?.qty===1) {
            updatedProducts=[...productCartSlice.products]
            updatedProducts.splice(cartProductIndex,1)
        }
        await updateCart(updatedProducts)
    }

    const updateCart = async updatedProducts =>{
        const params = {
                id: productCartSlice.id,
                user: userId,
                products: updatedProducts
        }
        await postUpdateCart('PUT', '/cart', params)
    }

    const saveCartAndProduct = async product => {
        const params = {
            user: userId,
            products: [{product, qty:1, price: product.price}]
        }
        await postUpdateCart('POST', '/cart', params)
    }

    const handleRemoveCart = product => {
        removeProduct(product)
    }

    return {
        handleSaveCart,
        handleRemoveCart
    }
}