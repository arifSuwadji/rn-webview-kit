import { put, takeEvery, all, call } from "redux-saga/effects";

export function* namaUserSaga(){
    yield put({ type: 'NAMA_USER'})
}

export function* emailUserSaga(){
    yield put ({ type: 'EMAIL_USER'})
}

export function* passwordUserSaga(){
    yield put ({ type: 'PASSWORD_USER'})
}