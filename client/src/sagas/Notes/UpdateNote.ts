import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { BASE_URL } from '../../config';

type Note = {
    id : number,
    title: string,
    body: string,
}

type Action = {
    type: string,
    payload: Note,
    success: () => {}
}

function* updateNoteWorker(action: Action) {

    const payload: Note | undefined = action.payload;

    try {
        const { data: { status, message } } = yield call(axios.put, `${BASE_URL}/api/notes/${payload.id}`, payload, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (status === "OK") {
            yield put({ type: 'UPDATE_NOTE_SUCCESS' });
            
            // Redirects When Success
            action.success();
        }
        else {
            yield put({ type: 'UPDATE_NOTE_FAILURE', payload: message })
        }

    } catch (error) {
        yield put({ type: 'UPDATE_NOTE_FAILURE', payload: error.toString() })
    }
}


function* updateNote() {
    yield takeLatest("UPDATE_NOTE_INIT", updateNoteWorker)
}

export default updateNote;
