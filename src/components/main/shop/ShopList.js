import './shopList.css'

import ProductActions from '../../common/ProductActions'
import { useEffect, useState } from 'react'
import CenteredIndicator from '../../common/CenteredIndicator'
import { EMPTY_FILTERED_PRODUCTS, EMPTY_PRODUCTS_IN_CATEGORY } from '../../../constants'

const ShopList = ({ products, selectedCategory, selectedSubCategory, searchText }) => {
    const [filteredProducts, setFilteredProducts] = useState([])
    useEffect(()=>{
      if(selectedCategory && selectedSubCategory){
        setFilteredProducts(products.filter(product=>searchText?product.company.toLowerCase().includes(searchText.toLowerCase()) || product.desc.toLowerCase().includes(searchText.toLowerCase()):true)
          .filter(product=>product.category === selectedCategory.id && product.subCategory === selectedSubCategory.id))
      }
    },[selectedCategory, selectedSubCategory, searchText, products])
    return (
    <div className='shop-items'>
        {
          filteredProducts.length?
          filteredProducts.map(product=>{
            return (
              <div key={product.id} className="shop-item">
                  <img src={`https://swift-shopping-images.s3.ap-south-1.amazonaws.com${product.imageUrl}`} className="shop-item-img-top" alt="..."/>
                  <div className="shop-item-body">
                    <div className='shop-item-body-text'>
                      <p className="shop-item-title fw-bold">{product.company}</p>
                      <p className="shop-item-text clip-two-lines">{product.desc}</p>
                      <div className='price fw-bold'>Rs. {new Intl.NumberFormat('en-IN').format(product.price)}</div>
                    </div>
                    <ProductActions product={product} />
                  </div>
              </div>
            )
          }):
          <CenteredIndicator message={searchText?EMPTY_FILTERED_PRODUCTS:EMPTY_PRODUCTS_IN_CATEGORY} />
        }
    </div>
  )
}

export default ShopList
