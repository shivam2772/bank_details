import watchBankListCall from '../components/header/saga';
import { fork, all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([fork(watchBankListCall)]);
}
