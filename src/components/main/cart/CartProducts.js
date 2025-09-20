import './cartProducts.css'

import ProductActions from '../../common/ProductActions'


const CartProducts = ({ productCartSlice }) => {
    return (
        <div className='cart-products'>
        {
            productCartSlice.products?.map(cartProduct=>{
            return (
                <div className="card">
                    <img src={`https://swift-shopping-images.s3.ap-south-1.amazonaws.com${cartProduct.product.imageUrl}`} className="card-img-left" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{cartProduct.product.company}</h5>
                        <p className="card-text">{cartProduct.product.desc}</p>
                        <h5>Rs. {new Intl.NumberFormat('en-IN').format(cartProduct.product.price)}</h5>
                        <ProductActions product={cartProduct.product}/>
                    </div>
                </div>
            )
            })
        }
        </div>
      )
}

export default CartProducts
