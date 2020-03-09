import { takeLatest, put } from 'redux-saga/effects';
import {
  BANK_LIST_FETCH_REQUEST,
  bankListFetctSuccess,
  bankListFetchFaliure,
  setOrderdData
} from './action';
import axios from 'axios';
import { getItem, setItem } from '../../helper/storage';

export const create1Dto2DArr = (val, howMany = 10) => {
  var resultArr = [];
  var inputList = val.slice(0);
  while (inputList[0]) {
    resultArr.push(inputList.splice(0, howMany));
  }
  return { data: resultArr };
};

function* handleBankListCall(action) {
  const { query } = action.payload;
  let res;
  try {
    if (getItem(query)) {
      res = yield getItem(query);
    } else {
      res = yield axios
        .get(`https://vast-shore-74260.herokuapp.com/banks?city=${query}`)
        .then(res => res);
      setItem(res, query);
    }
    if (res.status === 200) {
      yield put(setOrderdData(create1Dto2DArr(res.data)));
      yield put(bankListFetctSuccess(res.data));
    } else {
      yield put(bankListFetchFaliure());
    }
  } catch (e) {
    console.log('error occured: ', e);
  }
}

export default function* watchBankListCall() {
  yield takeLatest(BANK_LIST_FETCH_REQUEST, handleBankListCall);
}
