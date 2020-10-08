import { all } from "redux-saga/effects";
import { namaUserSaga, emailUserSaga, passwordUserSaga } from './userSaga';


export function* delay(ms){
    new Promise(res => setTimeout(res, ms))
}

//notice how me now only export the rootSaga
//single entry point to start all sagas at once
export default function* rootSaga(){
    yield all([
        namaUserSaga(), emailUserSaga(), passwordUserSaga()
    ])
}