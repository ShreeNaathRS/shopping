import './shopItems.css'

import { useEffect, useState } from 'react'
import CenteredIndicator from '../../common/CenteredIndicator'
import { EMPTY_FILTERED_PRODUCTS, EMPTY_PRODUCTS_IN_CATEGORY } from '../../../constants'
import Item from '../../common/Item'
import ListComponent from '../../common/ListComponent'

const ShopItems = ({ products, selectedCategory, selectedSubCategory, searchText }) => {
    const [filteredProducts, setFilteredProducts] = useState([])
    useEffect(()=>{
      if(selectedCategory && selectedSubCategory){
        setFilteredProducts(products.filter(product=>searchText?product.company.toLowerCase().includes(searchText.toLowerCase()) || product.desc.toLowerCase().includes(searchText.toLowerCase()):true)
          .filter(product=>product.category === selectedCategory.id && product.subCategory === selectedSubCategory.id))
      } else{
        setFilteredProducts([])
      }
    },[selectedCategory, selectedSubCategory, searchText, products])
    return (
    <div className='shop-items' style={{display: `${filteredProducts?.length?'grid':'flex'}`}}>
        {
          filteredProducts.length?
          <ListComponent data={filteredProducts} renderItem={product=><Item key={product.id} product={product}/>}/>:
          <CenteredIndicator message={searchText?EMPTY_FILTERED_PRODUCTS:EMPTY_PRODUCTS_IN_CATEGORY} />
        }
    </div>
  )
}

export default ShopItems
