import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import {
  bankList,
  category,
  searchVal,
  orderedData
} from '../components/header/reducer';
import { favBank, bankDetail } from '../components/home/reducer';

const persistConfig = {
  key: 'bank_detail',
  storage,
  whitelist: ['favBank']
};

const rootReducer = combineReducers({
  bankList,
  category,
  searchVal,
  orderedData,
  favBank,
  bankDetail
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export default persistedReducer;
