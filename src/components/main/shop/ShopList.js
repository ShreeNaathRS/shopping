import './shopList.css'

import ProductActions from '../../common/ProductActions'

const ShopList = ({ products, selectedCategory, selectedSubCategory, searchText }) => {
    return (
    <div className='shop-list'>
        {
        selectedCategory && selectedSubCategory &&
        products.filter(product=>searchText?product.company.toLowerCase().includes(searchText.toLowerCase()) || product.desc.toLowerCase().includes(searchText.toLowerCase()):true)
        .filter(product=>product.category == selectedCategory.id && product.subCategory == selectedSubCategory.id)
        .map(product=>{
            return (
              <div key={product.id} className="card">
                  <img src={`https://swift-shopping-images.s3.ap-south-1.amazonaws.com${product.imageUrl}`} className="card-img-top" alt="..."/>
                  <div className="card-body">
                    <div className='card-body-text'>
                      <p className="card-title fw-bold">{product.company}</p>
                      <p className="card-text">{product.desc.substring(0,60)+(product.desc.length>60?"...":"")}</p>
                      <p className='price fw-bold'>Rs. {new Intl.NumberFormat('en-IN').format(product.price)}</p>
                    </div>
                    <ProductActions product={product} />
                  </div>
              </div>
            )
        })}
    </div>
  )
}

export default ShopList
