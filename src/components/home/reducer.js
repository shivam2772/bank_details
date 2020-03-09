import { ADDTO_FAV_BANK, REMOVE_FROM_FAV, SET_BANK_DETAIL } from './action';

export const favBank = (state = { data: [] }, action) => {
  switch (action.type) {
    case ADDTO_FAV_BANK:
      return { data: [...state.data, ...action.payload] };
    case REMOVE_FROM_FAV:
      return { data: [...action.payload] };
    default:
      return state;
  }
};

export const bankDetail = (state = {}, action) => {
  switch (action.type) {
    case SET_BANK_DETAIL:
      return { ...action.payload };
    default:
      return state;
  }
};
