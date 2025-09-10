import './shopFilterSubCategory.css'
import { useSelector } from 'react-redux'

const ShopFilterSubCategory = ({ selectedCategory, selectedSubCategory, setSelectedSubCategory }) => {
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
