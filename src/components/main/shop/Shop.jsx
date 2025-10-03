import { useEffect, useState } from 'react'
import './shop.css'
import ShopFilter from './ShopFilter'
import ShopItems from './ShopItems'
import { useCategoryFilter } from '../../../hooks/useCategoryFilter'
import CenteredIndicator from '../../common/CenteredIndicator'
import { EMPTY_PRODUCTS } from '../../../constants'
import { useAuthAxiosWithProps } from '../../../hooks/useAuthAxiosWithProps'
import { SafeRender } from '../../common/SafeRender'

const Shop = ({products, productsLoading, searchText}) => {
  const [categories, setCategories] = useState([])
  const { selectedCategory, setSelectedCategory, selectedSubCategory, setSelectedSubCategory } = useCategoryFilter({categories})
  const { doAPICall: fetchCategories } = useAuthAxiosWithProps()

  useEffect(()=>{
    fetchCategories('GET', '/category').then(response => setCategories(response))
  }, [fetchCategories])

  return (
    <div className='shop'>
      <SafeRender>
        <ShopFilter categories={categories} selectedCategory={selectedCategory} selectedSubCategory={selectedSubCategory} setSelectedCategory={setSelectedCategory} setSelectedSubCategory={setSelectedSubCategory}/>
      </SafeRender>
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
