import { useCallback, useEffect, useState } from 'react'
import './shop.css'
import ShopFilter from './ShopFilter'
import ShopItems from './ShopItems'
import { useCategoryFilter } from '../../../hooks/useCategoryFilter'
import CenteredIndicator from '../../common/CenteredIndicator'
import { EMPTY_PRODUCTS } from '../../../constants'
import { useAuthAxiosWithProps } from '../../../hooks/useAuthAxiosWithProps'

const Shop = ({products, productsLoading, searchText}) => {
  const [categories, setCategories] = useState([])
  const { selectedCategory, setSelectedCategory, selectedSubCategory, setSelectedSubCategory } = useCategoryFilter({categories})
  const onFetchCategorySuccess = useCallback(response => setCategories(response), [setCategories])
  const { doAPICall: fetchCategories } = useAuthAxiosWithProps({ onSuccess: onFetchCategorySuccess })

  useEffect(()=>{
    fetchCategories('GET', '/category')
  }, [fetchCategories])

  return (
    <div className='shop'>
      <ShopFilter categories={categories} selectedCategory={selectedCategory} selectedSubCategory={selectedSubCategory} setSelectedCategory={setSelectedCategory} setSelectedSubCategory={setSelectedSubCategory}/>
      { productsLoading? 
          <CenteredIndicator loader={true}/>:
          products?
          <ShopItems products={products} selectedCategory={selectedCategory} selectedSubCategory={selectedSubCategory} searchText={searchText} />:
          <CenteredIndicator message={EMPTY_PRODUCTS}/>
      }
    </div>
  )
}

export default Shop
