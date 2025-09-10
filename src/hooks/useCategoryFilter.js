import { useState, useEffect } from 'react';

export const useCategoryFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState(() => {
    const local = JSON.parse(localStorage.getItem("localCategoryFilter"));
    return local?.value || null;
  });

  const [selectedSubCategory, setSelectedSubCategory] = useState(() => {
    const local = JSON.parse(localStorage.getItem("localSubCategoryFilter"));
    return local?.value || null;
  });

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
