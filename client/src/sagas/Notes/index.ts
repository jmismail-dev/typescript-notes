import { all } from 'redux-saga/effects';

import fetchNotes from './AllUserNotes';
import fetchNote from './GetSingleUserNote';
import postNote from './PostNote';
import updateNote from './UpdateNote';

export default function* () {
    yield all([fetchNotes(), fetchNote(), postNote(), updateNote()])
};