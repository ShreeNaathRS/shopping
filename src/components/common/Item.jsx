import { useEffect } from 'react';
import './item.css';
import ProductActions from './ProductActions';

const Item = ({product}) => {
  useEffect(()=>{
    if(product){
      const styleTag = document.createElement('style');
      let styles = `
        & .img-${product.id}-loading.loaded::before {
            animation: none;
            content: none;
        }
        & .img-${product.id}-loading.loaded img {
            opacity: 1;
        }
        & .img-${product.id}-loading img {
            opacity: 0;
            transition: opacity 250ms ease-in-out;
        }
        & .img-${product.id}-loading::before {
            content: "";
            position: absolute;
            inset: 0;
            opacity: 0;
            animation: pulse 2.5s infinite;
            background-color: var(--bg-color);
        }
      `;
      styleTag.innerHTML = styles;
      document.head.appendChild(styleTag);
      const blurredImageDiv = document.querySelector(`.img-${product.id}-loading`)
      const img = blurredImageDiv?.querySelector("img")
      const loaded = () => {
        blurredImageDiv.classList.add("loaded")
      }
      if (img?.complete) {
        loaded()
      } else {
        img?.addEventListener("load", loaded)
      }
      return () => {
        document.head.removeChild(styleTag);
      };
    }
  },[product])
  return (
    <div key={product.id} className="item">
        <div className='item-img-container'>
            <div className={`img-${product.id}-loading`} style={{
                backgroundImage: `url(https://swift-shopping-images.s3.ap-south-1.amazonaws.com${product.imageUrl.replace('.jpg','-small.jpg')})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                height: '160px'
              }}>
              <img src={`https://swift-shopping-images.s3.ap-south-1.amazonaws.com${product.imageUrl}`} 
                className="item-img-top" alt={product?.desc}
                loading='lazy'
              />
            </div>
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
