import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { BASE_URL } from '../../config';


type Action = {
    type: string,
    payload: number
}

function* getNoteHistoryHelper(action: Action) {

    const payload: number | undefined = action.payload;

    try {
        const { data: { status, results, message } } = yield call(axios.put,`${BASE_URL}/api/notes/history/${payload}`, {}, {
            headers : {
                "Content-Type" : "application/json"
            }
        });
        if (status === "OK") {
            yield put({ type: 'GET_NOTE_HISTORY_SUCCESS', payload: results })
        }
        else {
            yield put({ type: 'GET_NOTE_HISTORY_FAILURE', payload: message })
        }

    } catch (error) {
        yield put({ type: 'GET_NOTE_HISTORY_FAILURE', payload: error.toString() })
    }
}


function* getNoteHistory() {
    yield takeLatest("GET_NOTE_HISTORY_INIT", getNoteHistoryHelper)
}

export default getNoteHistory;
