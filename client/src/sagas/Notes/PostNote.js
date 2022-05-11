"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("redux-saga/effects");
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../../config");
function* createNoteWorker(action) {
    const payload = action.payload;
    try {
        const { data: { status, message } } = yield (0, effects_1.call)(axios_1.default.post, `${config_1.BASE_URL}/api/notes/`, payload, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (status === "OK") {
            yield (0, effects_1.put)({ type: 'CREATE_NOTE_SUCCESS' });
            // Redirects When Success
            action.success();
        }
        else {
            yield (0, effects_1.put)({ type: 'CREATE_NOTE_FAILURE', payload: message });
        }
    }
    catch (error) {
        yield (0, effects_1.put)({ type: 'CREATE_NOTE_FAILURE', payload: error.toString() });
    }
}
function* createNote() {
    yield (0, effects_1.takeLatest)("CREATE_NOTE_INIT", createNoteWorker);
}
exports.default = createNote;
