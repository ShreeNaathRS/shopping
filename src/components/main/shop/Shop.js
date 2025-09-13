import { useEffect, useRef, useState } from 'react'
import './shop.css'
import ShopFilter from './ShopFilter'
import ShopList from './ShopList'
import { productAxios } from '../../../service'
import { useCategoryFilter } from '../../../hooks/useCategoryFilter'
import CenteredIndicator from '../../common/CenteredIndicator'
import { EMPTY_PRODUCTS } from '../../../constants'

const Shop = ({products, productsLoading, searchText}) => {
  const {
    selectedCategory, setSelectedCategory,
    selectedSubCategory, setSelectedSubCategory
  } = useCategoryFilter()
  const [categories, setCategories] = useState([])
  const hasFetched = useRef(false)

  useEffect(()=>{
    if(hasFetched.current){
      return
    }
    hasFetched.current = true
    const fetchCategories = async () => {
      try{
        const response = await productAxios.get("/category");
        setCategories(response.data.filter(category=>category.name))
      }catch(err){
        console.log(err)
      }
    }
    fetchCategories()
  })

  return (
    <div className='shop'>
      <ShopFilter categories={categories} selectedCategory={selectedCategory} selectedSubCategory={selectedSubCategory} setSelectedCategory={setSelectedCategory} setSelectedSubCategory={setSelectedSubCategory}/>
      { productsLoading? 
          <CenteredIndicator loader={true}/>:
          products?
          <ShopList products={products} selectedCategory={selectedCategory} selectedSubCategory={selectedSubCategory} searchText={searchText} />:
          <CenteredIndicator message={EMPTY_PRODUCTS}/>
      }
    </div>
  )
}

export default Shop
