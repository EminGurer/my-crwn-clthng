import { takeLatest, all, call, put } from 'redux-saga/effects';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

import {
  fetchCategoriesSuccess,
  fetchCategoriesFail,
  fetchCategoriesStart,
} from './categories.slice';

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCategoriesAndDocuments);
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (err) {
    console.log(err);
    yield put(fetchCategoriesFail(err));
    throw err;
  }
}

export function* onFetchCategories() {
  yield takeLatest(fetchCategoriesStart, fetchCategoriesAsync);
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
