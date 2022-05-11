import { all, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { BASE_URL } from '../../config';


function* fetchNotes() {
    try {
        const { data: { status, results, message } } = yield call(axios.get, `${BASE_URL}/api/notes`);
        if (status === "OK") {
            yield put({ type: 'FETCH_USER_NOTES_SUCCESS', payload: results })
        }
        else {
            yield put({ type: 'FETCH_USER_NOTES_FAILURE', payload: message })
        }

    } catch (error) {
        yield put({ type: 'FETCH_USER_NOTES_FAILURE', payload: error.toString() })
    }
}

function* callFetchNotes() {
    yield takeLatest("FETCH_ALL_USER_NOTES", fetchNotes)
}

export default callFetchNotes;
