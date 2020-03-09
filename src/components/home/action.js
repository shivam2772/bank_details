export const ADDTO_FAV_BANK = 'addto-fav-bank';
export const REMOVE_FROM_FAV = 'remove-from-fav';
export const SET_BANK_DETAIL = 'set-bank-detail';

export const addToFav = data => ({
  type: ADDTO_FAV_BANK,
  payload: data
});

export const removeFromFav = data => ({
  type: REMOVE_FROM_FAV,
  payload: data
});

export const setBankDetail = data => ({
  type: SET_BANK_DETAIL,
  payload: data
});
