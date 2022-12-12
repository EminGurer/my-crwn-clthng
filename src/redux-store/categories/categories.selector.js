import { createSelector } from '@reduxjs/toolkit';

const selectCategoryReducer = (state) => state.categories;

const selectCategories = createSelector([selectCategoryReducer], (categoriesSlice) => categoriesSlice.categories)

export const selectCategoriesMap = createSelector([selectCategories], (categories) => {
  console.log('categoriesMap selector is fired');
  return categories.reduce((acc, category) => {
    const { title, items } = category
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
})

//createSelector is used for caching previously calculated categories array
//every time redux state is updated all selectors fire and this cause unnecessary rerenders in irrelevant components
//this is why we use createSelector for caching
//for example if current user is changed categories component won't rerender due to selector call