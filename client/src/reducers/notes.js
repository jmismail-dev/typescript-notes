"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const initValue = {
    notes: [],
    isLoading: false,
    error: '',
    isError: false,
    note: ''
};
function default_1(state = initValue, action) {
    const { type, payload } = action;
    switch (type) {
        case 'FETCH_ALL_USER_NOTES':
            return Object.assign(Object.assign({}, state), { isLoading: true });
        case 'FETCH_USER_NOTES_SUCCESS':
            return Object.assign(Object.assign({}, state), { isLoading: false, notes: payload, isError: false });
        case 'FETCH_SINGLE_USER_NOTE_SUCCESS':
            return Object.assign(Object.assign({}, state), { isLoading: false, note: payload, isError: false });
        case 'FETCH_USER_NOTES_FAILURE':
        case 'FETCH_SINGLE_USER_NOTE_FAILURE':
            return Object.assign(Object.assign({}, state), { error: payload, isError: true, isLoading: false });
        default: return state;
    }
}
exports.default = default_1;
