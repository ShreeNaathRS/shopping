import './shopFilterCategory.css'

const ShopFilterCategory = ({ categories, selectedCategory, setSelectedCategory, setSelectedSubCategory }) => {
  return (
    <div className='shop-filter-category'>
        <select value={selectedCategory?.name} className="form-select"
            onChange={e=>{
              const category = categories.find(cat => cat.name === e.target.value)
              setSelectedCategory(category??null)
              if(category){
                const subCategories = categories.find(catg=>catg.id === category.id).subCategories
                setSelectedSubCategory({...subCategories[0]})
              }
            }}
        >
          {categories.map((category,index)=><option selected={index===0} key={category.name}>{category.name}</option>)}
        </select>
    </div>
  )
}

export default ShopFilterCategory
