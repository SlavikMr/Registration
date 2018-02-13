import { delay } from 'redux-saga';
import { put, takeEvery } from 'redux-saga/effects';
import { submitForm, receiveData, failResponse } from './actions';

export function* sendAsync() {
  try {
    yield put(submitForm())
    yield delay(2000)
    // throw new Error('Something went wrong');
    yield put(receiveData())
  } catch(error) {
    yield put(failResponse(error))
  }
}

export function* watchSendAsync() {
  yield takeEvery('SEND_ASYNC', sendAsync)
}
