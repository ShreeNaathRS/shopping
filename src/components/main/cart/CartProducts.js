import './cartProducts.css'

import ProductActions from '../../common/ProductActions'


const CartProducts = ({ productCartSlice }) => {
    return (
        <div className='cart-products'>
        {
            productCartSlice.map(product=>{
            return (
                <div className="card">
                    <img src={`https://swift-shopping-images.s3.ap-south-1.amazonaws.com${product.imageUrl}`} className="card-img-left" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{product.company}</h5>
                        <p className="card-text">{product.desc}</p>
                        <h5>Rs. {new Intl.NumberFormat('en-IN').format(product.price)}</h5>
                        <ProductActions product={product}/>
                    </div>
                </div>
            )
            })
        }
        </div>
      )
}

export default CartProducts
