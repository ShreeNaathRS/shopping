import './shopFilter.css'
import ShopFilterCategory from './ShopFilterCategory'
import ShopFilterSubCategory from './ShopFilterSubCategory'

const ShopFilter = ({ categories, selectedCategory, selectedSubCategory, setSelectedCategory, setSelectedSubCategory }) => {
  return (
    <div className='shop-filter'>
        <ShopFilterCategory
            categories={categories} selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory} setSelectedSubCategory={setSelectedSubCategory}
        />
        <ShopFilterSubCategory selectedCategory={selectedCategory} selectedSubCategory={selectedSubCategory}
            setSelectedCategory={setSelectedCategory} setSelectedSubCategory={setSelectedSubCategory} 
        />
    </div>
  )
}

export default ShopFilter
