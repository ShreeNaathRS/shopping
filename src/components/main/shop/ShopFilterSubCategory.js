import { useEffect } from 'react'
import './shopFilterSubCategory.css'

const ShopFilterSubCategory = ({ selectedCategory, selectedSubCategory, setSelectedCategory, setSelectedSubCategory }) => {
    useEffect(()=>{
        const localSubCategoryFilter = JSON.parse(localStorage.getItem("localSubCategoryFilter"))
        const localCategoryFilter = JSON.parse(localStorage.getItem("localCategoryFilter"))
        setSelectedSubCategory(localSubCategoryFilter?.value ? localSubCategoryFilter?.value : null)
        setSelectedCategory(localCategoryFilter?.value ? localCategoryFilter?.value : null)
    }, [])
    useEffect(() => {
        if(selectedCategory && selectedSubCategory && Object.keys(selectedCategory).length !== 0 && Object.keys(selectedSubCategory).length !== 0){
            localStorage.setItem("localCategoryFilter", JSON.stringify({value: selectedCategory, expiry: (new Date).getTime()+1800000}))
            localStorage.setItem("localSubCategoryFilter", JSON.stringify({value: selectedSubCategory, expiry: (new Date).getTime()+1800000}))
        }
    }, [selectedCategory, selectedSubCategory])
  return (
    <>
        {
            selectedCategory &&
            <div className='shop-filter-sub-category'>
            {
                selectedCategory.subCategories?.map(category=>{
                    return (
                    <div key={category.id} className="card" onClick={()=>setSelectedSubCategory(category)}>
                        <div className="card-body">
                        <h5 className="card-title">{category.name}</h5>
                        </div>
                    </div>
                    )
                })
            }
            </div>
        }
    </>
  )
}

export default ShopFilterSubCategory
