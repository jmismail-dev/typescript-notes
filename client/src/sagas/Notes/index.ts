import { all } from 'redux-saga/effects';

import fetchNotes from './AllUserNotes';
import fetchNote from './GetSingleUserNote';
import postNote from './PostNote';
import updateNote from './UpdateNote';
import deleteNote from './DeleteNote';
import getNoteHistory from './GetNoteHistory';

export default function* () {
    yield all([fetchNotes(), fetchNote(), postNote(), updateNote(), deleteNote(),getNoteHistory()])
};