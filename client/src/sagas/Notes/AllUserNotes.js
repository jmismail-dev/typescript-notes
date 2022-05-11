"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("redux-saga/effects");
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../../config");
function* fetchNotes() {
    try {
        const { data: { status, results, message } } = yield (0, effects_1.call)(axios_1.default.get, `${config_1.BASE_URL}/api/notes`);
        if (status === "OK") {
            yield (0, effects_1.put)({ type: 'FETCH_USER_NOTES_SUCCESS', payload: results });
        }
        else {
            yield (0, effects_1.put)({ type: 'FETCH_USER_NOTES_FAILURE', payload: message });
        }
    }
    catch (error) {
        yield (0, effects_1.put)({ type: 'FETCH_USER_NOTES_FAILURE', payload: error.toString() });
    }
}
function* callFetchNotes() {
    yield (0, effects_1.takeLatest)("FETCH_ALL_USER_NOTES", fetchNotes);
}
exports.default = callFetchNotes;
