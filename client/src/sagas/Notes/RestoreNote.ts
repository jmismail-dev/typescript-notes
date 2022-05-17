import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { BASE_URL } from '../../config';


type Action = {
    type: string,
    payload: number
}

function* setNoteRestoreHelper(action: Action) {

    const payload: number | undefined = action.payload;

    try {
        const { data: { status, results, message } } = yield call(axios.put, `${BASE_URL}/api/notes/restore/${payload}`, {}, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (status === "OK") {
            yield put({ type: 'SET_RESTORE_NOTE_SUCCESS', payload: results })
        }
        else {
            yield put({ type: 'SET_RESTORE_NOTE_FAILURE', payload: message })
        }

    } catch (error) {
        yield put({ type: 'SET_RESTORE_NOTE_FAILURE', payload: error.toString() })
    }
}


function* setNoteRestore() {
    yield takeLatest("SET_RESTORE_NOTE_INIT", setNoteRestoreHelper)
}

export default setNoteRestore;
