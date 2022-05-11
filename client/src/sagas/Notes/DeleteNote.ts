
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { BASE_URL } from '../../config';

// type Note = {
//     title: string,
//     body: string,
// }

type Action = {
    type: string,
    payload: number,
    success: () => {}
}

function* deleteNoteWorker(action: Action) {

    const payload: number | undefined = action.payload;

    try {
        const { data: { status, message } } = yield call(axios.delete, `${BASE_URL}/api/notes/${payload}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (status === "OK") {
            yield put({ type: 'DELETE_NOTE_SUCCESS', payload: payload });

            // Redirects When Success
            action.success();
        }
        else {
            yield put({ type: 'DELETE_NOTE_FAILURE', payload: message })
        }

    } catch (error) {
        yield put({ type: 'DELETE_NOTE_FAILURE', payload: error.toString() })
    }
}


function* deleteNote() {
    yield takeLatest("DELETE_NOTE_INIT", deleteNoteWorker)
}

export default deleteNote;
