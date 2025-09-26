import './orderProduct.css'

export const OrderProduct = ({ product }) => {
    return (
        <div className="order-product-card">
            <img src={`https://swift-shopping-images.s3.ap-south-1.amazonaws.com${product.imageUrl}`} className="card-img-left" alt={product.desc}/>
            <div className="order-product-card-body">
                <h5 className="card-title">{product.company}</h5>
                <p className="card-text">{product.desc}</p>
                <h5>Rs. {new Intl.NumberFormat('en-IN').format(product.price)}</h5>
            </div>
        </div>
    )
}

export default OrderProduct
