import { useState, useEffect } from 'react';

export const useCategoryFilter = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState(() => {
    const local = JSON.parse(localStorage.getItem("localCategoryFilter"));
    return local?.value || null;
  });

  const [selectedSubCategory, setSelectedSubCategory] = useState(() => {
    const local = JSON.parse(localStorage.getItem("localSubCategoryFilter"));
    return local?.value || null;
  });

  useEffect(()=>{
    if(selectedCategory==null||selectedSubCategory==null){
      setSelectedCategory(categories?.length?categories[0]:null);
      setSelectedSubCategory(categories?.length && categories[0]? categories[0]?.subCategories[0]:null)
    }
  }, [categories, selectedCategory, selectedSubCategory])

  useEffect(() => {
    const isValid = selectedCategory && selectedSubCategory &&
      Object.keys(selectedCategory).length !== 0 &&
      Object.keys(selectedSubCategory).length !== 0;

    if (isValid) {
      const expiry = new Date().getTime() + 1800000;
      localStorage.setItem("localCategoryFilter", JSON.stringify({ value: selectedCategory, expiry }));
      localStorage.setItem("localSubCategoryFilter", JSON.stringify({ value: selectedSubCategory, expiry }));
    }
  }, [selectedCategory, selectedSubCategory]);

  return {
    selectedCategory,
    selectedSubCategory,
    setSelectedCategory,
    setSelectedSubCategory
  };
}
