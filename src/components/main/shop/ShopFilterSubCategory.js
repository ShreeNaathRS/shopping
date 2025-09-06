import { useEffect } from 'react'
import './shopFilterSubCategory.css'
import { useSelector } from 'react-redux'

const ShopFilterSubCategory = ({ selectedCategory, selectedSubCategory, setSelectedCategory, setSelectedSubCategory }) => {
    useEffect(()=>{
        const localSubCategoryFilter = JSON.parse(localStorage.getItem("localSubCategoryFilter"))
        const localCategoryFilter = JSON.parse(localStorage.getItem("localCategoryFilter"))
        setSelectedSubCategory(localSubCategoryFilter?.value ? localSubCategoryFilter?.value : null)
        setSelectedCategory(localCategoryFilter?.value ? localCategoryFilter?.value : null)
    })
    useEffect(() => {
        if(selectedCategory && selectedSubCategory && Object.keys(selectedCategory).length !== 0 && Object.keys(selectedSubCategory).length !== 0){
            localStorage.setItem("localCategoryFilter", JSON.stringify({value: selectedCategory, expiry: new Date().getTime()+1800000}))
            localStorage.setItem("localSubCategoryFilter", JSON.stringify({value: selectedSubCategory, expiry: new Date().getTime()+1800000}))
        }
    }, [selectedCategory, selectedSubCategory])
    const appDarkTheme = useSelector(state=>state.appDarkTheme)
  return (
    <>
        {
            selectedCategory &&
            <div className='shop-filter-sub-category '>
            {
                selectedCategory.subCategories?.map(subCategory=>{
                    return (
                    <div key={subCategory.id} 
                        style={{backgroundColor:`${subCategory.id===selectedSubCategory.id?appDarkTheme?'#0a2851':'#bedbe1':''}`}} 
                        className="card selected-sub-category" onClick={()=>setSelectedSubCategory(subCategory)}>
                        <div className="card-body">
                        <h5 className="card-title">{subCategory.name}</h5>
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
