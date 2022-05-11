import { all } from 'redux-saga/effects';

import fetchNotes from './AllUserNotes';
import fetchNote from './GetSingleUserNote';

export default function* () {
    yield all([fetchNotes(), fetchNote()])
};