import './item.css';
import ProductActions from './ProductActions';

const Item = ({product}) => {
  return (
    <div key={product.id} className="item">
        <div className='item-img-container'>
            <img src={`https://swift-shopping-images.s3.ap-south-1.amazonaws.com${product.imageUrl}`} className="item-img-top" alt={product?.desc}/>
        </div>
        <div className='item-body-container'>
            <div className="item-body">
            <div className='item-body-text'>
                <p className="item-title fw-bold">{product.company}</p>
                <p className="item-text clip-two-lines">{product.desc}</p>
                <div className='price fw-bold'>Rs. {new Intl.NumberFormat('en-IN').format(product.price)}</div>
            </div>
            <ProductActions product={product} />
        </div>
        </div>
    </div>
  )
}

export default Item
