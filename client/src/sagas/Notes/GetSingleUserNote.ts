import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { BASE_URL } from '../../config';


type Action = {
    type: string,
    payload?: string
}

function* singleUserNote(action: Action) {

    const payload: string | undefined = action.payload;

    try {
        const { data: { status, result, message } } = yield call(axios.get, `${BASE_URL}/api/notes/${payload}`);
        if (status === "OK") {
            yield put({ type: 'FETCH_SINGLE_USER_NOTE_SUCCESS', payload: result })
        }
        else {
            yield put({ type: 'FETCH_SINGLE_USER_NOTE_FAILURE', payload: message })
        }

    } catch (error) {
        yield put({ type: 'FETCH_SINGLE_USER_NOTE_FAILURE', payload: error.toString() })
    }
}


function* callSingleUserNote() {
    yield takeLatest("FETCH_SINGLE_USER_NOTE", singleUserNote)
}

export default callSingleUserNote;
