import {
  BANK_LIST_FETCH_REQUEST,
  BANK_LIST_FETCH_SUCCESS,
  BANK_LIST_FETCH_FAILURE,
  SET_CATEGOTY,
  SET_SEARCH_VALUE,
  SET_ORDERED_DATA
} from './action';

export const bankList = (
  state = { isFetching: false, error: false },
  action
) => {
  switch (action.type) {
    case BANK_LIST_FETCH_REQUEST:
      return { isFetching: true, error: false };
    case BANK_LIST_FETCH_SUCCESS:
      return { isFetching: false, error: false, data: action.payload };
    case BANK_LIST_FETCH_FAILURE:
      return { isFetching: false, error: true };
    default:
      return state;
  }
};

export const category = (state = { category: '' }, action) => {
  switch (action.type) {
    case SET_CATEGOTY:
      return { ...action.payload };
    default:
      return state;
  }
};

export const searchVal = (state = { val: '' }, action) => {
  switch (action.type) {
    case SET_SEARCH_VALUE:
      return { ...action.payload };
    default:
      return state;
  }
};

export const orderedData = (state = { data: [] }, action) => {
  switch (action.type) {
    case SET_ORDERED_DATA:
      return { ...action.payload };
    default:
      return state;
  }
};
