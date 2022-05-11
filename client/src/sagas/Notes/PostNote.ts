import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { BASE_URL } from '../../config';

type Note = {
    title: string,
    body: string,
}

type Action = {
    type: string,
    payload: Note,
    success: () => {}
}

function* createNoteWorker(action: Action) {

    const payload: Note | undefined = action.payload;

    try {
        const { data: { status, message } } = yield call(axios.post, `${BASE_URL}/api/notes/`, payload, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (status === "OK") {
            yield put({ type: 'CREATE_NOTE_SUCCESS' });
            
            // Redirects When Success
            action.success();
        }
        else {
            yield put({ type: 'CREATE_NOTE_FAILURE', payload: message })
        }

    } catch (error) {
        yield put({ type: 'CREATE_NOTE_FAILURE', payload: error.toString() })
    }
}


function* createNote() {
    yield takeLatest("CREATE_NOTE_INIT", createNoteWorker)
}

export default createNote;
