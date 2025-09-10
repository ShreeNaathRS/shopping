import { useEffect, useRef, useState } from 'react'
import './shop.css'
import ShopFilter from './ShopFilter'
import ShopList from './ShopList'
import productAxios from '../../../service'
import { useCategoryFilter } from '../../../hooks/useCategoryFilter'

const Shop = ({products, searchText}) => {
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
      <ShopList products={products} selectedCategory={selectedCategory} selectedSubCategory={selectedSubCategory} searchText={searchText} />
    </div>
  )
}

export default Shop
