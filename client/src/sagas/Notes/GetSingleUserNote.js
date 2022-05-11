"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("redux-saga/effects");
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../../config");
function* singleUserNote(action) {
    const payload = action.payload;
    try {
        const { data: { status, result, message } } = yield (0, effects_1.call)(axios_1.default.get, `${config_1.BASE_URL}/api/notes/${payload}`);
        if (status === "OK") {
            yield (0, effects_1.put)({ type: 'FETCH_SINGLE_USER_NOTE_SUCCESS', payload: result });
        }
        else {
            yield (0, effects_1.put)({ type: 'FETCH_SINGLE_USER_NOTE_FAILURE', payload: message });
        }
    }
    catch (error) {
        yield (0, effects_1.put)({ type: 'FETCH_SINGLE_USER_NOTE_FAILURE', payload: error.toString() });
    }
}
function* callSingleUserNote() {
    yield (0, effects_1.takeLatest)("FETCH_SINGLE_USER_NOTE", singleUserNote);
}
exports.default = callSingleUserNote;
