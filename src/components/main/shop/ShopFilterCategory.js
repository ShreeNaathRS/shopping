import './shopFilterCategory.css'

const ShopFilterCategory = ({ categories, selectedCategory, setSelectedCategory, setSelectedSubCategory }) => {
  return (
    <div className='shop-filter-category'>
        <select value={selectedCategory?.name} className="form-select"
            onChange={e=>{
            const category = categories.find(cat => cat.name === e.target.value)
            setSelectedCategory(category??null)
            setSelectedSubCategory(null)
            }}
        >
          <option selected>Select a category</option>
          {categories.map(category=><option key={category.name}>{category.name}</option>)}
        </select>
    </div>
  )
}

export default ShopFilterCategory
