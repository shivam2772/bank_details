export const BANK_LIST_FETCH_REQUEST = 'bank-list-fetch-request';
export const BANK_LIST_FETCH_SUCCESS = 'bank-list-fetch-success';
export const BANK_LIST_FETCH_FAILURE = 'bank-list-fetch-failure';

export const SET_CATEGOTY = 'set-category';
export const SET_SEARCH_VALUE = 'set-search-value';
export const SET_ORDERED_DATA = 'set-ordered-data';

export const bankListFetchRequest = data => ({
  type: BANK_LIST_FETCH_REQUEST,
  payload: data
});

export const bankListFetctSuccess = data => ({
  type: BANK_LIST_FETCH_SUCCESS,
  payload: data
});

export const bankListFetchFaliure = () => ({
  type: BANK_LIST_FETCH_FAILURE
});

export const setCategory = data => ({
  type: SET_CATEGOTY,
  payload: data
});

export const setSearchValue = data => ({
  type: SET_SEARCH_VALUE,
  payload: data
});

export const setOrderdData = data => ({
  type: SET_ORDERED_DATA,
  payload: data
});
